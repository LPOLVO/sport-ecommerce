# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SportHub is a full-stack e-commerce application for sports equipment and apparel. It features a modern Next.js/React frontend with Tailwind CSS styling, client-side state management with Zustand, and a comprehensive product catalog with advanced filtering, cart management, checkout flow, user authentication, order history, and a gamified "Spin the Wheel" daily rewards system.

## Architecture & Tech Stack

**Frontend:** Next.js 14 (App Router) with React 18, TypeScript
**Styling:** Tailwind CSS 3 with custom component utilities
**State Management:** Zustand (lightweight, no boilerplate)
**HTTP Client:** Axios (for future API integration)
**UI Components:** Heroicons 2 for icons, custom components using Tailwind
**Testing:** Jest + React Testing Library (configured, no tests yet)
**Notifications:** react-hot-toast (installed but not yet integrated)

**Key Decision:** Zustand was chosen over Redux/Context API for its minimal boilerplate and excellent TypeScript support. Stores live in `lib/store/` and are client-only (`'use client'` directive).

## Directory Structure

```
app/                              # Next.js App Router pages
├── page.tsx                       # Homepage with hero, categories, featured products
├── layout.tsx                     # Root layout, metadata
├── globals.css                    # Global Tailwind imports, custom component utilities
├── shop/
│   └── page.tsx                   # Product catalog with advanced filters, sorting
├── products/
│   └── [id]/
│       └── page.tsx               # Product detail page with specs, reviews, gallery
├── cart/
│   └── page.tsx                   # Shopping cart with coupon application
├── checkout/
│   └── page.tsx                   # Multi-step checkout (shipping, payment, confirmation)
├── login/
│   └── page.tsx                   # Login page with demo account option
├── dashboard/
│   ├── page.tsx                   # User dashboard with stats, recent orders, loyalty info
│   ├── orders/
│   │   └── page.tsx               # Order history table
│   └── profile/
│       └── page.tsx               # Profile settings (stub)
├── rewards/
│   └── page.tsx                   # Spin the Wheel daily rewards gamification
└── wishlist/
    └── page.tsx                   # User wishlist

components/                       # Reusable React components
├── Header.tsx                     # Navigation header with cart icon, search, auth links
├── Footer.tsx                     # Footer with links, legal pages
└── ProductCard.tsx                # Reusable product card component with badges, quick-add

lib/                              # Shared utilities and types
├── types.ts                       # TypeScript interfaces (Product, Order, Coupon, etc.)
├── mockData.ts                    # Mock data for categories, products, reviews, coupons, wheel rewards
└── store/
    ├── cartStore.ts               # Zustand cart store (add, remove, update, total calculations)
    └── userStore.ts               # Zustand user store (auth state, profile, rewards points)

public/                           # Static assets (to be populated with images)

Configuration Files:
- tsconfig.json                    # TypeScript strict mode, path alias @/* for imports
- tailwind.config.ts               # Custom colors (primary, secondary, accent)
- postcss.config.js                # PostCSS with Tailwind and autoprefixer
- next.config.js                   # Next.js configuration
- package.json                     # Dependencies and build scripts
```

## Key Design Patterns

### State Management (Zustand)
All persistent client state is managed via two Zustand stores:
- **cartStore:** Items, quantities, totals. Persists across page navigation.
- **userStore:** Auth state, user profile, reward points. Mock authentication.

Stores are directly imported into components with `'use client'` directive. No Context API wrapper needed.

### Mock Data Pattern
`lib/mockData.ts` contains:
- `PRODUCTS` array (8 products with full details, images, specs, stock)
- `CATEGORIES` array (6 categories with images and icons)
- `REVIEWS` array (2 sample reviews per product structure)
- `COUPONS` array (3 sample coupon codes with percentage/fixed discount types)
- `WHEEL_REWARDS` array (6 reward types for the spin wheel: coupons, points, free shipping)

When implementing backend integration, replace these imports with API calls.

### Page Organization
- **Public Pages:** Homepage, shop, product details (no auth required)
- **Cart/Checkout:** Publicly accessible but integrate with user store for logged-in users
- **Protected Pages:** Dashboard, wishlist, order history (redirect to login if not authenticated)
- **Auth Pages:** Login page has "Demo Login" button for quick testing

### Component Composition
- **Header/Footer:** Global layout components
- **ProductCard:** Reusable card with image, price, rating, quick-add, wishlist button
- **Page Components:** Each page handles its own filters, sorting, form validation

## Running the Application

### Development Server
```bash
npm install
npm run dev
```
Navigate to `http://localhost:3000`. Hot reload enabled.

### Build & Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

### Testing (when implemented)
```bash
npm test
npm run test:watch
npm run test:coverage
```

## Interactive Testing Guide

### 1. Homepage
- Navigate to `/`
- Verify hero banner, category grid (6 categories clickable)
- Scroll through featured, new arrivals, top-rated product sections
- Each product card shows image, brand, name, rating, price, discount badge
- Click "Shop Now" or any category card to navigate to product catalog

### 2. Product Catalog & Filtering
- Go to `/shop`
- **Filters:** Category (radio), Price Range (sliders), Brand (checkboxes)
- **Sorting:** Featured (default), Price ASC/DESC, Highest Rated, Newest
- **Search:** Real-time search by product name/description
- Click any product card to view details or "Add to Cart" button for quick-add

