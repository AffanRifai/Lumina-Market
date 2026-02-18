
import React from 'react';
import { Link } from 'react-router-dom';
import { Order, OrderStatus } from '../types';

interface OrdersProps {
  orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'bg-emerald-100 text-emerald-700';
      case OrderStatus.SHIPPED: return 'bg-blue-100 text-blue-700';
      case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-700';
      case OrderStatus.CANCELLED: return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        <Link to="/" className="text-emerald-600 font-semibold hover:underline">Continue Shopping</Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-8">Once you place an order, it will appear here.</p>
          <Link to="/" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold">Discover Products</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:border-emerald-200 transition-colors">
              <div className="bg-gray-50 p-6 flex flex-wrap justify-between items-center border-b border-gray-100 gap-4">
                <div className="flex space-x-8">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Order ID</p>
                    <p className="font-bold text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Date</p>
                    <p className="font-bold text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Total</p>
                    <p className="font-bold text-emerald-600">${order.total.toLocaleString()}</p>
                  </div>
                </div>
                <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity} • ${item.price.toLocaleString()}</p>
                      </div>
                      <Link 
                        to={`/product/${item.id}`}
                        className="text-emerald-600 text-sm font-semibold hover:underline"
                      >
                        Buy Again
                      </Link>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-gray-400 font-medium">Shipping to: </span>
                    <span className="text-gray-700 italic font-medium">{order.address}</span>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">Invoice</button>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors">Track Order</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
