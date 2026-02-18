
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, User } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  user: User | null;
  onOrderComplete: (address: string) => string;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, user, onOrderComplete }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total > 500 ? 0 : 15;
  const tax = total * 0.1;
  const grandTotal = total + shipping + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to complete your order.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onOrderComplete(address);
      setLoading(false);
      navigate('/orders');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="text-emerald-600 font-bold">Return to shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-10 text-gray-900">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Shipping Information
            </h2>
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                  <input type="text" required defaultValue={user?.name.split(' ')[0]} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                  <input type="text" required defaultValue={user?.name.split(' ')[1]} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Shipping Address</label>
                <textarea 
                  required 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street name, Building, Floor, etc."
                  rows={3} 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-none" 
                />
              </div>
            </form>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['credit_card', 'paypal', 'bank_transfer'].map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${paymentMethod === method ? 'border-emerald-600 bg-emerald-50' : 'border-gray-100 hover:border-emerald-200'}`}
                >
                  <div className={`font-bold capitalize ${paymentMethod === method ? 'text-emerald-700' : 'text-gray-700'}`}>
                    {method.replace('_', ' ')}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Safe and secure</div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-500 truncate mr-4">{item.quantity}x {item.name}</span>
                  <span className="font-semibold text-gray-900 whitespace-nowrap">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className={`font-semibold ${shipping === 0 ? 'text-emerald-600' : ''}`}>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">VAT (10%)</span>
                <span className="font-semibold">${tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg pt-4 border-t border-gray-100">
                <span className="font-bold">Total</span>
                <span className="font-black text-emerald-600">${grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-700 transition-all mt-8 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Processing Transaction...' : 'Pay & Complete Order'}
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest font-bold">Encrypted & Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
