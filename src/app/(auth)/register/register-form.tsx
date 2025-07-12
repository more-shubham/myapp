'use client'

import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Text } from '@/components/text'
import { useFormState } from 'react-dom'
import { registerUser, type RegisterFormState } from './actions'

const initialState: RegisterFormState = {}

export function RegisterForm() {
  const [state, formAction] = useFormState(registerUser, initialState)

  return (
    <>
      {state.errors?._form && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">
            {state.errors._form.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        </div>
      )}

      <form action={formAction} className="grid grid-cols-1 gap-6">
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" required />
          {state.errors?.email && (
            <Text className="text-red-600 text-sm mt-1">
              {state.errors.email[0]}
            </Text>
          )}
        </Field>

        <Field>
          <Label>Full name</Label>
          <Input name="name" required />
          {state.errors?.name && (
            <Text className="text-red-600 text-sm mt-1">
              {state.errors.name[0]}
            </Text>
          )}
        </Field>

        <Field>
          <Label>Password</Label>
          <Input type="password" name="password" autoComplete="new-password" required />
          {state.errors?.password && (
            <Text className="text-red-600 text-sm mt-1">
              {state.errors.password[0]}
            </Text>
          )}
        </Field>

        <CheckboxField>
          <Checkbox name="newsletter" />
          <Label>Get emails about product updates and news.</Label>
          {state.errors?.newsletter && (
            <Text className="text-red-600 text-sm mt-1">
              {state.errors.newsletter[0]}
            </Text>
          )}
        </CheckboxField>

        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
    </>
  )
}
