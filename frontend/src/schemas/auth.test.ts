import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema } from './auth'

describe('loginSchema', () => {
  it('should validate a valid login', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('should fail with empty email', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('E-mail é obrigatório')
    }
  })

  it('should fail with invalid email format', () => {
    const result = loginSchema.safeParse({
      email: 'invalid-email',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('E-mail inválido')
    }
  })

  it('should fail with empty password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Senha é obrigatória')
    }
  })

  it('should accept optional rememberMe field', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
      rememberMe: true,
    })
    expect(result.success).toBe(true)
  })
})

describe('registerSchema', () => {
  it('should validate a valid registration', () => {
    const result = registerSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('should fail with empty name', () => {
    const result = registerSchema.safeParse({
      name: '',
      email: 'john@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Nome é obrigatório')
    }
  })

  it('should fail with name less than 2 characters', () => {
    const result = registerSchema.safeParse({
      name: 'J',
      email: 'john@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Nome deve ter pelo menos 2 caracteres')
    }
  })

  it('should fail with password less than 8 characters', () => {
    const result = registerSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: '1234567',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('A senha deve ter no mínimo 8 caracteres')
    }
  })

  it('should fail with invalid email', () => {
    const result = registerSchema.safeParse({
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('E-mail inválido')
    }
  })
})
