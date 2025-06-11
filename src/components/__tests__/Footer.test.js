import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

// render footer
test('render footer', () => {
    render(<Footer />)
    const matches = screen.getAllByText('@ Spring Quarter 2025 | ECS 162')
    expect(matches.length).toBeGreaterThan(0)
})

// render all logos
test('render footer logo', () => {
    render(<Footer />)
    const logo = screen.getAllByAltText('Noteorbit logo')
    expect(logo.length).toBeGreaterThan(0)
})