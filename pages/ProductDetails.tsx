
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface ProductDetailsProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products, onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedImage(found.image);
    }
  }, [id, products]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <nav className="flex mb-8 text-sm text-gray-500 space-x-2">
        <Link to="/" className="hover:text-emerald-600">Home</Link>
        <span>/</span>
        <span className="text-gray-900">{product.category}</span>
        <span>/</span>
        <span className="text-gray-400 truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <button 
                key={i} 
                onClick={() => setSelectedImage(`https://picsum.photos/seed/${product.id + i}/600/600`)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage.includes(product.id + i) ? 'border-emerald-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={`https://picsum.photos/seed/${product.id + i}/200/200`} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">{product.category}</span>
            <h1 className="text-4xl font-bold text-gray-900 mt-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center text-yellow-400">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} className={`w-5 h-5 ${i > Math.floor(product.rating) ? 'text-gray-200' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                ))}
              </div>
              <span className="text-gray-400 text-sm font-medium">{product.reviewsCount} verified reviews</span>
            </div>
          </div>

          <div className="text-3xl font-black text-emerald-600 mb-8">
            ${product.price.toLocaleString()}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description} This premium choice offers unmatched quality and modern design, perfect for professional or personal use. Experience the best in class performance and style.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>In Stock ({product.stock} units available)</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Fast shipping - arrives within 2-3 business days</span>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => onAddToCart(product)}
              className="bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-emerald-900/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              <span>Add to Cart</span>
            </button>
            <button className="bg-white border-2 border-emerald-600 text-emerald-600 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Section (Visual Only) */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
          {products.slice(0, 4).map(p => (
            <div key={p.id} className="bg-white p-4 rounded-2xl border border-gray-100">
              <div className="aspect-square rounded-lg bg-gray-50 mb-4 overflow-hidden">
                <img src={p.image} className="w-full h-full object-cover" />
              </div>
              <p className="text-sm font-bold text-gray-900 line-clamp-1">{p.name}</p>
              <p className="text-emerald-600 font-bold">${p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
