'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { blockComponents, blockMeta, themeMeta } from '@/registry'

const VARIANTS = ['centered', 'split', 'cards', 'minimal', 'bold', 'magazine', 'gradient', 'glass', 'dark', 'animated']

// Dummy data generators by block category
const dummyData: Record<string, Record<string, any>> = {
  hero: {
    title: 'Créez votre site web en quelques minutes',
    subtitle: 'Une plateforme intelligente qui transforme votre vision en réalité. Design premium, performance maximale.',
    ctaLabel: 'Commencer gratuitement',
    ctaUrl: '#',
    secondaryCtaLabel: 'Voir la démo',
    secondaryCtaUrl: '#',
  },
  problem: {
    title: 'Les défis que vous rencontrez',
    subtitle: 'Créer un site web ne devrait pas être un parcours du combattant.',
    problems: [
      { icon: '⏰', title: 'Trop de temps perdu', description: 'Des mois de développement pour un résultat qui ne vous ressemble pas.' },
      { icon: '💸', title: 'Budget hors contrôle', description: 'Les coûts explosent avec chaque modification ou fonctionnalité.' },
      { icon: '😤', title: 'Résultat décevant', description: 'Un site générique qui ne se démarque pas de la concurrence.' },
    ],
  },
  solution: {
    title: 'Notre approche',
    subtitle: 'Une solution pensée pour vous simplifier la vie.',
    solutions: [
      { icon: '🚀', title: 'Rapide à déployer', description: 'Votre site est en ligne en quelques jours, pas en quelques mois.' },
      { icon: '🎨', title: 'Design sur mesure', description: 'Chaque page est unique et reflète votre identité de marque.' },
      { icon: '📱', title: 'Mobile-first', description: 'Un rendu parfait sur tous les écrans, du smartphone au grand écran.' },
    ],
  },
  features: {
    title: 'Tout ce dont vous avez besoin',
    subtitle: 'Des fonctionnalités pensées pour la croissance.',
    features: [
      { icon: '⚡', title: 'Performance', description: 'Sites ultra-rapides avec un score Lighthouse de 95+.' },
      { icon: '🔒', title: 'Sécurité', description: 'SSL, protection DDoS et sauvegardes automatiques.' },
      { icon: '📊', title: 'Analytics', description: 'Suivez vos visiteurs et optimisez vos conversions.' },
      { icon: '🌍', title: 'Multilingue', description: 'Touchez une audience internationale avec le support FR/EN.' },
      { icon: '🎯', title: 'SEO intégré', description: 'Optimisation automatique pour les moteurs de recherche.' },
      { icon: '🔧', title: 'Personnalisable', description: 'Modifiez tout depuis votre tableau de bord admin.' },
    ],
  },
  testimonials: {
    title: 'Ce que disent nos clients',
    testimonials: [
      { quote: 'Un service exceptionnel. Notre site a été livré en 5 jours et les retours de nos clients sont incroyables.', author: 'Marie Dupont', role: 'CEO, TechStart' },
      { quote: 'Le meilleur investissement que nous ayons fait cette année. Le ROI est visible dès le premier mois.', author: 'Jean Martin', role: 'Directeur, Immo Plus' },
      { quote: 'Enfin un prestataire qui comprend nos besoins. Le résultat dépasse nos attentes.', author: 'Sophie Laurent', role: 'Fondatrice, BioShop' },
    ],
  },
  team: {
    title: 'Notre équipe',
    subtitle: 'Des experts passionnés à votre service.',
    members: [
      { name: 'Alexandre Dubois', role: 'CEO & Fondateur', bio: '15 ans d\'expérience en développement web.' },
      { name: 'Claire Martin', role: 'Directrice Design', bio: 'Ancienne designer chez une agence internationale.' },
      { name: 'Thomas Leroy', role: 'Lead Developer', bio: 'Spécialiste Next.js et architectures modernes.' },
      { name: 'Emma Bernard', role: 'Marketing', bio: 'Experte en acquisition et growth hacking.' },
    ],
  },
  process: {
    title: 'Comment ça marche',
    subtitle: 'Trois étapes simples pour votre nouveau site.',
    steps: [
      { stepNumber: '1', title: 'Décrivez votre projet', description: 'Parlez-nous de votre activité, vos besoins et vos objectifs.' },
      { stepNumber: '2', title: 'On construit votre site', description: 'Notre IA et nos experts créent un site sur mesure en quelques jours.' },
      { stepNumber: '3', title: 'Lancez et grandissez', description: 'Votre site est en ligne. Modifiez le contenu quand vous voulez.' },
    ],
  },
  faq: {
    title: 'Questions fréquentes',
    layout: 'one-column',
    items: [
      { question: 'Combien de temps pour créer mon site ?', answer: 'En moyenne 5 à 10 jours ouvrés selon la complexité du projet.' },
      { question: 'Puis-je modifier le contenu moi-même ?', answer: 'Oui, vous avez un accès admin complet pour modifier textes, images et pages.' },
      { question: 'Le site est-il optimisé pour le SEO ?', answer: 'Absolument. Chaque page est optimisée pour les moteurs de recherche.' },
      { question: 'Que se passe-t-il si j\'ai besoin d\'aide ?', answer: 'Notre équipe support est disponible par email et téléphone.' },
    ],
  },
  cta: {
    title: 'Prêt à transformer votre présence en ligne ?',
    subtitle: 'Rejoignez les centaines d\'entreprises qui nous font confiance.',
    ctaLabel: 'Démarrer maintenant',
    ctaUrl: '#',
    secondaryCtaLabel: 'Nous contacter',
    secondaryCtaUrl: '#',
  },
  pricing: {
    title: 'Des tarifs transparents',
    subtitle: 'Choisissez la formule qui correspond à vos besoins.',
    plans: [
      { name: 'Starter', price: '29€', period: '/mois', features: 'Site vitrine\\n5 pages\\nSSL inclus\\nSupport email', ctaLabel: 'Choisir', ctaUrl: '#', highlighted: false },
      { name: 'Pro', price: '79€', period: '/mois', features: 'Site complet\\nPages illimitées\\nSEO avancé\\nSupport prioritaire\\nAnalytics', ctaLabel: 'Choisir', ctaUrl: '#', highlighted: true },
      { name: 'Enterprise', price: 'Sur devis', period: '', features: 'Solution sur mesure\\nDéveloppement custom\\nSLA garanti\\nAccount manager', ctaLabel: 'Nous contacter', ctaUrl: '#', highlighted: false },
    ],
  },
  gallery: {
    title: 'Nos réalisations',
    subtitle: 'Quelques exemples de sites créés pour nos clients.',
    images: [
      { caption: 'Restaurant Le Gourmet' },
      { caption: 'Agence Immobilière Premium' },
      { caption: 'Cabinet d\'Avocats Martin' },
      { caption: 'Studio de Design' },
      { caption: 'Boutique en ligne' },
      { caption: 'Startup Tech' },
    ],
  },
  contact: {
    title: 'Contactez-nous',
    subtitle: 'Nous sommes là pour répondre à vos questions.',
    email: 'contact@exemple.ch',
    phone: '+41 21 123 45 67',
    address: 'Rue du Lac 42, 1003 Lausanne, Suisse',
    showMap: false,
  },
  stats: {
    title: 'En chiffres',
    stats: [
      { value: '500', suffix: '+', label: 'Sites créés' },
      { value: '98', suffix: '%', label: 'Clients satisfaits' },
      { value: '5', suffix: 'j', label: 'Délai moyen' },
      { value: '24', suffix: '/7', label: 'Support disponible' },
    ],
  },
}

