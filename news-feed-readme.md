# Forum Feed Setup

## Overview
The forum feed component displays the latest announcements from the GHI Electronics forum.

## Development Setup

### 1. Start the Proxy Server
The forum feed requires a proxy server to bypass CORS restrictions when fetching data from the forum API in development.

```bash
npm run proxy
```

This starts a proxy server on `http://localhost:3001` that forwards requests to `forums.ghielectronics.com`.

### 2. Start the Development Server
In a separate terminal, run:

```bash
npm start
```

## How It Works

- **Development**: The forum feed fetches data through the proxy server at `http://localhost:3001/api/forum`
- **Production**: The forum feed fetches data directly from `https://forums.ghielectronics.com`

## API Endpoint
The feed pulls the latest topics from:
- `/c/press/announcements/5/l/latest.json`

This endpoint provides:
- Topic titles
- Post excerpts
- Creation dates
- Reply counts

## Troubleshooting

If the forum feed shows an error:
1. Ensure the proxy server is running (`npm run proxy`)
2. Check that port 3001 is available
3. Verify your internet connection

## Files
- `/src/components/ForumFeed/index.js` - Main component
- `/src/components/ForumFeed/styles.module.css` - Styling
- `/proxy-server.js` - Proxy server configuration
