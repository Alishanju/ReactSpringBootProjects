import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './NavBar';
import { AuthProvider } from '../auth/AuthContext';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderNavbar = () => {
  return render(
    <AuthProvider>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test('renders app title and logo', () => {
    renderNavbar();
    expect(screen.getByText('MyApp')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  test('shows login and register links when not logged in', () => {
    renderNavbar();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.queryByText('Products')).not.toBeInTheDocument();
    expect(screen.queryByText('Add Product')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  test('shows products and logout when logged in as user', () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('role', 'ROLE_USER');
    renderNavbar();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Add Product')).not.toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  test('shows admin link when logged in as admin', () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('role', 'ROLE_ADMIN');
    renderNavbar();
    expect(screen.getByText('Add Product')).toBeInTheDocument();
  });

  test('logout button calls logout and navigates to login', () => {
    localStorage.setItem('token', 'fake-token');
    renderNavbar();
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    // Check if localStorage is cleared (assuming logout is called)
    expect(localStorage.getItem('token')).toBeNull();
  });
});