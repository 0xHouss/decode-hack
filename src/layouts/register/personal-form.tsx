"use client"

import { CustomInput } from "@/components/custom-input"
import { DatePicker } from "@/components/date-picker"
import { PillButton } from "@/components/pill-button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import useRegistrationStep from "@/hooks/use-registration-step"
import { MailIcon, PhoneIcon, UserIcon } from "lucide-react"
import { Discord } from "react-bootstrap-icons"

export default function PersonalForm() {
  const { form, handleSubmit } = useRegistrationStep("personal")

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
            name="discord"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0FFD1]">What&apos;s your Discord username?</FormLabel>
                <FormControl>
                  <CustomInput icon={<Discord className="h-5 w-5" />} placeholder="Discord username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <PillButton type="submit" direction="next">Next</PillButton>
      </form>
    </Form>
  )
}
