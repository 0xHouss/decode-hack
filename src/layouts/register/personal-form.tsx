"use client"

import { CustomInput } from "@/components/custom-input"
import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import useControlledForm from "@/hooks/use-controlled-form"
import { registrationSchema } from "@/lib/schemas"
import { useRegistrationStore } from "@/lib/store"
import { ChevronRightIcon, IdCardIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const formSchema = registrationSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  birthDate: true,
  NIN: true,
})

export default function PersonalForm() {
  const router = useRouter()

  const store = useRegistrationStore()

  const [form, handleSubmit] = useControlledForm({
    schema: formSchema,
    defaultValues: {
      firstName: store.firstName,
      lastName: store.lastName,
      email: store.email,
      phone: store.phone,
      birthDate: store.birthDate,
      NIN: store.NIN,
    },
    onSubmit: (values) => {
      store.setState(values)
      router.push("/register/academic")
    },
  })

  useEffect(() => {
    if (!store.rehydrated) return;

    form.reset({
      firstName: store.firstName,
      lastName: store.lastName,
      email: store.email,
      phone: store.phone,
      birthDate: store.birthDate,
      NIN: store.NIN,
    })
  }, [store.rehydrated, form])

  console.log(store)

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-end">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0FFD1]">What&apos;s your first name?</FormLabel>
                <FormControl>
                  <CustomInput icon={<UserIcon className="h-5 w-5" />} placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0FFD1]">What&apos;s your last name?</FormLabel>
                <FormControl>
                  <CustomInput icon={<UserIcon className="h-5 w-5" />} placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0FFD1]">What&apos;s your email?</FormLabel>
                <FormControl>
                  <CustomInput icon={<MailIcon className="h-5 w-5" />} placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0FFD1]">What&apos;s your phone number?</FormLabel>
                <FormControl>
                  <CustomInput icon={<PhoneIcon className="h-5 w-5" />} placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0FFD1]">What&apos;s your birth date?</FormLabel>
                <FormControl>
                  <DatePicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="NIN"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0FFD1]">What&apos;s your National ID number?</FormLabel>
                <FormControl>
                  <CustomInput icon={<IdCardIcon className="h-5 w-5" />} placeholder="National ID number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-gradient-to-r from-[#5D9535] to-[#073B05] rounded-full">
          <div className="p-px bg-gradient-to-r from-[#E9FFD9]/30 to-[#E3E812]/30 rounded-full">
            <Button type="submit" className="bg-gradient-to-r from-[#5D9535] to-[#073B05] gap-1 rounded-full">
              <p className="bg-gradient-to-br from-[#F0FFD1] to-[#FDFFB4] bg-clip-text text-transparent pl-1">Next</p>
              <ChevronRightIcon className="text-[#FDFFB4]" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
