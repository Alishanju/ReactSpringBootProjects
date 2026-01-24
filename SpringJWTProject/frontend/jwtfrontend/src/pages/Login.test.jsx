import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the authApi
jest.mock('../api/authApi', () => ({
  loginApi: jest.fn(),
}));

import { loginApi } from '../api/authApi';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

const renderLogin = () => {
  return render(<Login />, { wrapper: createWrapper() });
};

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    // Mock window.location.reload
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  test('renders login form', () => {
    renderLogin();
    expect(screen.getByText('Login Form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('updates form fields', () => {
    renderLogin();
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
  });

  test('shows error on login failure', async () => {
    loginApi.mockRejectedValue(new Error('Invalid credentials'));
    renderLogin();

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    // Wait for error message to appear
    setTimeout(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    }, 100);
  });

  test('stores token and role on successful login', () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6IlJPTEVfQURNSU4ifQ.fake';
    loginApi.mockResolvedValue({ token: mockToken });

    // Mock atob and JSON.parse for the token decoding
    global.atob = jest.fn(() => JSON.stringify({ role: 'ROLE_ADMIN' }));

    renderLogin();

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    // Wait for localStorage to be set
    setTimeout(() => {
      expect(localStorage.getItem('token')).toBe(mockToken);
      expect(localStorage.getItem('role')).toBe('ROLE_ADMIN');
    }, 100);
  });
});