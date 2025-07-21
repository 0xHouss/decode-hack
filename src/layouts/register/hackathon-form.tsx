"use client"

import { CustomInput } from "@/components/custom-input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import useControlledForm from "@/hooks/use-controlled-form"
import { registrationSchema } from "@/lib/schemas"
import { useRegistrationStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const formSchema = registrationSchema.pick({
  teamName: true,
  availability: true,
  prevExperience: true,
  prevExperienceDetails: true,
})

export default function HackathonForm() {
  const router = useRouter()
  const store = useRegistrationStore()

  const [form, handleSubmit] = useControlledForm({
    schema: formSchema,
    defaultValues: {
      teamName: store.teamName,
      availability: store.availability,
      prevExperience: store.prevExperience,
      prevExperienceDetails: store.prevExperienceDetails,
    },
    onSubmit: async (values) => {
      store.setData(values)
      router.push("/register/extra")
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-end">
        <div className="space-y-6 min-w-[450px]">
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0FFD1]">What is your team name?</FormLabel>
                <FormControl>
                  <CustomInput icon={<UsersIcon className="h-5 w-5" />} placeholder="Team name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <div className="relative bg-gradient-to-b from-[#398B56] to-[#17271D] h-fit p-px rounded-2xl">
                <FormItem className="space-y-2 bg-[#050B08] p-4 rounded-2xl">
                  <FormLabel className="text-[#F0FFD1]">Will you be available during the days of the hackathon?</FormLabel>
                  <FormControl>
                    <RadioGroup {...field} onValueChange={(value) => field.onChange(value)} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="option-one" />
                        <Label htmlFor="option-one">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="partly" id="option-two" />
                        <Label htmlFor="option-two">Not all days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="option-three" />
                        <Label htmlFor="option-three">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="prevExperience"
            render={({ field }) => (
              <div className="relative bg-gradient-to-b from-[#398B56] to-[#17271D] h-fit p-px rounded-2xl">
                <FormItem className="space-y-2 bg-[#050B08] p-4 rounded-2xl">
                  <FormLabel className="text-[#F0FFD1]">Do you have any experience in hackathons?</FormLabel>
                  <FormControl>
                    <RadioGroup {...field} onValueChange={(value) => field.onChange(value)} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="option-one" />
                        <Label htmlFor="option-one">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="option-two" />
                        <Label htmlFor="option-two">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="prevExperienceDetails"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative bg-gradient-to-b from-[#398B56] to-[#17271D] h-fit p-px rounded-2xl">
                    <Textarea
                      placeholder="If yes, which ones?"
                      className="rounded-2xl border-0 dark:bg-[#050B08] placeholder:text-[#F0FFD1]/50"
                      {...field} />
                  </div>
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
                <Link href="/register/academic" className={cn(buttonVariants({ variant: "default" }), "bg-gradient-to-r from-[#5D9535]/50 to-[#073B05]/30 rounded-full gap-0")}>
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