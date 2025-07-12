import { Logo } from '@/app/logo'
import { Heading } from '@/components/heading'
import { Strong, Text, TextLink } from '@/components/text'
import type { Metadata } from 'next'
import { RegisterForm } from "@/app/(auth)/register/register-form"

export const metadata: Metadata = {
  title: 'Register',
}

export default function Register() {
  return (
    <div className="grid w-full max-w-sm grid-cols-1 gap-8">
      <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" />
      <Heading>Create your account</Heading>
      <RegisterForm />
      <Text>
        Already have an account?{' '}
        <TextLink href="/login">
          <Strong>Sign in</Strong>
        </TextLink>
      </Text>
    </div>
  )
}
