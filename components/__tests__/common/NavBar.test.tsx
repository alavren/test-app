import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '@/components/common/NavBar';
import { useRouter } from 'next/navigation';
import { setupEvents } from '@/utils/testUtils';
import { useAuthStore } from '@/store/authStore';

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
}));

jest.mock('./../../../store/authStore', () => ({
  useAuthStore: jest.fn(() => ({
    user: null,
    setUser: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  })),
}));

describe('NavBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login button when user is not authenticated', () => {
    render(<NavBar />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('renders user email and logout button when user is authenticated', async () => {
    const userEmail = 'test@example.com';
    const mockLogout = jest.fn();

    (useRouter as jest.Mock).mockReturnValueOnce({ replace: jest.fn() });
    (useAuthStore as unknown as jest.Mock).mockReturnValueOnce({
      user: { email: userEmail },
      logout: mockLogout,
    });

    const { user } = setupEvents(<NavBar />);

    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();

    await user.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('redirects to login page when user is not authenticated', () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValueOnce({ replace: mockReplace });

    render(<NavBar />);

    expect(mockReplace).toHaveBeenCalledWith('/login');
  });
});
