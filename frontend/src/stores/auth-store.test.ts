import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthStore } from './auth-store'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('useAuthStore', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()

    const store = useAuthStore.getState()
    store.logout()
  })

  it('should have initial state', () => {
    const state = useAuthStore.getState()

    expect(state.token).toBeNull()
    expect(state.refreshToken).toBeNull()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.rememberMe).toBe(false)
  })

  it('should set auth state correctly', () => {
    const store = useAuthStore.getState()
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' }

    store.setAuth('access-token', 'refresh-token', mockUser)

    const updatedState = useAuthStore.getState()
    expect(updatedState.token).toBe('access-token')
    expect(updatedState.refreshToken).toBe('refresh-token')
    expect(updatedState.user).toEqual(mockUser)
    expect(updatedState.isAuthenticated).toBe(true)
  })

  it('should store tokens in localStorage', () => {
    const store = useAuthStore.getState()
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' }

    store.setAuth('access-token', 'refresh-token', mockUser)

    expect(localStorageMock.setItem).toHaveBeenCalledWith('financy-token', 'access-token')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('financy-refresh-token', 'refresh-token')
  })

  it('should set rememberMe correctly', () => {
    const store = useAuthStore.getState()

    store.setRememberMe(true)

    expect(useAuthStore.getState().rememberMe).toBe(true)

    store.setRememberMe(false)

    expect(useAuthStore.getState().rememberMe).toBe(false)
  })

  it('should logout and clear state', () => {
    const store = useAuthStore.getState()
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' }

    store.setAuth('access-token', 'refresh-token', mockUser)
    store.logout()

    const loggedOutState = useAuthStore.getState()
    expect(loggedOutState.token).toBeNull()
    expect(loggedOutState.refreshToken).toBeNull()
    expect(loggedOutState.user).toBeNull()
    expect(loggedOutState.isAuthenticated).toBe(false)
  })

  it('should remove tokens from localStorage on logout', () => {
    const store = useAuthStore.getState()
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' }

    store.setAuth('access-token', 'refresh-token', mockUser)
    store.logout()

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('financy-token')
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('financy-refresh-token')
  })
})
