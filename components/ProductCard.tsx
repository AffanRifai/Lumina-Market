
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`} className="relative block h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-emerald-700 backdrop-blur-sm">
          {product.category}
        </div>
      </Link>
      
      <div className="p-4 flex-grow">
        <div className="flex items-center space-x-1 mb-1">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-gray-600 text-xs font-medium">{product.rating}</span>
          <span className="text-gray-300 text-xs">|</span>
          <span className="text-gray-400 text-xs">{product.reviewsCount} reviews</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block font-semibold text-gray-800 hover:text-emerald-600 line-clamp-1 mb-1 transition-colors">
          {product.name}
        </Link>
        
        <div className="text-xl font-bold text-gray-900 mb-4">
          ${product.price.toLocaleString()}
        </div>
        
        <button 
          onClick={(e) => { e.preventDefault(); onAddToCart(product); }}
          className="w-full bg-gray-50 text-gray-700 py-2.5 rounded-xl text-sm font-semibold group-hover:bg-emerald-600 group-hover:text-white transition-all flex items-center justify-center space-x-2 border border-gray-100 group-hover:border-emerald-600"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
