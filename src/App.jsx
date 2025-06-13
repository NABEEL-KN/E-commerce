import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Store
import { store } from './store/store';

// Layout
import Layout from './components/layout/Layout';

// Pages
import ProductListing from './features/product-listing/ProductListing';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import ProfilePage from './features/user/ProfilePage';

// Theme
import { theme } from './theme';

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