export default function BlockDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params)
  const [activeVariant, setActiveVariant] = useState<string>('all')
  const [activeTheme, setActiveTheme] = useState<string>('')

  const block = blockMeta.find(b => b.slug === slug)
  const Component = blockComponents[slug]

  // Apply theme CSS variables
  useEffect(() => {
    if (!activeTheme) return
    const theme = themeMeta.find(t => t.slug === activeTheme)
    if (!theme) return
    const root = document.documentElement
    Object.entries(theme.tokens).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      root.style.setProperty(`--${cssVar}`, `hsl(${value})`)
    })
    return () => {
      Object.keys(theme.tokens).forEach(key => {
        const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        root.style.removeProperty(`--${cssVar}`)
      })
    }
  }, [activeTheme])

  if (!block || !Component) {
    return <div className="container mx-auto px-6 py-20 text-center text-muted-foreground">Block "{slug}" not found. Run `npm run sync` first.</div>
  }

  const data = dummyData[slug] || dummyData.hero
  const variantsToShow = activeVariant === 'all' ? VARIANTS : [activeVariant]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-3">
            <Link href="/showcase" className="text-sm text-muted-foreground hover:text-primary">← Catalogue</Link>
            <span className="text-muted-foreground/30">/</span>
            <h1 className="text-lg font-bold text-foreground">{block.name}</h1>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">{block.category}</span>
          </div>

          {/* Variant filter */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveVariant('all')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${activeVariant === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            >
              Toutes (10)
            </button>
            {VARIANTS.map(v => (
              <button
                key={v}
                onClick={() => setActiveVariant(v)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${activeVariant === v ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Theme switcher */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="text-xs text-muted-foreground self-center mr-2">Thème :</span>
            <button
              onClick={() => setActiveTheme('')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${!activeTheme ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            >
              Default
            </button>
            {themeMeta.slice(0, 10).map(t => (
              <button
                key={t.slug}
                onClick={() => setActiveTheme(t.slug)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${activeTheme === t.slug ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Block previews */}
      <main>
        {variantsToShow.map(variant => (
          <div key={variant} className="border-b border-border/30">
            <div className="container mx-auto px-6 pt-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-muted text-muted-foreground mb-2">
                {variant}
              </span>
            </div>
            <Component variant={variant} {...data} />
          </div>
        ))}
      </main>
    </div>
  )
}
