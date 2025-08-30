import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'RTcodeX - Full-Stack Developer & Software Engineer | Modern Web Solutions',
  description: 'RTcodeX: Expert Full-Stack Developer specializing in React, Next.js, TypeScript, Node.js, and modern web technologies. Creating scalable web applications, e-commerce platforms, and innovative digital solutions with 3D animations and responsive design.',
  keywords: [
    'RTcodeX',
    'Full-Stack Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Expert',
    'TypeScript',
    'Node.js',
    'Web Development',
    'JavaScript Developer',
    'Frontend Developer',
    'Backend Developer',
    'MongoDB',
    'PostgreSQL',
    'Express.js',
    'Tailwind CSS',
    'Three.js',
    '3D Web Development',
    'Responsive Design',
    'E-commerce Development',
    'Portfolio Website',
    'Custom Web Applications',
    'API Development',
    'Database Design',
    'Modern Web Solutions',
    'Professional Developer'
  ].join(', '),
  authors: [{ name: 'RTcodeX', url: 'https://rtcodex.dev' }],
  creator: 'RTcodeX',
  publisher: 'RTcodeX',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rtcodex.dev',
    title: 'RTcodeX - Full-Stack Developer & Software Engineer',
    description: 'Expert Full-Stack Developer creating modern web applications with React, Next.js, and cutting-edge technologies. View my portfolio of innovative projects.',
    siteName: 'RTcodeX Portfolio',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'RTcodeX - Full-Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTcodeX - Full-Stack Developer & Software Engineer',
    description: 'Expert Full-Stack Developer creating modern web applications with React, Next.js, and cutting-edge technologies.',
    images: ['/logo.jpg'],
    creator: '@rtcodex',
  },
  icons: {
    icon: [
      { url: '/logo.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/logo.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/logo.jpg',
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://rtcodex.dev'),
  alternates: {
    canonical: 'https://rtcodex.dev',
  },
  category: 'technology',
  classification: 'Portfolio Website',
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}