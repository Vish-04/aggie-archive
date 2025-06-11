import { render, screen } from '@testing-library/react'
import LandingPageCard from '../LandingPageCard'

test('renders landing page and children correctly', () => {
    render(
        <LandingPageCard>
        <p>children loaded</p>
        </LandingPageCard>
    );
    
    expect(screen.getByText('children loaded')).toBeInTheDocument();
});
  