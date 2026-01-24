import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './auth/AuthContext';

// Mock the child components to avoid complex dependencies
jest.mock('./pages/Register', () => () => <div>Register Page</div>);
jest.mock('./pages/Products', () => () => <div>Products Page</div>);
jest.mock('./pages/AdminProducts', () => () => <div>Admin Products Page</div>);
jest.mock('./pages/Login', () => () => <div>Login Page</div>);
jest.mock('./auth/ProtectedRoute', () => ({ children, adminOnly }) => (
  <div data-testid="protected-route" data-admin-only={adminOnly}>
    {children}
  </div>
));
jest.mock('./components/NavBar', () => () => <div>NavBar</div>);

// Mock BrowserRouter to use MemoryRouter instead
let mockInitialEntries = ['/'];
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }) => (
      <actual.MemoryRouter initialEntries={mockInitialEntries}>
        {children}
      </actual.MemoryRouter>
    ),
    Navigate: ({ to }) => <div data-testid={`navigate-to-${to.replace('/', '')}`}>Navigate to {to}</div>,
  };
});

const renderApp = (initialEntries = ['/']) => {
  mockInitialEntries = initialEntries;
  return render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders NavBar', () => {
    renderApp();
    expect(screen.getByText('NavBar')).toBeInTheDocument();
  });

  test('shows products page when logged in', () => {
    // Mock logged in state
    localStorage.setItem('token', 'fake-token');
    renderApp(['/products']);
    expect(screen.getByText('Products Page')).toBeInTheDocument();
  });

  test('shows admin route only when user is admin', () => {
    // Mock admin user
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('role', 'ROLE_ADMIN');
    renderApp(['/admin']);
    expect(screen.getByText('Admin Products Page')).toBeInTheDocument();
  });

  test('does not show admin route for non-admin users', () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('role', 'ROLE_USER');
    renderApp(['/admin']);
    // Should redirect to default route, which is products
    expect(screen.getByTestId('navigate-to-products')).toBeInTheDocument();
  });

  test('redirects to products when logged in and accessing login', () => {
    localStorage.setItem('token', 'fake-token');
    renderApp(['/login']);
    expect(screen.getByTestId('navigate-to-products')).toBeInTheDocument();
  });
});