# TrendPilot AI — Frontend MVP

TrendPilot AI is a product-discovery and organic-growth intelligence SaaS concept. This first milestone is a frontend prototype using mock data.

## Included
- Responsive dashboard with dark/light theme toggle
- Product opportunity table and transparent scoring formula
- Search, category filtering, sorting, and saved opportunities
- Product details modal with sample keyword ideas and next steps
- CSV export for the currently filtered sample dataset
- Sample demand and margin charts

## Tech stack
- React + Vite
- Recharts
- Lucide React
- CSS custom properties (no Tailwind configuration required for this first milestone)

## Run locally
Requires Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build
```bash
npm run build
npm run preview
```

## Opportunity score
The prototype uses a transparent demo formula:
- Demand: 40%
- Low competition: 30%
- Estimated gross margin: 30%

`score = demand × 0.40 + (100 - competition) × 0.30 + grossMarginPercent × 0.30`

All values are illustrative. The dashboard does not currently fetch live search volume, sales, competitor data, or product trends. Do not use demo numbers as real business estimates.

## Planned next milestones
1. Express API and MongoDB models for products, keywords, and saved opportunities
2. Authentication and workspace persistence
3. Integrate a licensed SEO/search data source
4. Add backend scoring service and source/updated-at metadata
5. Introduce AI-assisted summaries with evidence-linked recommendations
