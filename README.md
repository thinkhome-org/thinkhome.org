# ThinkHome Website

A ThinkPad-styled website for ThinkHome.org, specializing in laptop repair and refurbishment services.

## Features

- ThinkPad-inspired design with black and red color scheme
- Server-side rendering with React and Next.js
- Multilingual support (English and Czech)
- YAML/Markdown content management system
- Mobile-responsive design
- E-ink style version for e-readers
- Light/dark mode toggle
- Legacy browser compatibility
- ThinkPad-styled cookie consent popup
- Pageclip contact form integration
- Classic/mobile version toggle
- API access with documentation
- AI editing capabilities
- Cloudflare and Vercel integrations

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/thinkhome/website.git
cd website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

All configuration options are centralized in `src/config/index.ts`. You can customize:

- API keys and integration settings
- Feature toggles to enable/disable components
- Content directories and settings
- Theme configuration
- E-ink mode settings
- Mobile configuration
- API settings
- SEO configuration

## Content Management

Content is managed through Markdown files with YAML frontmatter:

- Products: `src/content/products/`
- Pages: `src/content/pages/`
- Documentation: `src/content/docs/`
- Translations: `src/content/translations/`

### Multilingual Content

Each content file can have language variants by using the language code in the filename:
- `product-name.md` (English version)
- `product-name-cs.md` (Czech version)

## Contact Form

The contact form uses Pageclip for serverless form handling. Configuration is in `src/config/index.ts`.

## Deployment

The website is configured for deployment on Vercel:

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Business Information

- Name: Štefan Paluba
- IČO: 10727078
- Address: Rytířova 777/3, Kamýk, 143 00 Prague 12, Czech Republic
- Email: info@thinkhome.org
- Phone: +420 728 981 602
