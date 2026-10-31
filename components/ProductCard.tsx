'use client';

import { Product } from '@/lib/types';
import { useCart } from '@/lib/store/cartStore';
import Link from 'next/link';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const handleQuickAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: product.sizes[0],
      image: product.image,
    });
  };

  const discountPercent = product.discount || (product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0);

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isNew && (
              <span className="badge bg-green-500">New</span>
            )}
            {discountPercent > 0 && (
              <span className="badge bg-red-500">-{discountPercent}%</span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
            aria-label="Add to wishlist"
          >
            <HeartIcon className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
          </button>

          {/* Quick Add Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleQuickAdd();
            }}
            className="absolute bottom-0 left-0 right-0 bg-secondary text-white py-2 font-semibold transform translate-y-full group-hover:translate-y-0 transition-transform"
          >
            Add to Cart
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-secondary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviewCount})</span>
          </div>

          {/* Stock Status */}
          <p className={`text-xs font-medium mb-3 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
