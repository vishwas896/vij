
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from '@/hooks/use-auth';


export const metadata: Metadata = {
  metadataBase: new URL('https://vij.life'),
  title: {
    default: "VIJ - India's Intelligent Job Network for Social Impact",
    template: `%s | VIJ`,
  },
  description: 'VIJ is a social job portal where talent meets opportunity, powered by AI. Join us in building a community that drives change in the social impact sector.',
   openGraph: {
    title: "VIJ - India's Intelligent Job Network for Social Impact",
    description: 'A social job portal where talent meets opportunity, powered by AI.',
    url: 'https://vij.life',
    siteName: 'VIJ',
    images: [
      {
        url: '/og-image.png', // It's a good practice to have an OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "VIJ - India's Intelligent Job Network for Social Impact",
    description: 'A social job portal where talent meets opportunity, powered by AI.',
    // images: ['/twitter-image.png'], // And a twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script src="https://www.google.com/recaptcha/api.js?render=6LeJ0qMrAAAAAIp_2xX_Zt2hY4eJ_Yj2sWqN7uJ3" async defer></script>
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <SpeedInsights/>
        </AuthProvider>
      </body>
    </html>
  );
}
