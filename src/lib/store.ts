import { create } from "zustand"
import { persist } from "zustand/middleware"
import { RegistrationSchema } from "./schemas"

export const initialRegistrationData: RegistrationSchema = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
  discord: "",
  enrollmentYear: "",
  institution: "",
  matricule: "",
  major: "",
  teamName: "",
  availability: "yes",
  prevExperience: "no",
  prevExperienceDetails: "",
  motivation: "",
  skills: "",
  github: "",
  linkedin: "",
  portfolio: "",
  behance: "",
}

// The answers given so far, saved to localStorage so they survive reloads.
// Update them with useRegistrationStore.setState().
export const useRegistrationStore = create<RegistrationSchema>()(
  persist(
    () => initialRegistrationData,
    { name: "registration-store" }
  )
)
