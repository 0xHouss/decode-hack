import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { RegistrationSchema } from "./schemas"

export type RegistrationState = Partial<RegistrationSchema> & {
  setData: (data: Partial<RegistrationSchema>) => void
  clearData: () => void
  hasHydrated: boolean
  // setHasHydrated: (value: boolean) => void
}

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: undefined,
  NIN: "",
  enrollmentYear: undefined,
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
  hasHydrated: false,
}

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      ...defaultValues,
      setData: (data) => set((state) => ({ ...state, ...data })),
      clearData: () => set(defaultValues),
    }),
    {
      name: "registration-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage(state) {
        state.hasHydrated = true

        return stateAfterRehydrate => {
          if (stateAfterRehydrate?.birthDate && typeof stateAfterRehydrate.birthDate === "string") {
            stateAfterRehydrate.birthDate = new Date(stateAfterRehydrate.birthDate)
          }
        }
      },
    }
  )
)
