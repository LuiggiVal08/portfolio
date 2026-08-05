# ODALX — Portafolio de Luis Angel Valencia Valera

Portafolio bilingüe (ES/EN) de **Luis Angel Valencia Valera**, fundador de **OdalX** — desarrollador fullstack con JavaScript → TypeScript, Node.js y React.

## Stack

- **Astro 5** (estático, 0 JS por defecto)
- **React islands** (theme toggle, rotador de roles)
- **Tailwind CSS v4**
- **i18n**: español en `/`, inglés en `/en` (contenido en `src/content/`)
- Deploy automático a **GitHub Pages** vía GH Actions

## Desarrollo

```sh
npm install
astro dev --background   # servidor en background
astro dev logs           # ver logs
npm run check            # type check
npm run build            # build a dist/
```

## Despliegue

Al hacer push a `main`, el workflow `.github/workflows/deploy.yml` construye y publica en GitHub Pages.

- URL actual: `https://LuiggiVal08.github.io/portfolio`
- Dominio custom (pendiente): `odalx.xyz` → GitHub Pages vía Cloudflare

## Contenido

Los proyectos viven en `src/content/es/projects/` y `src/content/en/projects/` (Markdown + frontmatter). Los textos de UI en `src/i18n/es.json` / `src/i18n/en.json`.

© 2026 Luis Angel Valencia Valera
