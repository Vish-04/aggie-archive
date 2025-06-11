import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../FinalHeader';
import { useUser as mockUseUser } from '@auth0/nextjs-auth0/client';


jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: jest.fn(),
}));


describe('Header component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders header when user is not logged in', () => {
    mockUseUser.mockImplementation(() => ({
      user: null,
      isLoading: false,
    }));

    render(<Header />);
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test('renders logo', () => {
    mockUseUser.mockImplementation(() => ({
      user: null,
      isLoading: false,
    }));

    render(<Header />);
    const logo = screen.getAllByAltText('Noteorbit logo');
    expect(logo.length).toBeGreaterThan(0);
  });

  test('renders header when user is logged in', () => {
    mockUseUser.mockImplementation(() => ({
      user: { name: 'Test User', email: 'test@example.com' },
      isLoading: false,
    }));

    render(<Header />);
    expect(screen.getByText('Test User')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test User'));

    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });
});