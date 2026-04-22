# test-site-showcase — Block Showcase & Preview

## Vision

Ce repo est le **showroom visuel** de tous les blocks, headers, footers, collections et thèmes gérés par le master (`test-site-master`). Il permet de voir, tester et valider visuellement chaque composant avant déploiement chez un client.

C'est une pièce d'un écosystème de 3 repos :

| Repo | Rôle |
|---|---|
| `test-site-master` | Stocke les blocks en DB (Payload headless, port 3001). Collection `BlockDefinitions` avec configCode + componentCode + métadonnées IA |
| `test-site` | Boilerplate client (Payload + Next.js + Tailwind). Template cloné pour chaque client |
| **`test-site-showcase`** (ce repo) | Rend TOUS les blocks visuellement. Auto-synced depuis le master. Galerie navigable |

## Architecture du showcase

Le showcase est basé sur la **même stack que test-site** (Payload 3 + Next.js 16 + Tailwind v4 + Framer Motion) pour garantir un rendu identique aux sites clients.

### Routes

| Route | Rôle |
|---|---|
| `/showcase` | Catalogue : grille de tous les blocks, filtrable par type/catégorie/tag |
| `/showcase/blocks/[slug]` | Détail : les 10 variantes d'un block côte à côte |
| `/showcase/blocks/[slug]?variant=X&theme=Y` | Preview isolé d'une variante avec un thème |
| `/showcase/headers` | Galerie des headers |
| `/showcase/footers` | Galerie des footers |
| `/showcase/compose?blocks=hero,features,cta&theme=neon` | Compositeur : empile des blocks pour voir une page complète |
| `/admin` | Admin Payload (pour gérer le contenu de démo) |

### Fonctionnalités de preview

- **Theme switcher** : basculer entre les palettes de couleurs (Light Pro, Dark Cinematic, Neon, Pastel...)
- **Responsive toggle** : voir le rendu mobile / tablette / desktop
- **Dummy data auto-générée** : chaque block est rendu avec des données de démo réalistes selon son type
- **Dark mode toggle** : preview light et dark

### Sync depuis le master

Un script `npm run sync` (ou un webhook) qui :
1. Appelle l'API REST du master (`GET /api/block-definitions?limit=0&where[_status][equals]=published`)
2. Pour chaque block, écrit le `.ts` (configCode) et `.tsx` (componentCode) dans `src/blocks/` et `src/components/blocks/`
3. Patche les registrations (même mécanisme de markers que test-site)
4. Régénère les types et l'import map

## Système de thèmes (collection Themes dans le master)

Le master stockera une collection `Themes` avec des palettes de couleurs prédéfinies :

### Structure d'un thème

```
{
  slug: "dark-cinematic",
  name: "Dark Cinematic",
  category: "dark",      // light, dark, colorful, pastel, neon
  tags: ["tech", "gaming", "portfolio", "agence"],
  description: "Palette sombre cinématique avec accents bleu électrique. Idéal pour tech premium et portfolios.",
  
  // Tokens shadcn standard (valeurs HSL)
  tokens: {
    background: "222 47% 11%",
    foreground: "210 40% 98%",
    card: "222 47% 15%",
    cardForeground: "210 40% 98%",
    primary: "217 91% 60%",
    primaryForeground: "222 47% 11%",
    secondary: "217 33% 17%",
    secondaryForeground: "210 40% 98%",
    accent: "217 91% 60%",
    accentForeground: "222 47% 11%",
    muted: "217 33% 17%",
    mutedForeground: "215 20% 65%",
    destructive: "0 84% 60%",
    destructiveForeground: "210 40% 98%",
    border: "217 33% 22%",
    input: "217 33% 22%",
    ring: "217 91% 60%",
  },
  
  // Fonts recommandées
  headingFont: "Space Grotesk",
  bodyFont: "Inter",
  
  // Metadata pour l'IA
  mood: "premium, tech, immersif",
  bestFor: "SaaS, portfolios photo, gaming, agences digitales",
  dontUseFor: "santé, enfants, restauration traditionnelle"
}
```

