import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthProvider } from './features/auth/AuthContext';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import AuthRoutes from './features/auth/AuthRoutes';

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="profile" element={
            <AuthRoutes>
              <ProfilePage />
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