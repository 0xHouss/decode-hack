import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { RegistrationSchema } from "./schemas"

const initialData: RegistrationSchema = {
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

export type RegistrationState = Partial<RegistrationSchema> & {
  setState: (partial: Partial<RegistrationSchema>) => void
  clearData: () => void
  rehydrated: boolean;
  setRehydrated: (v: boolean) => void;
}

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      ...initialData,
      rehydrated: false,
      setRehydrated: (value) => set({ rehydrated: value }),
      setState: (partial) => set(() => ({ ...partial })),
      clearData: () => set(() => ({ ...initialData })),
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
