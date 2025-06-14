import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { store } from './store/store';
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';

// Pages to be implemented
const OrderHistoryPage = () => <div>Order History Page (to be implemented)</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        
        {/* Protected routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={
            <AuthRoutes>
              <HomePage />
            </AuthRoutes>
          } />
          <Route path="products" element={
            <AuthRoutes>
              <ProductsPage />
            </AuthRoutes>
          } />
          <Route path="products/:id" element={
            <AuthRoutes>
              <ProductDetailPage />
            </AuthRoutes>
          } />
          <Route path="cart" element={
            <AuthRoutes>
              <CartPage />
            </AuthRoutes>
          } />
          <Route path="checkout" element={
            <AuthRoutes>
              <CheckoutPage />
            </AuthRoutes>
          } />
          <Route path="profile" element={
            <AuthRoutes>
              <UserProfile />
            </AuthRoutes>
          } />
          <Route path="orders" element={
            <AuthRoutes>
              <OrderHistoryPage />
            </AuthRoutes>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;