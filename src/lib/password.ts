import bcrypt from 'bcryptjs'

/**
 * Hash a password using bcrypt
 * @param password - Plain text password to hash
 * @returns Promise<string> - Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

/**
 * Compare a plain text password with a hashed password
 * @param password - Plain text password
 * @param hashedPassword - Hashed password to compare against
 * @returns Promise<boolean> - True if passwords match, false otherwise
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
