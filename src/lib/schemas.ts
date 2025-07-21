import { date, email, z } from "zod"

export const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  birthDate: date("Birth date must be a valid date").refine(date => date <= new Date(), {
    message: "Birth date must be in the past"
  }),
  NIN: z.string().min(1, "National ID number is required"),
  enrollmentYear: z.preprocess(
    (val) => (val !== '' ? Number(val) : undefined),
    z
      .number({ error: "Enrollment year must be a number" })
      .int()
      .max(new Date().getFullYear(), { message: "Year mustn't be in the future" })
  ),
  institution: z.string().min(1, "Institution is required"),
  matricule: z.string().min(1, "Matricule is required"),
  major: z.string().min(1, "Major is required"),
  teamName: z.string().min(1, "Team name is required"),
  availability: z.enum(["yes", "partly", "no"]),
  prevExperience: z.enum(["yes", "no"]),
  prevExperienceDetails: z.string(),
  motivation: z.string().min(1, "Motivation is required"),
  skills: z.string().min(1, "Skills are required"),
  github: z.url("Invalid GitHub URL").or(z.literal("")),
  linkedin: z.url("Invalid LinkedIn URL").or(z.literal("")),
  portfolio: z.url("Invalid portfolio URL").or(z.literal("")),
  kaggle: z.url("Invalid Kaggle URL").or(z.literal("")),
})

export type RegistrationSchema = z.infer<typeof registrationSchema>