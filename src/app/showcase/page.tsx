'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { blockMeta, themeMeta } from '@/registry'

const categories = ['all', 'hero', 'content', 'marketing', 'gallery', 'form'] as const

export default function ShowcasePage() {
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all'
    ? blockMeta
    : blockMeta.filter(b => b.category === filter)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Block Showcase</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{blockMeta.length} blocks · {themeMeta.length} themes</span>
            <Link href="/showcase/themes" className="text-sm text-primary hover:underline">Themes →</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filter === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
              }`}
            >
              {cat === 'all' ? 'Tous' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Block Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(block => (
            <Link
              key={block.slug}
              href={`/showcase/blocks/${block.slug}`}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                  {block.category}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                  {block.blockType}
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {block.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {block.description}
              </p>
              <p className="mt-4 text-xs text-primary font-medium">
                10 variantes →
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
