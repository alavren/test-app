import { render, screen } from '@testing-library/react';
import LoginForm from '@/components/forms/LoginForm';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { setupEvents } from '@/utils/testUtils';

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

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields', () => {
    render(<LoginForm />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValueOnce({ push: mockPush });

    const mockLogin = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValueOnce({
      login: mockLogin,
    });

    const { user } = setupEvents(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Login');

    const userData = {
      email: 'test@example.com',
      password: 'password123',
    };

    await user.type(emailInput, userData.email);
    await user.type(passwordInput, userData.password);
    await user.click(submitButton);

    expect(screen.queryByText('Invalid email')).toBeNull();
    expect(screen.queryByText('Invalid password')).toBeNull();
    expect(mockLogin).toHaveBeenCalledWith(userData.email);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('do not call login and redirect if form is empty', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValueOnce({ push: mockPush });

    const mockLogin = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValueOnce({
      login: mockLogin,
    });

    const { user } = setupEvents(<LoginForm />);
    const loginButton = screen.getByText('Login');

    await user.click(loginButton);

    expect(mockLogin).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
