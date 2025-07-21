"use client";

import HackathonForm from '@/layouts/register/hackathon-form';
import { useRegistrationStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function HackathonFormPage() {
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

  return <HackathonForm />
}
