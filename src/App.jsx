import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/layout/Layout';
import UserProfile from './components/user/UserProfile';
import { AuthProvider } from './features/auth/AuthContext';
import LoginForm from './components/user/LoginForm';
import RegisterForm from './components/user/RegisterForm';
import AuthRoutes from './features/auth/AuthRoutes';
import Dashboard from './pages/Dashboard';
import ProductListing from './features/product-listing/ProductListing';

// Pages
const HomePage = () => <div>Home Page (to be implemented)</div>;
const ProductsPage = () => <ProductListing />;
const ProductDetailPage = () => <div>Product Detail Page (to be implemented)</div>;
const CartPage = () => <div>Cart Page (to be implemented)</div>;
const CheckoutPage = () => <div>Checkout Page (to be implemented)</div>;
const OrderHistoryPage = () => <div>Order History Page (to be implemented)</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

// Wrapper component for protected routes
const ProtectedLayout = () => (
  <AuthRoutes>
    <Layout>
      <Outlet />
    </Layout>
  </AuthRoutes>
);

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
        </Route>
        
        {/* 404 - Must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;