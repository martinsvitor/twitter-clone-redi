import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

const mockUseTheme = jest.fn();
jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => mockUseTheme(),
}));

describe('Header', () => {
  beforeEach(() => {
    mockUseTheme.mockClear()
  })

  it('should render header with title', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
      effectiveTheme: 'light',
      mounted: true,
    })

    render(<Header />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('should not render toggle button when not mounted', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
      effectiveTheme: 'light',
      mounted: false,
    })

    render(<Header />)
    
    const button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument()
  })

  it('should render toggle button when mounted', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
      effectiveTheme: 'light',
      mounted: true,
    })

    render(<Header />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should call setTheme with dark when light and button clicked', () => {
    const setThemeMock = jest.fn()
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: setThemeMock,
      effectiveTheme: 'light',
      mounted: true,
    })

    render(<Header />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(setThemeMock).toHaveBeenCalledWith('dark')
  })

  it('should call setTheme with light when dark and button clicked', () => {
    const setThemeMock = jest.fn()
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: setThemeMock,
      effectiveTheme: 'dark',
      mounted: true,
    })

    render(<Header />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(setThemeMock).toHaveBeenCalledWith('light')
  })
})
