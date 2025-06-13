import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Pages
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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    </Provider>
  );
}

export default App;