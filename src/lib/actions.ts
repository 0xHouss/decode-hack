"use server";

import z from "zod";
import { prisma } from "./prisma";
import { registrationSchema } from "./schemas";

export async function submitRegistrationForm(
  data: z.infer<typeof registrationSchema>
) {
  data
  throw new Error("Oops! It seems you've come a bit late to the party.\nRegistration is closed now.");
}

export async function submitRegistrationFormOld(
  data: z.infer<typeof registrationSchema>
) {
  try {
    const validatedData = registrationSchema.parse(data);

    const {
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      discord,
      enrollmentYear,
      institution,
      matricule,
      major,
      teamName,
      availability,
      prevExperience,
      prevExperienceDetails,
      motivation,
      skills,
      github,
      linkedin,
      portfolio,
      behance
    } = validatedData;

    if (!process.env.DISCORD_WEBHOOK_URL)
      throw new Error("Discord webhook URL is not set.");

    await prisma.submission.create({
      data: validatedData,
    });

    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "New Registration Form Submission",
            color: 3447003,
            description: `
### 👤 Personal Information
- **First Name:** ${firstName}
- **Last Name:** ${lastName}
- **Email:** ${email}
- **Phone:** ${phone}
- **Birth Date:** ${birthDate}
- **Discord username:** ${discord}

### 🎓 Academic Information
- **Enrollment Year:** ${enrollmentYear}
- **Institution:** ${institution}
- **Matricule:** ${matricule}
- **Major:** ${major}

### 🧠 Hackathon Information
- **Team Name:** ${teamName}
- **Availability:** ${availability}
- **Previous Experience:** ${prevExperience}
- **Previous Experience Details:** ${prevExperienceDetails || "N/A"}
- **Motivation:** ${motivation}
- **Skills:** ${skills}

### 🌐 Social Media Links
- **GitHub:** ${github || "N/A"}
- **LinkedIn:** ${linkedin || "N/A"}
- **Portfolio:** ${portfolio || "N/A"}
- **Behance:** ${behance || "N/A"}
    `.trim(),
            timestamp: new Date().toISOString(),
          }
        ],
      }),
    });
  } catch (error) {
    console.error("Error submitting registration form:", error);
    throw error
  }
}
