import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/layout/Layout';
import { AuthProvider } from './features/auth/AuthContext';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import AuthRoutes from './features/auth/AuthRoutes';
import Dashboard from './pages/Dashboard';

// Protected route component
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Placeholder pages - to be implemented by trainees
const HomePage = () => <div>Home Page (to be implemented)</div>;
const ProductsPage = () => <div>Products Page (to be implemented)</div>;
const ProductDetailPage = () => <div>Product Detail Page (to be implemented)</div>;
const CartPage = () => <div>Cart Page (to be implemented)</div>;
const CheckoutPage = () => <div>Checkout Page (to be implemented)</div>;
const ProfilePage = () => <div>Profile Page (to be implemented)</div>;
const OrderHistoryPage = () => <div>Order History Page (to be implemented)</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="orders" element={<OrderHistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route element={
          <AuthRoutes>
            <ProtectedRoute />
          </AuthRoutes>
        }>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="/dashboard/home" replace />} />
          </Route>
        </Route>
        
        {/* Catch all other routes */}
        <Route path="*" element={
          <Layout>
            <NotFoundPage />
          </Layout>
        } />
      </Routes>
    </AuthProvider>
    );
}

export default App;