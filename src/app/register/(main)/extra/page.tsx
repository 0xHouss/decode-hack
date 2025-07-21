"use client";

import ExtraForm from '@/layouts/register/extra-form';
import { useRegistrationStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function ExtraFormPage() {
  const store = useRegistrationStore()
  const router = useRouter()

  if (!store.hasHydrated) return (
    <div className="flex items-center justify-center h-screen">
      <p>Loading...</p>
    </div>
  )

  if (!store.firstName || !store.lastName || !store.email || !store.phone || !store.birthDate || !store.NIN) {
    router.push("/register/personal");
    return null;
  }

  if (!store.institution || !store.enrollmentYear || !store.matricule || !store.major) {
    router.push("/register/academic");
    return null;
  }

  if (!store.teamName || !store.availability || !store.prevExperience) {
    router.push("/register/hackathon");
    return null;
  }

  return <ExtraForm />
}
