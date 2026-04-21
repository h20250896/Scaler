import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Growth Lever Simulator | Scaler AI Labs',
  description: 'Model, rank, and optimise strategic growth interventions for AI-scale operations.',
  openGraph: {
    title: 'Growth Lever Simulator',
    description: 'Model, rank, and optimise strategic growth levers.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
