"use client"

import { CustomInput } from "@/components/custom-input"
import { PillButton, PillLink } from "@/components/pill-button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import useRegistrationStep from "@/hooks/use-registration-step"
import { CalendarIcon, GraduationCapIcon, HashIcon, SchoolIcon } from "lucide-react"

export default function AcademicForm() {
  const { form, handleSubmit, saveDraft } = useRegistrationStep("academic")

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-end">
        <div className="space-y-6 md:min-w-[450px]">
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cream">Where did/do you study?</FormLabel>
                <FormControl>
                  <CustomInput icon={<SchoolIcon className="h-5 w-5" />} placeholder="Institution" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enrollmentYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cream">When did you enroll?</FormLabel>
                <FormControl>
                  <CustomInput
                    icon={<CalendarIcon className="h-5 w-5" />}
                    placeholder="Enrollment Year"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="matricule"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cream">What is your Matricule?</FormLabel>
                <FormControl>
                  <CustomInput icon={<HashIcon className="h-5 w-5" />} placeholder="Matricule" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cream">What is your major?</FormLabel>
                <FormControl>
                  <CustomInput icon={<GraduationCapIcon className="h-5 w-5" />} placeholder="Field of Study" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between w-full">
          <PillLink href="/register/personal" variant="faded" direction="back" onClick={saveDraft}>Back</PillLink>

          <PillButton type="submit" direction="next">Next</PillButton>
        </div>
      </form>
    </Form>
  )
}
