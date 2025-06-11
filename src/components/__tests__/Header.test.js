import { render, screen } from '@testing-library/react'
import Header from '../FinalHeader'

// Mock useUser hook from auth0
jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: () => ({
    user: null,        // No user logged in
    isLoading: false,  // Not loading
  }),
}))

test('renders header title', () => {
  render(<Header />)
  expect(screen.getByText(/log in/i)).toBeInTheDocument()
})