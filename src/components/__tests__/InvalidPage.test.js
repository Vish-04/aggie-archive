import { render, screen } from '@testing-library/react'
import InvalidPage from '../InvalidPage'

test('renders invalid page correcly', () => {
    render(<InvalidPage/>)
    expect(screen.getByText('Return Home')).toBeInTheDocument();
    expect(screen.getByText('Invalid Class')).toBeInTheDocument();
})