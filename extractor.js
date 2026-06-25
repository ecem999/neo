const fs = require('fs');
const path = require('path');

const componentsDir = 'c:/Users/aaaec/OneDrive/Desktop/neo/client/src/components';
const pagesDir = 'c:/Users/aaaec/OneDrive/Desktop/neo/client/src/app/(main)';

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('RichContent.tsx'));

console.log("=== RICH CONTENT ===");
for (const file of files) {
  const content = fs.readFileSync(path.join(componentsDir, file), 'utf-8');
  console.log(`\n--- ${file} ---`);
  
  const h3Matches = [...content.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].trim().replace(/\s+/g, ' '));
  const pMatches = [...content.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(m => m[1].trim().replace(/\s+/g, ' '));
  const imgMatches = [...content.matchAll(/<Image[^>]*src="([^"]+)"/g)].map(m => m[1]);

  console.log('H3:', h3Matches);
  console.log('P:', pMatches);
  console.log('Img:', imgMatches);
}

console.log("\n=== PAGES ===");
const pageDirs = fs.readdirSync(pagesDir, { withFileTypes: true }).filter(d => d.isDirectory() && d.name !== 'blog' && d.name !== 'hakkimizda' && d.name !== 'hizmetler' && d.name !== 'referanslar').map(d => d.name);

for (const dir of pageDirs) {
    const pagePath = path.join(pagesDir, dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
        const content = fs.readFileSync(pagePath, 'utf-8');
        const titleMatch = content.match(/title="([^"]+)"/);
        const descMatch = content.match(/description="([^"]+)"/);
        const imgMatch = content.match(/imageSrc="([^"]+)"/);
        console.log(`DIR: ${dir} | Title: ${titleMatch?.[1]} | Desc: ${descMatch?.[1]} | Img: ${imgMatch?.[1]}`);
    }
}
