import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JFormField } from './JFormField'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JFormField', () => {
  it('renders children', () => {
    render(<W><JFormField><input data-testid="inp" /></JFormField></W>)
    expect(screen.getByTestId('inp')).toBeInTheDocument()
  })

  it('shows label text', () => {
    render(<W><JFormField label="Email"><input /></JFormField></W>)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('shows required asterisk when required=true', () => {
    render(<W><JFormField label="Email" required><input /></JFormField></W>)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<W><JFormField error="Required field"><input /></JFormField></W>)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('shows hint text', () => {
    render(<W><JFormField hint="Max 50 chars"><input /></JFormField></W>)
    expect(screen.getByText('Max 50 chars')).toBeInTheDocument()
  })

  it('does not show hint when error is present', () => {
    render(<W><JFormField error="Oops" hint="Max 50"><input /></JFormField></W>)
    expect(screen.queryByText('Max 50')).toBeNull()
    expect(screen.getByText('Oops')).toBeInTheDocument()
  })
})
