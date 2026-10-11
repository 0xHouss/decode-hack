import { z } from "zod"
import { parseDate } from "./utils"

export const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
  birthDate: z
    .string()
    .min(1, "Birth date is required")
    .refine((val) => parseDate(val), {
      message: "Must be a valid date",
      abort: true,
    })
    .refine((val) => parseDate(val)! < new Date(), {
      message: "Must be in the past",
    }),
  discord: z
    .string()
    .min(1, "Discord is required"),
  enrollmentYear: z
    .string()
    .min(1, "Enrollment year is required")
    .regex(/^\d{4}$/, "Must be a valid year")
    .refine((val) => Number(val) <= new Date().getFullYear(), {
      message: "Can't be in the future",
    }),
  institution: z.string().min(1, "Institution is required"),
  matricule: z.string().min(1, "Matricule is required"),
  major: z.string().min(1, "Major is required"),
  teamName: z.string().min(1, "Team name is required"),
  availability: z.enum(["yes", "partly"]),
  prevExperience: z.enum(["yes", "no"]),
  prevExperienceDetails: z.string(),
  motivation: z.string().min(1, "Motivation is required"),
  skills: z.string().min(1, "Skills are required"),
  github: z.string(),
  linkedin: z.string(),
  portfolio: z.string(),
  behance: z.string(),
})

export type RegistrationSchema = z.infer<typeof registrationSchema>
