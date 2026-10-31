'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PRODUCTS, REVIEWS } from '@/lib/mockData';
import { useCart } from '@/lib/store/cartStore';
import { StarIcon, HeartIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useParams } from 'next/navigation';

export default function ProductDetails() {
  const params = useParams();
  const productId = params.id as string;
  const product = PRODUCTS.find((p) => p.id === productId);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Product not found</p>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      image: product.image,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const productReviews = REVIEWS.filter((r) => r.productId === productId);
  const avgRating = product.rating;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-600">
            <span>Home</span> / <span>Shop</span> / <span>{product.category}</span> / <span>{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="bg-white rounded-lg overflow-hidden mb-4">
                <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <div key={idx} className="bg-white rounded-lg overflow-hidden cursor-pointer hover:border-2 hover:border-secondary">
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-20 object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-lg p-8">
              <div className="mb-4">
                <span className="text-secondary font-semibold text-sm">{product.brand}</span>
              </div>

              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(avgRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{avgRating} ({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl line-through text-gray-500">${product.originalPrice.toFixed(2)}</span>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {product.discount || Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6 pb-6 border-b">
                <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ Out of stock'}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Size</label>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 border-2 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-secondary bg-secondary text-white'
                          : 'border-gray-300 bg-white text-gray-800 hover:border-secondary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Color</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 rounded-lg font-semibold transition-all ${
                        selectedColor === color
                          ? 'border-secondary text-secondary'
                          : 'border-gray-300 text-gray-800 hover:border-secondary'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 btn-primary flex items-center justify-center gap-2 ${
                    addedToCart ? 'bg-green-600' : ''
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <CheckIcon className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </button>

                <button className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                  <HeartIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Specs */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold mb-4">Specifications</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
            {productReviews.length > 0 ? (
              <div className="space-y-6">
                {productReviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.userName}</p>
                        {review.verified && <span className="text-xs text-green-600 font-semibold">✓ Verified Purchase</span>}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>

                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>

                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4">{review.text}</p>

                    <p className="text-xs text-gray-600">👍 {review.helpful} found this helpful</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
