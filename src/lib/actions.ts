"use server";

import { prisma } from "./prisma";
import { registrationSchema } from "./schemas";
import { RegistrationState } from "./store";
import { formatDate } from "./utils";

export async function submitRegistrationForm(
  data: RegistrationState
) {
  try {
    const validatedData = registrationSchema.parse(data);

    const {
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      NIN,
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
      kaggle
    } = validatedData;

    if (!process.env.DISCORD_WEBHOOK_URL)
      throw new Error("Discord webhook URL is not set.");

    await prisma.submission.create({
      data: {
        ...validatedData,
        birthDate: formatDate(birthDate),
      },
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
- **Birth Date:** ${formatDate(birthDate)}
- **NIN:** ${NIN}

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
- **Kaggle:** ${kaggle || "N/A"}
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
