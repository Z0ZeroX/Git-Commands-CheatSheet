// Script to generate PDF with 3-column layout
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  console.log('Starting PDF generation (3-column layout)...');
  
  // Build VitePress site first
  console.log('Building VitePress site...');
  try {
    execSync('npm run docs:build', { stdio: 'inherit' });
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Read the built HTML file (print version)
  const htmlPath = path.join(__dirname, '../docs/.vitepress/dist/quick-reference-print.html');
  
  if (!fs.existsSync(htmlPath)) {
    console.error('HTML file not found. Make sure quick-reference-print.md is built.');
    process.exit(1);
  }
  
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  
  await page.setViewport({
    width: 1200,
    height: 1600
  });
  
  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  });
  
  // Build a clean print-only DOM from quick-reference-print sections
  await page.evaluate(() => {
    const source = document.querySelector('.vp-doc, .VPDoc');
    if (!source) {
      throw new Error('Unable to find documentation content (.vp-doc) for PDF generation.');
    }

    const sections = Array.from(source.querySelectorAll('h2'));

    const sectionBlocks = sections.map(section => {
      const elements = [section];
      let sibling = section.nextElementSibling;

      while (sibling && sibling.tagName !== 'H2') {
        elements.push(sibling);
        sibling = sibling.nextElementSibling;
      }

      const tableRows = section.parentElement?.querySelectorAll('tbody tr')?.length || 0;
      const ownRows = elements
        .filter(el => el.tagName === 'TABLE')
        .reduce((sum, table) => sum + table.querySelectorAll('tbody tr').length, 0);

      const weight = Math.max(ownRows || tableRows, 1) + 1; // +1 for heading/padding overhead
      return { elements, weight };
    });

    // Greedy balancing: append each next section to currently shortest column
    const columns = [
      { elements: [], weight: 0 },
      { elements: [], weight: 0 },
      { elements: [], weight: 0 }
    ];

    sectionBlocks.forEach(block => {
      const target = columns.reduce((min, col) => (col.weight < min.weight ? col : min), columns[0]);
      target.elements.push(...block.elements);
      target.weight += block.weight;
    });
    
    // Create new layout with only command content
    const root = document.createElement('div');
    root.id = 'pdf-root';
    root.style.cssText = 'width: 100%; margin: 0; padding: 0;';

    const header = document.createElement('div');
    header.style.cssText = `
      text-align: center;
      padding: 6px;
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
      border-radius: 6px;
      margin-bottom: 6px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    `;
    header.innerHTML = `
      <h1 style="font-size: 16px; color: white; margin: 0 0 3px 0; font-weight: 800;">Git Commands Quick Reference</h1>
    `;

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; gap: 8mm; width: 100%;';
    
    const column1 = document.createElement('div');
    column1.style.cssText = 'flex: 1; min-width: 0;';
    columns[0].elements.forEach(el => column1.appendChild(el));
    
    const column2 = document.createElement('div');
    column2.style.cssText = 'flex: 1; min-width: 0;';
    columns[1].elements.forEach(el => column2.appendChild(el));
    
    const column3 = document.createElement('div');
    column3.style.cssText = 'flex: 1; min-width: 0;';
    columns[2].elements.forEach(el => column3.appendChild(el));
    
    wrapper.appendChild(column1);
    wrapper.appendChild(column2);
    wrapper.appendChild(column3);

    root.appendChild(header);
    root.appendChild(wrapper);

    document.body.innerHTML = '';
    document.body.appendChild(root);
  });
  
  // Inject CSS for styling
  await page.addStyleTag({
    content: `
      @page {
        size: A4 landscape;
        margin: 9mm 8mm;
      }
      
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 8px;
          line-height: 1.25;
          color: #2c3e50;
          margin: 0;
          padding: 0;
        }
        
        h2 {
          color: #1e40af;
          font-size: 8px;
          font-weight: 700;
          margin: 4px 0 3px 0;
          padding: 2px 4px;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border-left: 3px solid #2563eb;
          border-radius: 3px;
          break-after: avoid;
        }
        
        /* Tables - ultra compact layout for 3 columns */
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 2px 0 5px 0;
          font-size: 6px;
          break-inside: avoid;
        }
        
        table th {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: white;
          padding: 2px 3px;
          text-align: left;
          font-weight: 600;
          font-size: 6.2px;
        }
        
        table td {
          padding: 1px 3px;
          border: 1px solid #e5e7eb;
          vertical-align: top;
          line-height: 1.2;
        }
        
        table td:first-child {
          width: 42%;
          font-weight: 500;
        }
        
        table tr:nth-child(even) {
          background-color: #f8fafc;
        }
        
        /* Code styling */
        code {
          background: #f1f5f9;
          padding: 0 1.5px;
          border-radius: 2px;
          font-family: "Consolas", "Monaco", monospace;
          font-size: 5.5px;
          color: #1e293b;
          font-weight: 500;
        }
        
        /* Remove link styling for print */
        a {
          color: inherit;
          text-decoration: none;
        }
        
        a[href]:after {
          content: none !important;
        }
        
        /* Prevent awkward breaks */
        h2, table {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        
        tr {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      }
    `
  });
  
  console.log('Generating PDF (A4 Landscape, 3 columns)...');
  
  const publicOutputPath = path.join(__dirname, '../docs/public/downloads/git-commands-quick-reference.pdf');
  const distOutputPath = path.join(__dirname, '../docs/.vitepress/dist/downloads/git-commands-quick-reference.pdf');

  // Create output directories if they don't exist
  const publicDownloadsDir = path.dirname(publicOutputPath);
  if (!fs.existsSync(publicDownloadsDir)) {
    fs.mkdirSync(publicDownloadsDir, { recursive: true });
  }

  const distDownloadsDir = path.dirname(distOutputPath);
  if (!fs.existsSync(distDownloadsDir)) {
    fs.mkdirSync(distDownloadsDir, { recursive: true });
  }
  
  await page.pdf({
    path: publicOutputPath,
    format: 'A4',
    landscape: true,  // A4 landscape to have more space for 3 columns
    printBackground: true,
    margin: {
      top: '9mm',
      right: '8mm',
      bottom: '9mm',
      left: '8mm'
    },
    displayHeaderFooter: false,
    preferCSSPageSize: false
  });
  
  await browser.close();

  // Keep current dist in sync so immediate preview/download after pdf:generate also works
  fs.copyFileSync(publicOutputPath, distOutputPath);
  
  console.log(`PDF generated successfully: ${publicOutputPath}`);
  console.log(`PDF copied into current build output: ${distOutputPath}`);
  
  const stats = fs.statSync(publicOutputPath);
  const fileSizeInKB = (stats.size / 1024).toFixed(2);
  console.log(`File size: ${fileSizeInKB} KB`);
  
  // Count pages
  console.log('Estimated: 1-2 pages (3-column compact layout)');
}

generatePDF().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
