'use client'
import React from 'react'
import Link from 'next/link'
import { themeMeta } from '@/registry'

export default function ThemesPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/showcase" className="text-sm text-muted-foreground hover:text-primary">← Catalogue</Link>
          <h1 className="text-lg font-bold text-foreground">Thèmes ({themeMeta.length})</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themeMeta.map(theme => (
            <div key={theme.slug} className="rounded-2xl border border-border bg-card overflow-hidden">
              {/* Color preview strip */}
              <div className="flex h-16">
                <div className="flex-1" style={{ backgroundColor: `hsl(${theme.tokens.background})` }} />
                <div className="flex-1" style={{ background: `hsl(${theme.tokens.primary})` }} />
                <div className="flex-1" style={{ background: `hsl(${theme.tokens.accent})` }} />
                <div className="flex-1" style={{ background: `hsl(${theme.tokens.secondary})` }} />
                <div className="flex-1" style={{ background: `hsl(${theme.tokens.muted})` }} />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-bold text-foreground">{theme.name}</h2>
                  <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">{theme.category}</span>
                </div>

                {/* Sample text with theme colors */}
                <div className="mt-3 p-4 rounded-lg" style={{ backgroundColor: `hsl(${theme.tokens.background})` }}>
                  <p className="text-sm font-bold" style={{ color: `hsl(${theme.tokens.foreground})` }}>Titre exemple</p>
                  <p className="text-xs mt-1" style={{ color: `hsl(${theme.tokens.mutedForeground})` }}>Texte secondaire</p>
                  <div className="mt-2 inline-block px-3 py-1 rounded text-xs font-bold" style={{ background: `hsl(${theme.tokens.primary})`, color: `hsl(${theme.tokens.primaryForeground})` }}>
                    Bouton CTA
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
