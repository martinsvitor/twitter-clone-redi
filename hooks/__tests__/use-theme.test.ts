import { renderHook, act, waitFor } from '@testing-library/react'
import { useTheme } from '../use-theme'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
  removeItem: jest.fn(),
};
global.localStorage = localStorageMock as Storage;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('useTheme', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    document.documentElement.classList.remove('light', 'dark')
  })

  it('should default to system theme', async () => {
    localStorageMock.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useTheme())
    
    await waitFor(() => expect(result.current.mounted).toBe(true))
    expect(result.current.theme).toBe('system')
  })

  it('should set theme', async () => {
    localStorageMock.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useTheme())
    
    await waitFor(() => expect(result.current.mounted).toBe(true))
    
    act(() => {
      result.current.setTheme('light')
    })
    
    expect(result.current.theme).toBe('light')
  })

  it('should apply theme class to document', async () => {
    localStorageMock.getItem.mockReturnValue('light')
    const { result } = renderHook(() => useTheme())
    
    await waitFor(() => expect(result.current.mounted).toBe(true))
    
    act(() => {
      result.current.setTheme('dark')
    })
    
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
  })

  it('should be mounted after effect runs', async () => {
    const { result } = renderHook(() => useTheme())
    
    await waitFor(() => expect(result.current.mounted).toBe(true))
  })

  it('should return effective theme based on theme state', async () => {
    localStorageMock.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useTheme())
    
    await waitFor(() => expect(result.current.mounted).toBe(true))
    
    act(() => {
      result.current.setTheme('light')
    })
    
    expect(result.current.effectiveTheme).toBe('light')
  })
})
