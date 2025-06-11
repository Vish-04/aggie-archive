import { render, screen } from '@testing-library/react'
import Header from '../FinalHeader'

// set user to nil
jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: () => ({
    user: null,
    isLoading: false,
  }),
}))

// render header when no user is logged in
test('render header', () => {
  render(<Header />)
  expect(screen.getByText(/log in/i)).toBeInTheDocument()
  expect(screen.getByText(/sign up/i)).toBeInTheDocument()
})

// render all logos
test('render header logo', () => {
    render(<Header />)
    const logo = screen.getAllByAltText('Noteorbit logo')
    expect(logo.length).toBeGreaterThan(0)
})


