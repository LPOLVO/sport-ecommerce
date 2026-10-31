# SportHub Deployment Guide

## Quick Start

### Local Development
```bash
npm install
npm run dev
```
Visit http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

---

## Deployment Options

### 1. Vercel (Recommended - Easiest)

**Why Vercel?**
- Built by the Next.js team
- Zero-config deployment
- Automatic CI/CD
- Free tier included

**Steps:**

1. **Sign up on Vercel**
   - Go to https://vercel.com/signup
   - Sign in with GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment** (if needed)
   - Set environment variables
   - Configure domains

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in ~1 minute

**Command Line Deployment:**
```bash
npm install -g vercel
vercel
```

---

### 2. GitHub Pages

**Note:** Static export required. For this dynamic app, use Vercel instead.

---

### 3. Railway.app

**Steps:**

1. Sign up at https://railway.app
2. Connect your GitHub repository
3. Select Next.js as the service
4. Click "Deploy"

---

### 4. Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

heroku login
heroku create your-app-name
git push heroku main
```

---

### 5. Self-Hosted (VPS/Dedicated Server)

**Requirements:**
- Node.js 18+ installed
- PM2 for process management
- Nginx/Apache for reverse proxy

**Setup:**

```bash
# Clone repository
git clone <your-repo-url>
cd sports-ecommerce

# Install dependencies
npm install

# Build application
npm run build

# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start "npm start" --name sports-ecommerce

# Setup auto-restart
pm2 startup
pm2 save
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Environment Variables

Create `.env.local`:

```env
# API Configuration (for future backend)
NEXT_PUBLIC_API_URL=https://api.example.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Feature Flags
NEXT_PUBLIC_ENABLE_PAYMENTS=false
```

---

## Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Run `npm run lint` with no errors
- [ ] Test on production build: `npm start`
- [ ] Test on mobile devices
- [ ] Check Lighthouse score (Target: 90+)
- [ ] Verify all links work
- [ ] Test cart and checkout flow
- [ ] Test authentication
- [ ] Review environment variables
- [ ] Update CLAUDE.md with deployment notes

---

## Performance Optimization

### Already Implemented
✅ Next.js 14 App Router (faster routing)
✅ Image optimization
✅ Code splitting
✅ CSS-in-JS with Tailwind (tree-shaking)
✅ Zustand (lightweight state)

### Additional Optimizations (Optional)

**1. Enable Compression**
```javascript
// next.config.js
const nextConfig = {
  compress: true,
};
```

**2. Add Headers**
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

**3. Enable SWR Caching**
```typescript
// Implement in future with React Query or SWR
```

---

## Monitoring & Analytics

### Vercel Analytics
- Automatically included with Vercel
- Real User Monitoring (RUM)
- Performance metrics

### Google Analytics (Optional)
```typescript
// pages/_app.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag?.pageview({
        page_path: url,
        page_title: document.title,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return <Component {...pageProps} />;
}
```

---

## Troubleshooting

### Build Fails with "Module not found"
```bash
npm install
npm run build
```

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### CORS Issues (Future API)
Add to next.config.js:
```javascript
async rewrites() {
  return {
    beforeFiles: [
      {
        source: '/api/:path*',
        destination: 'https://your-api.com/:path*',
      },
    ],
  };
}
```

---

## Continuous Deployment

### GitHub Actions Workflow
Already configured in `.github/workflows/ci-cd.yml`

- Runs on every push to main/develop
- Builds and tests automatically
- Deploys to Vercel on main branch

---

## Database Integration (Future)

When adding backend:

1. **Setup Database**
   - PostgreSQL, MongoDB, or Firebase

2. **Create API Routes**
   ```typescript
   // app/api/products/route.ts
   export async function GET() {
     // Fetch from database
   }
   ```

3. **Connect State Management**
   ```typescript
   // Update Zustand stores to call API
   const fetchProducts = async () => {
     const res = await fetch('/api/products');
     setProducts(await res.json());
   };
   ```

---

## SSL/TLS Certificates

### Vercel
- Automatic HTTPS
- Free SSL certificate

### Self-Hosted
- Use Let's Encrypt (free)
- Certbot installation:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Backup & Recovery

1. **GitHub as Backup**
   - All code version controlled
   - Easy rollback with git

2. **Database Backups** (Future)
   - Implement automated backups
   - Store in S3 or equivalent

3. **Recovery Steps**
   ```bash
   git revert <commit-hash>
   npm run build
   npm start
   ```

---

## Support & Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Railway Deployment](https://docs.railway.app)
- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/nodejs-support)

---

**Questions?** Check CLAUDE.md or open an issue on GitHub.