### 3. Product Details
- Navigate to `/products/1` (or any product ID)
- View image gallery, specs table, customer reviews
- Select size and color, adjust quantity, add to cart
- Wishlist button (💜 icon)
- Stock availability indicator

### 4. Shopping Cart
- Add items from product pages
- View cart icon in header (shows item count badge)
- Navigate to `/cart`
- Adjust quantities with +/- buttons
- Remove items with trash icon
- Apply coupon code (try: `WELCOME10`, `SAVE20`, `FREESHIP`)
- See price breakdown: subtotal, discount, tax (8%), shipping
- Proceed to checkout

### 5. Checkout Flow
- Multi-step: Shipping → Payment → Confirmation
- **Shipping:** Fill form (first/last name, email, phone, address, city, state, ZIP, country)
- **Payment:** Demo mode displays payment message (no actual processing)
- Card number field shows hint: `4242 4242 4242 4242` (placeholder)
- Click "Place Order" → confirmation page with order success message
- Cart clears after order

### 6. Authentication & Dashboard
- Go to `/login`
- Try demo login or enter any email/password
- Redirects to `/dashboard`
- Displays user profile, reward points tier, recent orders, loyalty info
- View order history at `/dashboard/orders`
- Logout button

### 7. Spin the Wheel (Gamified Rewards)
- Requires authentication (redirects to login if not signed in)
- Navigate to `/rewards`
- Shows wheel with 6 reward segments (colors vary)
- Daily spin limit (1 per day in mock)
- Click "SPIN THE WHEEL" button
- Wheel rotates 3 seconds, lands on random reward
- Reward type displayed: coupon code, reward points, or free shipping badge
- Spin count decrements

### 8. Wishlist & Profile
- Go to `/wishlist` (requires login)
- Currently has 1 sample item (expandable)
- Add to cart or remove from wishlist
- Profile settings at `/dashboard/profile` (stub page, ready for implementation)

## Common Development Tasks

### Adding a New Product
1. Edit `lib/mockData.ts`
2. Add object to `PRODUCTS` array with all required fields (id, name, price, category, images, specs, etc.)
3. Product auto-appears on homepage and shop pages
4. Ensure category field matches existing `CATEGORIES` entries

### Adding a New Category
1. Edit `lib/mockData.ts` → add to `CATEGORIES` array
2. Update shop page filter if needed
3. Re-export from mockData.ts

### Implementing Backend API
1. Create API routes in `app/api/` directory
2. Replace `PRODUCTS`, `CATEGORIES` imports with API calls using Axios
3. Keep mock data as fallback or seed database
4. Update cart/user stores to sync with backend session if needed

### Adding New Pages
1. Create directory in `app/` with `page.tsx`
2. Import `Header` and `Footer` components
3. Wrap main content in `container-custom` for consistent spacing
4. Use Tailwind classes and custom component utilities from `globals.css`

### Styling Guidelines
- Use Tailwind classes for layout, spacing, colors
- Custom component utilities defined in `app/globals.css` (e.g., `.btn-primary`, `.card`, `.badge`)
- Custom colors: `primary` (#1f2937), `secondary` (#f97316), `accent` (#0ea5e9)
- Prefer responsive prefixes (`md:`, `lg:`) over media queries
- Use `container-custom` class for consistent max-width and padding

### Cart & Checkout Logic
- `useCart()` hook manages items, quantities, totals
- Coupon logic is in the cart page (`/cart`); apply function checks code against `COUPONS` array
- Checkout flow is linear (shipping → payment → confirmation)
- Demo mode skips actual payment processing
- Order confirmation clears cart automatically

### Authentication Flow
- `useUser()` hook returns `{ user, isAuthenticated, login, logout, updateProfile, addRewardPoints }`
- Login page (`/login`) has demo login option that pre-fills with sample user data
- Protected pages use `useRouter().push('/login')` if not authenticated
- No persistent storage (mock only; production would use cookies/tokens)

## Future Enhancements

1. **Backend Integration:** Replace mock data with API endpoints; implement real authentication
2. **Payment Processing:** Integrate Stripe or PayPal in checkout page
3. **User Profiles:** Implement profile edit page (stub at `/dashboard/profile`)
4. **Email Notifications:** Send order confirmations, shipping updates
5. **Admin Panel:** Product management, order management, analytics
6. **Advanced Search:** Full-text search with Elasticsearch
7. **Reviews & Ratings:** User-submitted reviews with verification
8. **Inventory Sync:** Real-time stock updates
9. **Analytics:** Track user behavior, conversion rates
10. **Mobile App:** React Native version

## Notes for Contributors

- Keep components under 300 lines; extract sub-components if larger
- All client-side store mutations use `'use client'` directive
- Mock data is intentionally simple; add complexity when integrating backend
- Tailwind purge is configured for `app/` and `components/` directories
- Path alias `@/` resolves to project root for clean imports
- Test coverage started but not implemented; Jest configured and ready
- All forms use controlled inputs with React state
- No external image hosting; Unsplash URLs used for demo (replace with CDN in production)
