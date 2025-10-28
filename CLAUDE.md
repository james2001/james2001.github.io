# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based personal portfolio/CV website for a PHP/Symfony developer. The site is built with React 18, Bootstrap 5, Tailwind CSS (PostCSS7 compat), and uses react-i18next for internationalization (French/English). The site is deployed via GitHub Pages.

## Development Commands

### Start Development Server
```bash
npm start
# or
yarn start
```
Runs the app in development mode using CRACO (Create React App Configuration Override). Open http://localhost:3000 to view.

### Build for Production
```bash
npm run build
# or
yarn build
```
Creates an optimized production build in the `build/` directory using CRACO.

### Deploy to GitHub Pages
```bash
npm run deploy
# or
yarn deploy
```
Deploys the production build to GitHub Pages (gh-pages branch).

### Run Tests
```bash
npm test
# or
yarn test
```
Runs tests in interactive watch mode using CRACO.

## Docker Development

The project includes Docker configuration for isolated development environment.

### Build Docker Image
```bash
docker compose build
```
Builds the Docker image with Node.js 18 and all dependencies.

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

### Run Tests with Docker
```bash
docker compose run --rm app npm test
```
Runs tests in Docker container.

### Run Any npm Command with Docker
```bash
docker compose run --rm app npm <command>
```
Execute any npm command inside the Docker environment.

## Architecture

### Build Configuration
- **CRACO** (craco.config.js): Overrides Create React App configuration to enable Tailwind CSS with PostCSS 7 compatibility
- **Tailwind CSS**: Uses PostCSS7-compatible version configured via tailwind.config.js with purge settings for production optimization
- **PostCSS**: Configured through CRACO with Tailwind and Autoprefixer plugins

### Internationalization (i18n)
- **Setup**: i18next initialized in src/index.js with browser language detection
- **Translations**: Located in src/translations/[lang]/common.json (currently supports 'en' and 'fr')
- **Fallback**: English (en) is the fallback language
- **Usage**: Components use `withTranslation("common")` HOC and access translations via `t()` function

### Data Structure
All content is data-driven from JSON files in `src/data/`:
- **user.json**: User profile (name, picture)
- **skills.json**: Technical skills organized by category (Languages, Frameworks, Databases, etc.) with proficiency ratings (1-4 scale)
- **experiences.json**: Work experience entries with role, date, location, company, and explanation
- **formations.json**: Educational background/training
- **certifications.json**: Professional certifications

### Component Organization

**Main Layout** (src/App.js):
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

**Common Components** (src/components/common/):
- **ListSkills.jsx**: Renders skill categories with rating dots
- **RatingDot.jsx**: Visual skill proficiency indicator (dot-based rating system)
- **ExpTree.jsx**: Timeline entry for work experiences
- **Formation.jsx**: Training/education entry
- **Certification.jsx**: Certification entry

### Styling Architecture
- **SCSS Files**: Main styles in src/style.scss and src/responsive.scss
- **Color Palette**: Defined in src/_color.scss
- **Component Styles**: src/App.scss for app-level styles
- **CSS Framework Mix**: Bootstrap 5 for layout + Tailwind for utilities + custom SCSS

### Key Patterns

**Data-Driven Rendering**:
Components import JSON data and map over arrays to render lists. Example pattern from Competences.jsx:
```javascript
import datas from "../data/skills.json";
// ...
{datas.map((skills, key) => (
  <div key={key}>
    <ListSkills title={skills.category} arr={skills.detail} />
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

- This project uses CRACO to customize Create React App without ejecting
- Tailwind CSS uses a PostCSS 7 compatible version due to Create React App constraints
- The site is configured for GitHub Pages deployment (homepage set to https://stephane.rathgeber.alsace)
- All user-facing text should be added to both English and French translation files to maintain bilingual support
