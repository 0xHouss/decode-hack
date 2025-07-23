"use client"

import { CustomInput } from "@/components/custom-input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import useControlledForm from "@/hooks/use-controlled-form"
import { registrationSchema } from "@/lib/schemas"
import { useRegistrationStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, GraduationCapIcon, HashIcon, SchoolIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const formSchema = registrationSchema.pick({
  enrollmentYear: true,
  matricule: true,
  institution: true,
  major: true,
})

export default function AcademicForm() {
  const router = useRouter()
  const store = useRegistrationStore()

  const [form, handleSubmit] = useControlledForm({
    schema: formSchema,
    defaultValues: {
      enrollmentYear: store.enrollmentYear,
      matricule: store.matricule,
      institution: store.institution,
      major: store.major,
    },
    onSubmit: (values) => {
      store.setState(values)
      router.push("/register/hackathon")
    },
  })

  useEffect(() => {
    if (!store.rehydrated) return;

    if (!store.firstName || !store.lastName || !store.email || !store.phone || !store.birthDate || !store.discord)
      router.push("/register/personal");

    form.reset({
      enrollmentYear: store.enrollmentYear,
      matricule: store.matricule,
      institution: store.institution,
      major: store.major,
    })
  }, [store, form])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-end">
        <div className="space-y-6 md:min-w-[450px]">
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0FFD1]">Where did/do you study?</FormLabel>
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
            rules={{ max: new Date().getFullYear() }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0FFD1]">When did you enroll?</FormLabel>
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
                <FormLabel className="text-[#F0FFD1]">What is your Matricule?</FormLabel>
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
                <FormLabel className="text-[#F0FFD1]">What is your major?</FormLabel>
                <FormControl>
                  <CustomInput icon={<GraduationCapIcon className="h-5 w-5" />} placeholder="Field of Study" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between w-full">
          <div className="bg-gradient-to-r from-[#5D9535] to-[#073B05] rounded-full">
            <div className="p-px bg-gradient-to-r from-[#E9FFD9]/30 to-[#E3E812]/30 rounded-full">
              <div className="bg-background rounded-full">
                <Link
                  href="/register/personal"
                  className={cn(buttonVariants({ variant: "default" }), "bg-gradient-to-r from-[#5D9535]/50 to-[#073B05]/30 rounded-full gap-0")}
                  onClick={() => store.setState({
                    ...form.getValues()
                  })}
                >
                  <ChevronLeftIcon className="text-[#FDFFB4]" />
                  <p className="bg-gradient-to-br from-[#F0FFD1] to-[#FDFFB4] bg-clip-text text-transparent pr-1">Back</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#5D9535] to-[#073B05] rounded-full">
            <div className="p-px bg-gradient-to-r from-[#E9FFD9]/30 to-[#E3E812]/30 rounded-full">
              <Button type="submit" className="bg-gradient-to-r from-[#5D9535] to-[#073B05] gap-1 rounded-full">
                <p className="bg-gradient-to-br from-[#F0FFD1] to-[#FDFFB4] bg-clip-text text-transparent pl-1">Next</p>
                <ChevronRightIcon className="text-[#FDFFB4]" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
