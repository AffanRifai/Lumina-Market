
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, cart, onClose, onRemove, onUpdateQty }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <span>Your Cart</span>
            <span className="text-gray-400 font-normal">({cart.length})</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 scroll-hide">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              <p>Your cart is empty.</p>
              <button onClick={onClose} className="mt-4 text-emerald-600 font-semibold hover:underline">Start shopping</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex space-x-4">
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                  <p className="text-emerald-600 font-bold mb-2">${item.price.toLocaleString()}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="px-2 py-1 hover:bg-gray-50">-</button>
                      <span className="px-3 py-1 text-sm font-medium border-x border-gray-200">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="px-2 py-1 hover:bg-gray-50">+</button>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">${total.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => { onClose(); navigate('/checkout'); }}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-all active:scale-[0.98]"
            >
              Secure Checkout
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">Free shipping on all orders over $500</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
