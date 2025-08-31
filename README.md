# RTcodeX - Full-Stack Developer Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Three.js.

## Features

- 🎨 Modern, clean design with smooth animations
- 📱 Fully responsive across all devices
- 🎭 Interactive 3D elements with Three.js
- ⚡ Optimized performance with Next.js 15
- 🎯 SEO-friendly with proper meta tags
- 🚀 Ready for Vercel deployment

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rohit-Codess/RTcodeX.git
cd RTcodeX/client
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

### Method 1: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://www.rtcodex.dev)
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project
5. Set any environment variables in Vercel dashboard
6. Deploy!

### Method 2: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login and deploy:
```bash
vercel login
vercel --prod
```

### Environment Variables

Set these in your Vercel dashboard under Settings > Environment Variables:

```bash
NEXT_PUBLIC_APP_URL=https://www.rtcodex.dev
# Add other environment variables as needed
```

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── home/           # Homepage components
│   ├── layout/         # Layout components
│   ├── projects/       # Project components
│   └── ui/             # UI components
├── data/               # Static data
├── hooks/              # Custom React hooks
└── views/              # Page views
```

## Performance Optimizations

- ✅ Next.js App Router for optimal performance
- ✅ Image optimization with next/image
- ✅ Font optimization with next/font
- ✅ Bundle optimization and code splitting
- ✅ Static generation where possible
- ✅ Proper caching headers
- ✅ Compressed assets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/Rohit-Codess/RTcodeX](https://github.com/Rohit-Codess/RTcodeX)
