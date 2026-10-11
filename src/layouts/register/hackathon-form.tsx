"use client"

import { CustomInput } from "@/components/custom-input"
import { PillButton, PillLink } from "@/components/pill-button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import useRegistrationStep from "@/hooks/use-registration-step"
import { UsersIcon } from "lucide-react"
import { useWatch } from "react-hook-form"

export default function HackathonForm() {
  const { form, handleSubmit, saveDraft } = useRegistrationStep("hackathon")
  const hasExperience = useWatch({ control: form.control, name: "prevExperience" }) === "yes"

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-end">
        <div className="space-y-6 md:min-w-[450px]">
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
                  <FormLabel className="text-[#F0FFD1] text-wrap">Will you be available from July 31st to August 3rd?</FormLabel>
                  <FormControl>
                    <RadioGroup name={field.name} value={field.value} onValueChange={field.onChange} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="availability-yes" />
                        <Label htmlFor="availability-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="partly" id="availability-partly" />
                        <Label htmlFor="availability-partly">Not all days</Label>
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
                  <FormLabel className="text-[#F0FFD1] text-wrap">Do you have any experience in hackathons?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      name={field.name}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        // Don't keep details for an answer that no longer asks for them
                        if (value === "no") form.setValue("prevExperienceDetails", "")
                      }}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="experience-yes" />
                        <Label htmlFor="experience-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="experience-no" />
                        <Label htmlFor="experience-no">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          {hasExperience && (
            <FormField
              control={form.control}
              name="prevExperienceDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#F0FFD1]">Which ones?</FormLabel>
                  <FormControl>
                    <div className="relative bg-gradient-to-b from-[#398B56] to-[#17271D] h-fit p-px rounded-2xl">
                      <Textarea
                        placeholder="Hackathons you took part in"
                        className="rounded-2xl border-0 bg-[#050B08] dark:bg-[#050B08] placeholder:text-[#F0FFD1]/50"
                        {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="flex justify-between w-full">
          <PillLink href="/register/academic" variant="faded" direction="back" onClick={saveDraft}>Back</PillLink>

          <PillButton type="submit" direction="next">Next</PillButton>
        </div>
      </form>
    </Form>
  )
}
