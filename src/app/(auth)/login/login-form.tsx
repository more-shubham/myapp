'use client'

import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Strong, Text, TextLink } from '@/components/text'
import { useFormState } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { loginUser, type LoginFormState } from './actions'

const initialState: LoginFormState = {}

export function LoginForm() {
  const [state, formAction] = useFormState(loginUser, initialState)
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl')

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
        {/* Hidden input to pass return URL */}
        {returnUrl && (
          <input type="hidden" name="returnUrl" value={returnUrl} />
        )}
        
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" autoComplete="email" required />
          {state.errors?.email && (
            <Text className="text-red-600 text-sm mt-1">
              {state.errors.email[0]}
            </Text>
          )}
        </Field>

        <Field>
          <Label>Password</Label>
          <Input type="password" name="password" autoComplete="current-password" required />
          {state.errors?.password && (
            <Text className="text-red-600 text-sm mt-1">
              {state.errors.password[0]}
            </Text>
          )}
        </Field>

        <div className="flex items-center justify-between">
          <CheckboxField>
            <Checkbox name="remember" />
            <Label>Remember me</Label>
          </CheckboxField>
          <Text>
            <TextLink href="/forgot-password">
              <Strong>Forgot password?</Strong>
            </TextLink>
          </Text>
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </>
  )
}
