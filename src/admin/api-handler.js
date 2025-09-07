// This file can be used with Vercel, Netlify Functions, or Express
// Example API handler for generating catalog files

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// API handler for /api/admin/generate
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const jsonData = req.body;
    
    if (!jsonData || !jsonData.boards) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    // Save the JSON file
    const staticPath = path.join(process.cwd(), 'static', 'duelink.json');
    await fs.writeFile(staticPath, JSON.stringify(jsonData, null, 2));

    // Run the catalog generator script
    execSync('node scripts/generate-catalog.js', { 
      cwd: process.cwd(),
      stdio: 'pipe' 
    });

    // Optionally commit and push (only in production with proper auth)
    if (process.env.AUTO_DEPLOY === 'true') {
      execSync('git add -A', { cwd: process.cwd() });
      execSync(`git commit -m "Update catalog - ${new Date().toISOString()}"`, { cwd: process.cwd() });
      execSync('git push', { cwd: process.cwd() });
    }

    return res.status(200).json({
      success: true,
      message: 'Catalog generated successfully',
      products: jsonData.boards.length,
      categories: [...new Set(jsonData.boards.map(b => b.Category))].length
    });

  } catch (error) {
    console.error('Generation error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// Express middleware version
export function expressHandler(req, res) {
  return handler(req, res);
}

// Helper function for local development
export async function generateFromJSON(jsonData) {
  const staticPath = path.join(process.cwd(), 'static', 'duelink.json');
  await fs.writeFile(staticPath, JSON.stringify(jsonData, null, 2));
  
  // Run the generator
  const output = execSync('node scripts/generate-catalog.js', { 
    cwd: process.cwd(),
    encoding: 'utf8'
  });
  
  return {
    success: true,
    output,
    products: jsonData.boards.length
  };
}