### Comment le showcase utilise les thèmes

1. Le showcase fetch tous les thèmes depuis le master
2. Un sélecteur en haut de page permet de switcher entre les thèmes
3. Le switch injecte les CSS variables du thème sélectionné dans `:root`
4. Tous les blocks se re-rendent instantanément avec les nouvelles couleurs

### Comment le site client utilise les thèmes

1. L'IA choisit un thème adapté au secteur du client (via `tags` + `description`)
2. Le thème est injecté dans le global `Theme` du site client (collection Payload)
3. Le root layout Next.js lit le global et injecte les CSS vars
4. Changement de thème = runtime, SANS rebuild (juste update du global)
5. Le client peut tweaker les couleurs dans son admin → effet immédiat

## Les 13 sections de blocks actuelles

Chaque section a 10 variantes de layout (centered, split, cards, minimal, bold, magazine, gradient, glass, dark, animated) :

1. **Hero** — accroche visuelle + CTA (top)
2. **Problem** — points de douleur du client (top)
3. **Solution** — comment on résout (middle)
4. **Features** — fonctionnalités/bénéfices (middle)
5. **Testimonials** — témoignages clients (middle)
6. **Team** — présentation équipe (middle)
7. **Process** — comment ça marche en 3 étapes (middle)
8. **FAQ** — questions fréquentes avec accordéon (bottom)
9. **CTA** — appel à l'action final (bottom)
10. **Pricing** — grille tarifaire (middle)
11. **Gallery** — portfolio / galerie d'images (middle)
12. **Contact** — coordonnées + formulaire (bottom)
13. **Stats** — chiffres clés / métriques (middle)

## Conventions techniques

- **Stack** : Payload 3 + Next.js 16 + Tailwind v4 + Framer Motion (identique à test-site)
- **Tokens** : shadcn standard (background, foreground, primary, secondary, accent, muted, card, popover, destructive, border, input, ring)
- **ZÉRO couleur hardcodée** dans les blocks — uniquement classes sémantiques Tailwind
- **Responsive** : mobile-first (base → md: → lg:)
- **Framer Motion** : whileInView avec viewport={{ once: true }}
- **Accessibilité** : alt text, aria-labels, focusable
- **Communiquer en français**

## Master API

Le master tourne sur `http://localhost:3001` (en dev) et expose :
- `GET /api/block-definitions` — liste tous les blocks
- `GET /api/block-definitions?where[slug][equals]=hero` — un block spécifique
- `GET /api/themes` — liste des thèmes (futur, collection à créer dans le master)

Auth : REST API publique en lecture.

## Comment contribuer des blocks

Le flow de production de blocks :

```
1. CRÉER     → Dans le master admin (:3001), écrire configCode + componentCode
2. SYNC      → npm run sync dans ce repo (pull depuis le master)
3. PREVIEW   → /showcase/blocks/<slug> → voir les 10 variantes live
4. ITÉRER    → Modifier dans le master → re-sync → re-preview
5. PUBLIER   → Passer en "published" dans le master quand c'est validé
6. DÉPLOYER  → npm run deploy-mcp <slug> (depuis le master) vers un site client
```

## Roadmap

- [ ] Bootstrap : Payload + Next.js + Tailwind (même stack que test-site)
- [ ] Script `sync` : pull blocks depuis le master API
- [ ] Route `/showcase` : catalogue avec grille filtrable
- [ ] Route `/showcase/blocks/[slug]` : 10 variantes côte à côte
- [ ] Theme switcher (CSS variables dynamiques)
- [ ] Responsive toggle (mobile/tablet/desktop)
- [ ] Dummy data generator (remplissage auto des champs)
- [ ] Collection `Themes` dans le master
- [ ] Route `/showcase/compose` : compositeur de pages
- [ ] Headers et footers preview
- [ ] Screenshots auto pour le catalogue
