"use client";

import PersonalForm from '@/layouts/register/personal-form'
import { useRegistrationStore } from '@/lib/store'

export default function PersonalFormPage() {
  const store = useRegistrationStore()

  if (!store.hasHydrated) return (
    <div className="flex items-center justify-center h-screen">
      <p>Loading...</p>
    </div>
  )

  return <PersonalForm />
}
