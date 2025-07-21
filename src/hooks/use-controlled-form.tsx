import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, Resolver, SubmitHandler, useForm } from "react-hook-form";
import z, { ZodObject } from "zod";

type AsyncDefaultValues<TFieldValues> = (payload?: unknown) => Promise<TFieldValues>;

export default function useControlledForm<TSchema extends ZodObject<any, z.core.$strip>>({ schema, defaultValues, onSubmit }: {
  schema: TSchema;
  defaultValues?: AsyncDefaultValues<z.infer<TSchema>> | DefaultValues<z.infer<TSchema>>;
  onSubmit?: SubmitHandler<z.infer<TSchema>>;
}) {
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema) as Resolver<z.output<TSchema>, any, z.output<TSchema>>,
    defaultValues
  });

  return [
    form,
    onSubmit && form.handleSubmit(onSubmit),
  ] as const;
}