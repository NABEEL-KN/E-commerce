import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

// Pages
import ProductListing from './features/product-listing/ProductListing';
const HomePage = () => <div>Home Page (to be implemented)</div>;
const ProductsPage = () => <ProductListing />;
const ProductDetailPage = () => <div>Product Detail Page (to be implemented)</div>;
const CartPage = () => <div>Cart Page (to be implemented)</div>;
const CheckoutPage = () => <div>Checkout Page (to be implemented)</div>;
const ProfilePage = () => <div>Profile Page (to be implemented)</div>;
const OrderHistoryPage = () => <div>Order History Page (to be implemented)</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="orders" element={<OrderHistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;