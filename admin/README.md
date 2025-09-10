# DueLink Admin Panel

Admin interface for managing DueLink products and configurations.

## Getting Started

### Development Server

Run the development server on port 4444:

```bash
npm run dev
```

The admin panel will be available at [http://localhost:4444](http://localhost:4444)

### Alternative Commands

```bash
# Development with specific port
npm run dev -- -p 4444

# Production build
npm run build

# Start production server
npm start

# Export static site
npm run export

# Lint code
npm run lint

# Serve exported static files
npm run serve
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server with Turbopack on port 4000 (default) |
| `build` | Create production build |
| `start` | Start production server |
| `export` | Build and export static site |
| `lint` | Run ESLint |
| `serve` | Serve exported static files |

## Tech Stack

- **Next.js 15.5.2** - React framework with Turbopack
- **React 19.1.0** - UI library
- **Material-UI** - Component library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS

## Project Structure

```
admin/
├── app/           # Next.js app directory
├── components/    # Reusable React components
├── lib/          # Utility functions and libraries
├── public/       # Static assets
└── package.json  # Dependencies and scripts
```

## Environment

The development server runs on port 4000 by default, but can be configured:

```bash
# Run on different port
npm run dev -- -p 4444
```

## Notes

- Uses Turbopack for faster development builds
- Material-UI components for consistent design
- TypeScript for type safety
- ESLint for code quality