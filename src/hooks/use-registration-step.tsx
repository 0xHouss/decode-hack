import { RegistrationStepName, registrationSteps } from "@/lib/registration-steps"
import { RegistrationSchema } from "@/lib/schemas"
import { initialRegistrationData, useRegistrationStore } from "@/lib/store"
import { pick } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useSyncExternalStore } from "react"
import { DefaultValues, useForm } from "react-hook-form"
import z from "zod"

// Object keys keep their insertion order, which is the order the steps are filled in
const stepNames = Object.keys(registrationSteps) as RegistrationStepName[]

const fieldsOf = (name: RegistrationStepName) =>
  Object.keys(registrationSteps[name].schema.shape) as (keyof RegistrationSchema)[]

// Saved answers come from localStorage, which the server can't read. The store
// loads them synchronously on the client, so they're available once hydrated.
const subscribe = () => () => {}
const useHasHydrated = () => useSyncExternalStore(subscribe, () => true, () => false)

// Sets up the form for one registration step: it starts from the saved answers,
// sends the user back to the first earlier step they haven't completed, and saves
// the answers on submit before calling onSubmit, which defaults to the next step.
export default function useRegistrationStep<TName extends RegistrationStepName>(
  name: TName,
  onSubmit?: () => void,
) {
  type Values = z.infer<(typeof registrationSteps)[TName]["schema"]>

  const router = useRouter()
  const hasHydrated = useHasHydrated()
  const stepIndex = stepNames.indexOf(name)

  const form = useForm<Values>({
    // While TName is generic, TypeScript sees the schema as a union of all four steps
    // and can't tie it to Values, so it is narrowed by hand
    resolver: zodResolver(registrationSteps[name].schema as unknown as z.ZodType<Values, Values>),
    // Start empty while hydrating, so the client's first render matches the server's
    defaultValues: pick(hasHydrated ? useRegistrationStore.getState() : initialRegistrationData, fieldsOf(name)) as DefaultValues<Values>,
  })

  const handleSubmit = form.handleSubmit((values) => {
    useRegistrationStore.setState(values)

    if (onSubmit) onSubmit()
    else router.push(registrationSteps[stepNames[stepIndex + 1]].path)
  })

  useEffect(() => {
    if (!hasHydrated) return

    const answers = useRegistrationStore.getState()

    const incompleteStep = stepNames
      .slice(0, stepIndex)
      .find((step) => !registrationSteps[step].schema.safeParse(answers).success)

    if (incompleteStep) {
      router.replace(registrationSteps[incompleteStep].path)
      return
    }

    form.reset(pick(answers, fieldsOf(name)) as Values)
  }, [hasHydrated, name, stepIndex, form, router])

  // Saves the answers without validating them, for leaving the step backwards
  const saveDraft = () => useRegistrationStore.setState(form.getValues())

  return { form, handleSubmit, saveDraft }
}
