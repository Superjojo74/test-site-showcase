import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Block Showcase',
  description: 'Visual preview of all blocks, headers, footers and themes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
