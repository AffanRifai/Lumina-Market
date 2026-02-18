
import React, { useState } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-900 flex items-center">
        <img 
          src="https://picsum.photos/seed/market/1600/800" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 px-12 max-w-2xl">
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            Discover the Best <span className="text-emerald-400">Deals</span> of the Season
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Shop the latest trends in electronics, fashion, and more with secured payments and lightning-fast delivery.
          </p>
          <div className="flex space-x-4">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-900/40">
              Shop Now
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Explore Categories</h2>
          <button className="text-emerald-600 font-semibold text-sm hover:underline">View All Categories &rarr;</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 scroll-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all border ${
                activeCategory === cat 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 border-gray-100 hover:border-emerald-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button className="p-2 bg-white rounded shadow-sm text-gray-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <button className="p-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
               <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">No products found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-1">We couldn't find any products in this category at the moment.</p>
          </div>
        )}
      </section>

      {/* Promotional Banner */}
      <section className="bg-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500 rounded-full -ml-24 -mb-24 opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-4">JOIN OUR LOYALTY PROGRAM</h2>
          <p className="text-indigo-100 mb-8 max-w-lg mx-auto">Get exclusive early access to sales, higher discounts, and free shipping on all orders.</p>
          <button className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl">
            Register for Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
