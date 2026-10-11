"use client"

import { CustomInput } from "@/components/custom-input"
import { FormError } from "@/components/form-error"
import { PillButton, PillLink } from "@/components/pill-button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import useRegistrationStep from "@/hooks/use-registration-step"
import { submitRegistrationForm } from "@/lib/actions"
import { useRegistrationStore } from "@/lib/store"
import { BriefcaseBusinessIcon, FlameIcon, HammerIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Behance, Github, Linkedin } from "react-bootstrap-icons"

const platforms = [
  { name: "github", label: "GitHub", icon: <Github className="h-5 w-5" /> },
  { name: "linkedin", label: "LinkedIn", icon: <Linkedin className="h-5 w-5" /> },
  { name: "portfolio", label: "Portfolio", icon: <BriefcaseBusinessIcon className="h-5 w-5" /> },
  { name: "behance", label: "Behance", icon: <Behance className="h-5 w-5" /> },
] as const

export default function ExtraForm() {
  const router = useRouter()

  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  // Runs after the hook has saved this step, so the store holds every answer
  const submit = () => startTransition(async () => {
    try {
      const result = await submitRegistrationForm(useRegistrationStore.getState())

      if (result?.error) return setError(result.error)

      router.push("/register/success")
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  })

  const { form, handleSubmit, saveDraft } = useRegistrationStep("extra", submit)

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-end">
        <div className="space-y-6 md:min-w-[450px]">
          <FormField
            control={form.control}
            name="motivation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cream">What motivates you to participate?</FormLabel>
                <FormControl>
                  <CustomInput icon={<FlameIcon className="h-5 w-5" />} placeholder="Motivation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cream">What are your skills?</FormLabel>
                <FormControl>
                  <CustomInput icon={<HammerIcon className="h-5 w-5" />} placeholder="Skills (comma separated)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platforms.map((platform) => (
              <FormField
                key={platform.name}
                control={form.control}
                name={platform.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cream">{platform.label} (optional)</FormLabel>
                    <FormControl>
                      <CustomInput icon={platform.icon} placeholder={`Your ${platform.label} URL`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <FormError error={error} />
        </div>

        <div className="flex justify-between w-full">
          <PillLink href="/register/hackathon" variant="faded" direction="back" onClick={saveDraft}>Back</PillLink>

          <PillButton type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </PillButton>
        </div>
      </form>
    </Form>
  )
}
