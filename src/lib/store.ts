import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { RegistrationSchema } from "./schemas"

export type RegistrationState = Partial<RegistrationSchema> & {
  setState: (partial: Partial<RegistrationSchema>) => void
  clearData: () => void
  rehydrated: boolean;
  setRehydrated: (v: boolean) => void;
}

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
      NIN: "",
      enrollmentYear: "",
      institution: "",
      matricule: "",
      major: "",
      teamName: "",
      availability: "yes" as const,
      prevExperience: "no" as const,
      prevExperienceDetails: "",
      motivation: "",
      skills: "",
      github: "",
      linkedin: "",
      portfolio: "",
      kaggle: "",
      rehydrated: false,
      setRehydrated: (value) => set({ rehydrated: value }),
      setState: (partial) => set(() => ({ ...partial })),
      clearData: () => set(() => ({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
        NIN: "",
        enrollmentYear: "",
        institution: "",
        matricule: "",
        major: "",
        teamName: "",
        availability: "yes" as const,
        prevExperience: "no" as const,
        prevExperienceDetails: "",
        motivation: "",
        skills: "",
        github: "",
        linkedin: "",
        portfolio: "",
        kaggle: "",
      })),
    }),
    {
      name: "registration-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage() {
        return finalState => {
          if (finalState?.setRehydrated)
            finalState.setRehydrated(true)
        }
      },
    }
  )
)
