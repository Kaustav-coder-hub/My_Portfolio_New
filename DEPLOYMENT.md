# Deployment Guide

## Quick Start: Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/your-portfolio.git

# Push to GitHub
git push -u origin master
```

## Deploy to Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your portfolio repository
4. Configure:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add environment variable (if using AI features):
   - Name: `VITE_OPENAI_API_KEY`
   - Value: Your OpenAI API key
6. Click "Deploy"

**Done!** Your portfolio will be live at `https://your-portfolio.vercel.app`

## Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click "Add new site" → "Import an existing project"
3. Choose your repository
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variable (Site settings → Environment variables):
   - Key: `VITE_OPENAI_API_KEY`
   - Value: Your OpenAI API key
6. Click "Deploy site"

## Deploy to GitHub Pages

1. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/your-portfolio"
}
```

3. Update `vite.config.js`:

```js
export default defineConfig({
  base: "/your-portfolio/", // Replace with your repo name
  plugins: [react()],
});
```

4. Deploy:

```bash
npm run deploy
```

## Environment Variables

For production deployment with AI features:

### Option 1: Use Vercel/Netlify Dashboard

Add environment variable through their web interface:

- Variable: `VITE_OPENAI_API_KEY`
- Value: `sk-proj-xxxxxxxxxxxxx`

### Option 2: Local .env.local

For local testing only (not committed to git):

```env
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

## Post-Deployment Checklist

- [ ] Portfolio loads correctly
- [ ] All images display properly
- [ ] 3D animations work smoothly
- [ ] AI Lab responds (with or without API key)
- [ ] Responsive design works on mobile
- [ ] Social links point to correct profiles
- [ ] Contact form functions (if implemented)
- [ ] No console errors

## Troubleshooting

### Issue: Images not loading

- Check image paths in `src/App.jsx`
- Ensure images are in `src/assets/images/`
- Verify `import.meta.env.BASE_URL` usage for public assets

### Issue: 3D sphere not rendering

- Check browser console for WebGL errors
- Ensure Three.js dependencies are installed
- Test on different browsers

### Issue: AI Lab not responding

- Check if `VITE_OPENAI_API_KEY` is set (optional)
- Should work with local fallback responses
- Verify no console errors blocking execution

### Issue: Build fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## Custom Domain (Vercel)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. Wait for SSL certificate (automatic)

## Custom Domain (Netlify)

1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS records
4. Enable HTTPS (automatic)

## Performance Optimization

Already implemented:

- ✅ Vite for fast builds
- ✅ Code splitting
- ✅ Lazy loading for 3D components
- ✅ Optimized images
- ✅ Minified production builds

## Monitoring

- **Vercel**: Built-in analytics available
- **Netlify**: Analytics in Pro plan
- **Google Analytics**: Add tracking code if needed

---

Need help? Check the [main README](README.md) or open an issue on GitHub.
