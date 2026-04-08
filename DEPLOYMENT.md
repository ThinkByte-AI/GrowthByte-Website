# Deployment Guide


## GitHub Repository
**Repository URL:** https://github.com/ThinkByte-AI/GrowthByte.git

## Initial Setup

### 1. Initialize Git Repository
```bash
git init
git remote add origin https://github.com/ThinkByte-AI/GrowthByte.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Development
```bash
npm run dev
```
Visit http://localhost:3000

### 4. Build for Production
```bash
npm run build
npm start
```

## Deployment Options

### Vercel (Recommended for Next.js)
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Connect to GitHub repository
4. Deploy automatically

### Other Platforms
- **Netlify**: Connect GitHub repo, build command: `npm run build`, publish directory: `.next`
- **AWS Amplify**: Connect GitHub repo, build settings: Next.js
- **DigitalOcean App Platform**: Connect GitHub repo, select Next.js preset
- **Self-hosted**: Requires Node.js 18+ and proper server setup

## Environment Variables
Currently no environment variables required. Add to `.env.local` if needed:
```
# Example (if adding analytics or APIs later)
NEXT_PUBLIC_GA_ID=your-ga-id
```

## Post-Deployment Checklist
- [ ] Verify all pages load correctly
- [ ] Test contact form (if backend connected)
- [ ] Verify SSL certificate (HTTPS)
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Verify sitemap.xml is accessible
- [ ] Verify robots.txt is accessible
- [ ] Test all internal links
- [ ] Verify structured data (JSON-LD)

## Notes
- The website is production-ready
- All SEO optimizations are in place
- Performance optimizations implemented
- No backend required for static content
- Contact form requires backend integration for submission
