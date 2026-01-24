import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// Test component that uses the context
function TestComponent() {
  const { isLoggedIn, isAdmin, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="isLoggedIn">{isLoggedIn ? 'true' : 'false'}</div>
      <div data-testid="isAdmin">{isAdmin ? 'true' : 'false'}</div>
      <button onClick={() => login('token123', 'ROLE_USER')}>Login as User</button>
      <button onClick={() => login('token123', 'ROLE_ADMIN')}>Login as Admin</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

const renderWithAuth = () => {
  return render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('initial state when no token in localStorage', () => {
    renderWithAuth();
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('false');
  });

  test('initial state when token exists in localStorage', () => {
    localStorage.setItem('token', 'existing-token');
    localStorage.setItem('role', 'ROLE_ADMIN');
    renderWithAuth();
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('true');
  });

  test('login as user updates state', () => {
    renderWithAuth();
    const loginButton = screen.getByText('Login as User');
    fireEvent.click(loginButton);
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('false');
    expect(localStorage.getItem('token')).toBe('token123');
    expect(localStorage.getItem('role')).toBe('ROLE_USER');
  });

  test('login as admin updates state', () => {
    renderWithAuth();
    const loginButton = screen.getByText('Login as Admin');
    fireEvent.click(loginButton);
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('true');
    expect(localStorage.getItem('token')).toBe('token123');
    expect(localStorage.getItem('role')).toBe('ROLE_ADMIN');
  });

  test('logout clears state and localStorage', () => {
    localStorage.setItem('token', 'token123');
    localStorage.setItem('role', 'ROLE_ADMIN');
    renderWithAuth();
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
    expect(screen.getByTestId('isAdmin')).toHaveTextContent('false');
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
  });
});