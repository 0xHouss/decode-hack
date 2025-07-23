import { z } from "zod"
import { parseDate } from "./utils"

const today = new Date()
const currentYear = today.getFullYear()

export const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => val.length === 10, {
      message: "Phone number must be 10 characters long",
    }),
  birthDate: z
    .string()
    .refine((val) => parseDate(val), {
      message: "Must be a valid date",
    })
    .refine((val) => parseDate(val) < today, {
      message: "Must be in the past",
    }),
  NIN: z
    .string()
    .min(1, "National ID number is required")
    .refine((val) => val.length === 18, {
      message: "National ID number must be 18 characters long",
    }),
  enrollmentYear: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Must be a valid year",
    })
    .refine((val) => Number(val) <= currentYear, {
      message: `Must be in the past`,
    }),
  institution: z.string().min(1, "Institution is required"),
  matricule: z.string().min(1, "Matricule is required"),
  major: z.string().min(1, "Major is required"),
  teamName: z.string().min(1, "Team name is required"),
  availability: z.enum(["yes", "partly", "no"]),
  prevExperience: z.enum(["yes", "no"]),
  prevExperienceDetails: z.string(),
  motivation: z.string().min(1, "Motivation is required"),
  skills: z.string().min(1, "Skills are required"),
  github: z.string(),
  linkedin: z.string(),
  portfolio: z.string(),
  kaggle: z.string(),
})

export type RegistrationSchema = z.infer<typeof registrationSchema>
