# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based personal portfolio/CV website for a PHP/Symfony developer. The site is built with React 19, Bootstrap 5, and uses react-i18next for internationalization (French/English). The site is deployed via GitHub Pages.

## Development Commands

### Start Development Server
```bash
npm start
```
Runs the app in development mode using Vite. Open http://localhost:3000 to view.

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `build/` directory using Vite.

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build.

### Deploy to GitHub Pages
```bash
npm run deploy
```
Deploys the production build to GitHub Pages (gh-pages branch).

## Docker Development

The project includes Docker configuration for isolated development environment.

### Build Docker Image
```bash
docker compose build
```
Builds the Docker image with Node.js 22 and all dependencies.

### Start Development Server with Docker
```bash
docker compose up
```
Starts the development server on http://localhost:3000 with hot-reload enabled.

### Run Build with Docker
```bash
docker compose run --rm app npm run build
```
Creates production build inside Docker container.

### Run Any npm Command with Docker
```bash
docker compose run --rm app npm <command>
```
Execute any npm command inside the Docker environment.

## Architecture

### Build Configuration
- **Vite** (vite.config.js): Fast build tool with React plugin, SCSS support, and output to `build/` directory
- **SCSS**: Processed natively by Vite with Dart Sass
- **PostCSS**: Autoprefixer for browser compatibility

### Internationalization (i18n)
- **Setup**: i18next initialized in src/index.jsx with browser language detection
- **Translations**: Located in src/translations/[lang]/common.json (currently supports 'en' and 'fr')
- **Fallback**: English (en) is the fallback language
- **Language handling**: Always normalize `i18n.language` to base code (e.g., `fr-FR` → `fr`) before using as object key
- **Usage**: Components use `withTranslation("common")` HOC or `useTranslation()` hook and access translations via `t()` function

### Data Structure
All content is data-driven from JSON files in `src/data/`:
- **user.json**: User profile (name, picture)
- **skills.json**: Technical skills organized by category (Languages, Frameworks, Databases, etc.) with proficiency ratings (1-4 scale)
- **experiences.json**: Work experience entries with role, date, location, company, and explanation
- **formations.json**: Educational background/training
- **certifications.json**: Professional certifications

### Component Organization

**Main Layout** (src/App.jsx):
Single-page application with sections rendered in order:
1. Header (navigation)
2. Main (hero/intro)
3. About
4. Competences (skills)
5. Experiences
6. Formations
7. Certifications
8. Contacts
9. Footer

All components are functional components using React hooks.

**Common Components** (src/components/common/):
- **ListSkills.jsx**: Renders skill categories with rating dots
- **RatingDot.jsx**: Visual skill proficiency indicator (dot-based rating system)
- **ExpTree.jsx**: Timeline entry for work experiences
- **Formation.jsx**: Training/education entry
- **Certification.jsx**: Certification entry
- **AnimateOnScroll.jsx**: Intersection observer wrapper for scroll animations

### Styling Architecture
- **SCSS Files**: Main styles in src/style.scss and src/responsive.scss
- **Color Palette**: Defined in src/_color.scss
- **Component Styles**: src/App.scss for app-level styles (imports _color, style, responsive)
- **CSS Framework**: Bootstrap 5 for layout + custom SCSS

### Key Patterns

**Data-Driven Rendering**:
Components import JSON data and map over arrays to render lists. Example pattern from Competences.jsx:
```javascript
import datas from "../data/skills.json";
// ...
{datas.map((skills, key) => (
  <div key={key}>
    <ListSkills title={skills.category[currentLang]} arr={skills.detail} />
  </div>
))}
```

**Translation Pattern**:
```javascript
import { withTranslation } from "react-i18next";

const Component = ({ t }) => {
  return <h2>{t("title.skills")}</h2>;
};

export default withTranslation("common")(Component);
```

## Content Updates

To update portfolio content, edit JSON files in `src/data/`:
- Modify skills, experiences, formations, or certifications by editing respective JSON files
- Maintain consistent data structure (each object must have required fields)
- Skills use a numeric `value` field (1-4) for proficiency rating
- For text content changes, update translation files in both `src/translations/en/` and `src/translations/fr/`

## Important Notes

- The site is configured for GitHub Pages deployment (homepage set to https://stephane.rathgeber.alsace)
- All user-facing text should be added to both English and French translation files to maintain bilingual support
- Entry point is `index.html` at root (Vite convention), not in `public/`
- Static assets (favicons, CNAME, robots.txt, sitemap.xml) are in `public/` and copied as-is to build
