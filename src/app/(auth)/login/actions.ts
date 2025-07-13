"use server";

import { prisma } from '@/lib/prisma'
import { comparePassword } from '@/lib/password'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { z } from 'zod'

// Login form validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional().default(false),
})

export type LoginFormState = {
  errors?: {
    email?: string[]
    password?: string[]
    remember?: string[]
    _form?: string[]
  }
  success?: boolean
}

/**
 * Set session cookie after successful login
 */
async function setSessionCookie(userId: string, remember: boolean) {
  const cookieStore = cookies()
  
  // Create a simple session token (in production, use JWT or proper session management)
  const sessionData = {
    userId,
    loginTime: Date.now()
  }
  
  const maxAge = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days if remember, 1 day otherwise
  
  cookieStore.set('session', JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/'
  })
}

/**
 * Get current session data from cookies
 */
export async function getSession(): Promise<{ userId: string; loginTime: number } | null> {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('session')
  
  if (!sessionCookie) {
    return null
  }
  
  try {
    return JSON.parse(sessionCookie.value)
  } catch {
    return null
  }
}

/**
 * Clear session cookie (logout)
 */
export async function clearSession() {
  const cookieStore = cookies()
  cookieStore.delete('session')
}

/**
 * Server action to handle user login
 */
export async function loginUser(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  // Validate form data
  const validatedFields = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    remember: formData.get('remember') === 'on',
  })

  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password, remember } = validatedFields.data

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      }
    })

    // Check if user exists
    if (!user) {
      return {
        errors: {
          _form: ['Invalid email or password']
        }
      }
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password)
    
    if (!isValidPassword) {
      return {
        errors: {
          _form: ['Invalid email or password']
        }
      }
    }

    // Set session cookie
    await setSessionCookie(user.id, remember)
    
  } catch (error) {
    return {
      errors: {
        _form: ['Something went wrong. Please try again.']
      }
    }
  }

  // Get return URL from form data or default to home
  const returnUrl = formData.get('returnUrl') as string || '/'
  
  // Validate return URL to prevent open redirect attacks
  const isValidReturnUrl = (url: string): boolean => {
    try {
      // Only allow relative URLs that start with / 
      // and don't contain protocol or domain
      return url.startsWith('/') && !url.startsWith('//') && !url.includes('://') && url.length < 2048
    } catch {
      return false
    }
  }
  
  const safeReturnUrl = isValidReturnUrl(returnUrl) ? returnUrl : '/'
  
  // Redirect after successful login (outside try-catch)
  redirect(safeReturnUrl + (safeReturnUrl.includes('?') ? '&' : '?'))
}

/**
 * Check if user is authenticated and get user data
 */
export async function getCurrentUser() {
  const session = await getSession()
  
  if (!session) {
    return null
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        name: true,
        newsletter: true,
        createdAt: true,
      }
    })
    
    return user
  } catch {
    return null
  }
}

/**
 * Server action to handle user logout
 */
export async function logoutUser() {
  await clearSession()
  redirect('/login')
}

