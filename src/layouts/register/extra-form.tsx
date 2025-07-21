"use client"

import { CustomInput } from "@/components/custom-input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import useControlledForm from "@/hooks/use-controlled-form"
import { submitRegistrationForm } from "@/lib/actions"
import { registrationSchema } from "@/lib/schemas"
import { useRegistrationStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { BriefcaseBusinessIcon, ChevronLeftIcon, FlameIcon, HammerIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Github, Linkedin } from "react-bootstrap-icons"

const formSchema = registrationSchema.pick({
  motivation: true,
  skills: true,
  github: true,
  linkedin: true,
  portfolio: true,
  kaggle: true,
})

const platforms = [
  { name: "github", icon: <Github className="h-5 w-5" /> },
  { name: "linkedin", icon: <Linkedin className="h-5 w-5" /> },
  { name: "portfolio", icon: <BriefcaseBusinessIcon className="h-5 w-5" /> },
  { name: "kaggle", icon: <FlameIcon className="h-5 w-5" /> },
] as const

export default function ExtraForm() {
  const router = useRouter()
  const store = useRegistrationStore()

  const { mutate, isPending } = useMutation({
    mutationFn: () => submitRegistrationForm(store),
    onSuccess: () => {
      store.clearData()
      router.push("/register/success")
    },
    onError: (err) => {
      console.error(err);
      alert("An error occurred while submitting the form. Please try again later.");
    },
  })

  const [form, handleSubmit] = useControlledForm({
    schema: formSchema,
    defaultValues: {
      motivation: store.motivation,
      skills: store.skills,
      github: store.github,
      linkedin: store.linkedin,
      portfolio: store.portfolio,
      kaggle: store.kaggle,
    },
    onSubmit: (values) => {
      store.setData(values)

      mutate()
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-end">
        <div className="space-y-6 min-w-[450px]">
          <FormField
            control={form.control}
            name="motivation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0FFD1]">What motivates you to participate?</FormLabel>
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
                <FormLabel className="text-[#F0FFD1]">What are your skills?</FormLabel>
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
                    <FormLabel className="text-[#F0FFD1]">{platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}</FormLabel>
                    <FormControl>
                      <CustomInput icon={platform.icon} placeholder={`Your ${platform.name.charAt(0).toUpperCase() + platform.name.slice(1)} URL`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div className="bg-gradient-to-r from-[#5D9535] to-[#073B05] rounded-full">
            <div className="p-px bg-gradient-to-r from-[#E9FFD9]/30 to-[#E3E812]/30 rounded-full">
              <div className="bg-background rounded-full">
                <Link href="/register/hackathon" className={cn(buttonVariants({ variant: "default" }), "bg-gradient-to-r from-[#5D9535]/50 to-[#073B05]/30 rounded-full gap-0")}>
                  <ChevronLeftIcon className="text-[#FDFFB4]" />
                  <p className="bg-gradient-to-br from-[#F0FFD1] to-[#FDFFB4] bg-clip-text text-transparent pr-1">Back</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#5D9535] to-[#073B05] rounded-full">
            <div className="p-px bg-gradient-to-r from-[#E9FFD9]/30 to-[#E3E812]/30 rounded-full">
              <Button
                disabled={isPending}
                type="submit"
                className="bg-gradient-to-r from-[#5D9535] to-[#073B05] gap-1 rounded-full"
              >
                <p className="bg-gradient-to-br from-[#F0FFD1] to-[#FDFFB4] bg-clip-text text-transparent">
                  {isPending ? "Submitting..." : "Submit"}
                </p>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}