import { z } from "zod"
import { parseDate } from "./utils"

// Parses a web link, adding the https:// people often leave out
const parseLink = (value: string) => {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    // URL accepts any host name, so this rules out typos like "github" alone
    return url.hostname.includes(".") ? url : null
  } catch {
    return null
  }
}

// An optional link: empty, or a web link, on the given site if there is one
const optionalLink = (site?: { name: string, domain: string }) =>
  z.string().refine((value) => {
    if (!value) return true

    const url = parseLink(value.trim())
    if (!url || !site) return !!url

    return url.hostname === site.domain || url.hostname.endsWith(`.${site.domain}`)
  }, site ? `Must be a ${site.name} link` : "Must be a valid link")

// Each field with its own rules. The registration steps pick their fields from
// this: Zod can't pick fields from an object that has a refinement on it.
export const registrationFields = z.object({
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
  github: optionalLink({ name: "GitHub", domain: "github.com" }),
  linkedin: optionalLink({ name: "LinkedIn", domain: "linkedin.com" }),
  portfolio: optionalLink(),
  behance: optionalLink({ name: "Behance", domain: "behance.net" }),
})

export type RegistrationSchema = z.infer<typeof registrationFields>

type ExperienceFields = Pick<RegistrationSchema, "prevExperience" | "prevExperienceDetails">

// Requires the experience details when the answer is "yes". Applied to the
// hackathon step and to the full schema, after their fields are picked.
export const requireExperienceDetails = <T extends z.ZodType<ExperienceFields>>(schema: T) =>
  schema.refine(
    (data) => data.prevExperience === "no" || data.prevExperienceDetails.trim() !== "",
    {
      message: "Tell us which hackathons you took part in",
      path: ["prevExperienceDetails"],
      // Check even when other fields have errors, as long as the answer itself is valid
      when: ({ issues }) => issues.every((issue) => issue.path?.[0] !== "prevExperience"),
    },
  )

export const registrationSchema = requireExperienceDetails(registrationFields)
