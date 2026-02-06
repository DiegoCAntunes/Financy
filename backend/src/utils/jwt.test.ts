import { describe, it, expect, beforeAll, vi } from 'vitest'
import { signJwt, verifyJwt, JwtPayload } from './jwt'

beforeAll(() => {
  vi.stubEnv('JWT_SECRET', 'test-secret-key-for-testing')
})

describe('signJwt', () => {
  it('should sign a JWT token with payload', () => {
    const payload: JwtPayload = {
      id: '123',
      email: 'test@example.com',
    }

    const token = signJwt(payload)

    expect(token).toBeDefined()
    expect(typeof token).toBe('string')
    expect(token.split('.')).toHaveLength(3)
  })

  it('should sign a JWT token with expiration', () => {
    const payload: JwtPayload = {
      id: '123',
      email: 'test@example.com',
    }

    const token = signJwt(payload, '1h')

    expect(token).toBeDefined()
    expect(typeof token).toBe('string')
  })
})

describe('verifyJwt', () => {
  it('should verify and decode a valid token', () => {
    const payload: JwtPayload = {
      id: '123',
      email: 'test@example.com',
    }

    const token = signJwt(payload)
    const decoded = verifyJwt(token)

    expect(decoded.id).toBe(payload.id)
    expect(decoded.email).toBe(payload.email)
  })

  it('should throw error for invalid token', () => {
    expect(() => verifyJwt('invalid-token')).toThrow()
  })

  it('should throw error for tampered token', () => {
    const payload: JwtPayload = {
      id: '123',
      email: 'test@example.com',
    }

    const token = signJwt(payload)
    const tamperedToken = token.slice(0, -5) + 'xxxxx'

    expect(() => verifyJwt(tamperedToken)).toThrow()
  })
})
