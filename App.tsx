
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Product, CartItem, Order, User, AuthMode, OrderStatus } from './types';
import { MOCK_PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import AIShopper from './components/AIShopper';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persistence (Simulating Laravel-like backend behavior with LocalStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('lumina_user');
    const savedCart = localStorage.getItem('lumina_cart');
    const savedOrders = localStorage.getItem('lumina_orders');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumina_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleLogin = (email: string, name: string) => {
    const newUser = { id: Math.random().toString(36).substr(2, 9), email, name };
    setUser(newUser);
    localStorage.setItem('lumina_user', JSON.stringify(newUser));
    setAuthMode(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lumina_user');
  };

  const createOrder = (address: string) => {
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).toUpperCase().substr(2, 6)}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: OrderStatus.PENDING,
      address
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    return newOrder.id;
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          user={user} 
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
          onOpenAuth={() => setAuthMode('login')}
          onOpenCart={() => setIsCartOpen(true)}
          onLogout={handleLogout}
        />

        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home products={MOCK_PRODUCTS} onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails products={MOCK_PRODUCTS} onAddToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} user={user} onOrderComplete={createOrder} />} />
            <Route path="/orders" element={<Orders orders={orders} />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </main>

        <footer className="bg-gray-900 text-white py-12 mt-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-emerald-400">LuminaMarket</h3>
              <p className="text-gray-400 text-sm">Your premium destination for quality electronics and lifestyle products.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link to="/">Shop All</Link></li>
                <li><Link to="/orders">My Orders</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Care</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Shipping Policy</li>
                <li>Return Center</li>
                <li>Contact Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <div className="flex">
                <input type="email" placeholder="Email" className="bg-gray-800 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                <button className="bg-emerald-600 px-4 py-2 rounded-r hover:bg-emerald-700">Join</button>
              </div>
            </div>
          </div>
          <div className="text-center mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            &copy; 2024 LuminaMarket. Inspired by Tokopedia & Shopee.
          </div>
        </footer>

        <AuthModal 
          isOpen={!!authMode} 
          mode={authMode} 
          onClose={() => setAuthMode(null)} 
          onSwitch={(m) => setAuthMode(m)}
          onSuccess={handleLogin}
        />

        <CartDrawer 
          isOpen={isCartOpen} 
          cart={cart} 
          onClose={() => setIsCartOpen(false)} 
          onRemove={removeFromCart}
          onUpdateQty={updateQuantity}
        />

        <AIShopper products={MOCK_PRODUCTS} />
      </div>
    </HashRouter>
  );
};

export default App;
