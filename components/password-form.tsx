"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import * as z from "zod"

import { SECRET } from "@/constants"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  password: z.string().refine((value) => value === SECRET, {
    message: "Retorne imediatamente para a casa do caralho.",
  }),
})

export function PasswordForm({ onAuthorize }: { onAuthorize: () => void }) {
  const form = useForm<
    z.input<typeof formSchema>,
    unknown,
    z.output<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  })
  const password = useWatch({ control: form.control, name: "password" })

  return (
    <form
      id="password-form"
      className="w-full max-w-sm space-y-6"
      onSubmit={form.handleSubmit(onAuthorize)}
    >
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Júlia Midory 💋</h1>
        <p className="text-sm text-muted-foreground">
            Digite a senha corretamente. Caso contrário, favor retornar imediatamente para a casa do caralho.
            <br />
            <br />
            Atenciosamente,
            <br />
            Daniel 🛹
        </p>
      </header>
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Digite sua senha"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Field className="justify-end" orientation="horizontal">
          <Button
            type="button"
            variant="ghost"
            disabled={!password}
            onClick={() => form.reset()}
          >
            Limpar
          </Button>
          <Button type="submit">Entrar</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}