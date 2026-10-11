"use server";

import { isRegistrationOpen } from "./config";
import { prisma } from "./prisma";
import { RegistrationSchema, registrationSchema } from "./schemas";

// Server actions return errors instead of throwing them: in production React
// replaces a thrown error's message with a generic one before it reaches the client.
type SubmitResult = { error: string } | undefined

// Discord rejects embeds whose description is longer than this
const DISCORD_DESCRIPTION_LIMIT = 4096;

export async function submitRegistrationForm(data: RegistrationSchema): Promise<SubmitResult> {
  if (!isRegistrationOpen())
    return { error: "Oops! It seems you've come a bit late to the party.\nRegistration is closed now." };

  const parsed = registrationSchema.safeParse(data);
  if (!parsed.success)
    return { error: "Some of your answers are invalid. Please go back and check them." };

  try {
    await prisma.submission.create({ data: parsed.data });
  } catch (error) {
    console.error("Error saving registration:", error);
    return { error: "Something went wrong while submitting your registration. Please try again." };
  }

  // The registration is saved at this point, so a failed notification is only logged:
  // returning an error would make the user submit again and register twice.
  try {
    await notifyDiscord(parsed.data);
  } catch (error) {
    console.error("Error sending registration to Discord:", error);
  }
}

async function notifyDiscord(data: RegistrationSchema) {
  if (!process.env.DISCORD_WEBHOOK_URL)
    throw new Error("Discord webhook URL is not set.");

  const description = `
### 👤 Personal Information
- **First Name:** ${data.firstName}
- **Last Name:** ${data.lastName}
- **Email:** ${data.email}
- **Phone:** ${data.phone}
- **Birth Date:** ${data.birthDate}
- **Discord username:** ${data.discord}

### 🎓 Academic Information
- **Enrollment Year:** ${data.enrollmentYear}
- **Institution:** ${data.institution}
- **Matricule:** ${data.matricule}
- **Major:** ${data.major}

### 🧠 Hackathon Information
- **Team Name:** ${data.teamName}
- **Availability:** ${data.availability}
- **Previous Experience:** ${data.prevExperience}
- **Previous Experience Details:** ${data.prevExperienceDetails || "N/A"}
- **Motivation:** ${data.motivation}
- **Skills:** ${data.skills}

### 🌐 Social Media Links
- **GitHub:** ${data.github || "N/A"}
- **LinkedIn:** ${data.linkedin || "N/A"}
- **Portfolio:** ${data.portfolio || "N/A"}
- **Behance:** ${data.behance || "N/A"}
`.trim();

  const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds: [
        {
          title: "New Registration Form Submission",
          color: 3447003,
          description: description.slice(0, DISCORD_DESCRIPTION_LIMIT),
          timestamp: new Date().toISOString(),
        }
      ],
    }),
  });

  if (!response.ok)
    throw new Error(`Discord responded with ${response.status}: ${await response.text()}`);
}
