const fs = require('fs');
const path = require('path');

const componentsDir = 'c:/Users/aaaec/OneDrive/Desktop/neo/client/src/components';
const pagesDir = 'c:/Users/aaaec/OneDrive/Desktop/neo/client/src/app/(main)';

const pageDirs = fs.readdirSync(pagesDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && !['blog', 'hakkimizda', 'hizmetler', 'referanslar'].includes(d.name))
  .map(d => d.name);

const services = [];
let order = 1;

for (const dir of pageDirs) {
  const pagePath = path.join(pagesDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;
  
  const pageContent = fs.readFileSync(pagePath, 'utf-8');
  const titleMatch = pageContent.match(/title="([^"]+)"/);
  const descMatch = pageContent.match(/description="([^"]+)"/);
  const imgMatch = pageContent.match(/imageSrc="([^"]+)"/);
  
  // Find which RichContent component it imports
  const importMatch = pageContent.match(/import\s+([A-Za-z0-9]+RichContent)\s+from/);
  let detailMainTitle = titleMatch ? titleMatch[1] : '';
  let subTitle1 = '', text1 = '', image2 = '', subTitle2 = '', text2 = '', image3 = '', subTitle3 = '', text3 = '';
  
  if (importMatch) {
    const compName = importMatch[1];
    const compPath = path.join(componentsDir, compName + '.tsx');
    if (fs.existsSync(compPath)) {
      const compContent = fs.readFileSync(compPath, 'utf-8');
      
      const h3s = [...compContent.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].trim().replace(/\s+/g, ' ').replace(/<[^>]+>/g, ''));
      const ps = [...compContent.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(m => m[1].trim().replace(/\s+/g, ' ').replace(/<[^>]+>/g, ''));
      const imgs = [...compContent.matchAll(/<Image[^>]*src="([^"]+)"/g)].map(m => m[1]);
      
      if (h3s.length > 0) detailMainTitle = h3s[0];
      if (h3s.length > 1) subTitle1 = h3s[1];
      if (h3s.length > 2) subTitle2 = h3s[2];
      if (h3s.length > 3) subTitle3 = h3s[3];
      
      if (ps.length > 0) text1 = ps[0];
      if (ps.length > 1) text2 = ps[1];
      if (ps.length > 2) text3 = ps[2];
      
      if (imgs.length > 0) image2 = imgs[0];
      if (imgs.length > 1) image3 = imgs[1];
    }
  }
  
  services.push({
    title: titleMatch ? titleMatch[1] : dir,
    slug: dir,
    miniDescription: descMatch ? descMatch[1] : '',
    iconPath: imgMatch ? imgMatch[1] : '',
    isFeaturedHome: true,
    detailMainTitle: detailMainTitle,
    detailSmallDescription: descMatch ? descMatch[1] : '',
    image1: imgMatch ? imgMatch[1] : '',
    subTitle1,
    text1,
    image2,
    subTitle2,
    text2,
    image3,
    subTitle3,
    text3,
    order: order++
  });
}

const seedCode = `import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // Eski verileri temizle ki çakışma yaşanmasın
    await prisma.service.deleteMany();

    const staticServices = ${JSON.stringify(services, null, 4)};

    await prisma.service.createMany({
      data: staticServices,
    });

    return NextResponse.json({ message: 'Services seeded successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error seeding services:', error);
    return NextResponse.json({ error: 'Failed to seed services' }, { status: 500 });
  }
}
`;

fs.writeFileSync('c:/Users/aaaec/OneDrive/Desktop/neo/client/src/app/api/services/seed/route.ts', seedCode);
console.log('Seed generated successfully!');
