"use server";

import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Registration form validation schema
const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  newsletter: z.boolean().optional().default(false),
})

export type RegisterFormState = {
  errors?: {
    email?: string[]
    name?: string[]
    password?: string[]
    newsletter?: string[]
    _form?: string[]
  }
  success?: boolean
}

/**
 * Server action to handle user registration
 */
export async function registerUser(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  // Validate form data
  const validatedFields = registerSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    newsletter: formData.get('newsletter') === 'on',
  })

  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, name, password, newsletter } = validatedFields.data

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return {
        errors: {
          email: ['A user with this email already exists']
        }
      }
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)

    // Create the user
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        newsletter,
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return {
      errors: {
        _form: ['Something went wrong. Please try again.']
      }
    }
  }

  // Redirect after successful registration (outside try-catch)
  redirect('/login?message=Registration successful! Please log in.')
}