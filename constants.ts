
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Quantum X Pro Laptop',
    price: 1299.99,
    description: 'High-performance laptop with M3 chip, 16GB RAM, and 512GB SSD.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/laptop/400/300',
    rating: 4.8,
    reviewsCount: 120,
    stock: 15
  },
  {
    id: '2',
    name: 'ErgoComfort Office Chair',
    price: 249.50,
    description: 'Ergonomic office chair with lumbar support and breathable mesh.',
    category: 'Furniture',
    image: 'https://picsum.photos/seed/chair/400/300',
    rating: 4.5,
    reviewsCount: 85,
    stock: 30
  },
  {
    id: '3',
    name: 'AeroBuds Wireless',
    price: 159.00,
    description: 'Noise-cancelling wireless earbuds with 30-hour battery life.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/earbuds/400/300',
    rating: 4.7,
    reviewsCount: 210,
    stock: 50
  },
  {
    id: '4',
    name: 'Nova Smartwatch Gen 5',
    price: 199.99,
    description: 'Track your health and stay connected with the Nova Smartwatch.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/watch/400/300',
    rating: 4.4,
    reviewsCount: 95,
    stock: 25
  },
  {
    id: '5',
    name: 'Artisan Coffee Maker',
    price: 89.00,
    description: 'Brew barista-quality coffee at home with this sleek machine.',
    category: 'Home & Kitchen',
    image: 'https://picsum.photos/seed/coffee/400/300',
    rating: 4.9,
    reviewsCount: 45,
    stock: 10
  },
  {
    id: '6',
    name: 'Summit Daypack',
    price: 65.00,
    description: 'Durable, water-resistant backpack for all your adventures.',
    category: 'Fashion',
    image: 'https://picsum.photos/seed/bag/400/300',
    rating: 4.6,
    reviewsCount: 150,
    stock: 40
  },
  {
    id: '7',
    name: 'ZenFlow Yoga Mat',
    price: 45.00,
    description: 'Extra thick, non-slip yoga mat for maximum comfort.',
    category: 'Sports',
    image: 'https://picsum.photos/seed/yoga/400/300',
    rating: 4.8,
    reviewsCount: 60,
    stock: 100
  },
  {
    id: '8',
    name: 'Lumina RGB Keyboard',
    price: 120.00,
    description: 'Mechanical gaming keyboard with customizable RGB backlighting.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/keyboard/400/300',
    rating: 4.5,
    reviewsCount: 75,
    stock: 20
  }
];

export const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Furniture', 'Sports'];
