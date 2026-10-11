import { registrationSchema } from "./schemas"

// The registration form's steps, in the order they're filled in.
// Each step validates its own slice of the registration schema.
export const registrationSteps = {
  personal: {
    path: "/register/personal",
    schema: registrationSchema.pick({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      birthDate: true,
      discord: true,
    }),
  },
  academic: {
    path: "/register/academic",
    schema: registrationSchema.pick({
      institution: true,
      enrollmentYear: true,
      matricule: true,
      major: true,
    }),
  },
  hackathon: {
    path: "/register/hackathon",
    schema: registrationSchema.pick({
      teamName: true,
      availability: true,
      prevExperience: true,
      prevExperienceDetails: true,
    }),
  },
  extra: {
    path: "/register/extra",
    schema: registrationSchema.pick({
      motivation: true,
      skills: true,
      github: true,
      linkedin: true,
      portfolio: true,
      behance: true,
    }),
  },
}

export type RegistrationStepName = keyof typeof registrationSteps
