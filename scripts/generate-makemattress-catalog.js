import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateCatalog() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const PAGE_WIDTH = 595.28; // A4
  const PAGE_HEIGHT = 841.89;

  // Helpers
  const addHeaderFooter = (page, pageNum, totalPages = 10) => {
    // Top bar
    page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - 35,
      width: PAGE_WIDTH,
      height: 35,
      color: rgb(0.05, 0.05, 0.06)
    });
    page.drawText('MAKEMATTRESS B2B 2026 EXPORT CATALOG', {
      x: 40,
      y: PAGE_HEIGHT - 22,
      size: 9,
      font: fontBold,
      color: rgb(0.83, 0.70, 0.50)
    });
    page.drawText('ALL IN ONE HAND! | KAYSERI, TURKIYE', {
      x: PAGE_WIDTH - 230,
      y: PAGE_HEIGHT - 22,
      size: 8,
      font: fontRegular,
      color: rgb(0.7, 0.7, 0.7)
    });

    // Bottom bar
    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_WIDTH,
      height: 25,
      color: rgb(0.08, 0.08, 0.10)
    });
    page.drawText(`Page ${pageNum} of ${totalPages}`, {
      x: PAGE_WIDTH / 2 - 25,
      y: 8,
      size: 8,
      font: fontRegular,
      color: rgb(0.6, 0.6, 0.6)
    });
    page.drawText('makemattress.com  •  info@makemattress.com', {
      x: 40,
      y: 8,
      size: 8,
      font: fontRegular,
      color: rgb(0.5, 0.5, 0.5)
    });
  };

  // Helper to embed JPG image safely
  const embedImageSafe = async (imageRelPath) => {
    try {
      const fullPath = path.resolve(__dirname, '..', 'public', imageRelPath.replace(/^\//, ''));
      if (fs.existsSync(fullPath)) {
        const imageBytes = fs.readFileSync(fullPath);
        if (fullPath.endsWith('.png')) {
          return await pdfDoc.embedPng(imageBytes);
        } else {
          return await pdfDoc.embedJpg(imageBytes);
        }
      }
    } catch (e) {
      console.warn('Could not embed image:', imageRelPath, e.message);
    }
    return null;
  };

  // =========================================================================
  // PAGE 1: COVER
  // =========================================================================
  const page1 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  // Dark obsidian background
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: rgb(0.05, 0.05, 0.06)
  });

  // Background visual if available
  const shipImg = await embedImageSafe('images/slider-foreign-trade.jpg');
  if (shipImg) {
    page1.drawImage(shipImg, {
      x: 0,
      y: PAGE_HEIGHT - 420,
      width: PAGE_WIDTH,
      height: 420,
      opacity: 0.35
    });
  }

  // Gold accent line
  page1.drawRectangle({
    x: 50,
    y: PAGE_HEIGHT - 450,
    width: 80,
    height: 4,
    color: rgb(0.83, 0.70, 0.50)
  });

  page1.drawText('MAKEMATTRESS', {
    x: 50,
    y: PAGE_HEIGHT - 490,
    size: 34,
    font: fontBold,
    color: rgb(1, 1, 1)
  });

  page1.drawText('2026 OFFICIAL B2B EXPORT CATALOG', {
    x: 50,
    y: PAGE_HEIGHT - 520,
    size: 16,
    font: fontBold,
    color: rgb(0.83, 0.70, 0.50)
  });

  page1.drawText('All-In-One Mattress Components & Consolidated Container Logistics', {
    x: 50,
    y: PAGE_HEIGHT - 545,
    size: 12,
    font: fontRegular,
    color: rgb(0.85, 0.85, 0.85)
  });

  page1.drawText('Eliminating Minimum Order Quantity (MOQ) Barriers for Bedding Manufacturers Worldwide', {
    x: 50,
    y: PAGE_HEIGHT - 565,
    size: 10,
    font: fontOblique,
    color: rgb(0.65, 0.65, 0.65)
  });

  // Feature boxes on cover
  const boxY = 160;
  page1.drawRectangle({
    x: 50,
    y: boxY,
    width: PAGE_WIDTH - 100,
    height: 120,
    color: rgb(0.10, 0.10, 0.13)
  });

  page1.drawText('CORE ADVANTAGES:', {
    x: 70,
    y: boxY + 95,
    size: 11,
    font: fontBold,
    color: rgb(0.83, 0.70, 0.50)
  });
  page1.drawText('• ALL IN ONE HAND: 10+ component categories consolidated into a single mixed container.', {
    x: 70,
    y: boxY + 75,
    size: 9,
    font: fontRegular,
    color: rgb(0.9, 0.9, 0.9)
  });
  page1.drawText('• ZERO MOQ BARRIERS: Order exact production amounts per SKU without heavy factory minimums.', {
    x: 70,
    y: boxY + 55,
    size: 9,
    font: fontRegular,
    color: rgb(0.9, 0.9, 0.9)
  });
  page1.drawText('• IN-HOUSE QA DEPARTMENT: 10+ years pedigree with certified pre-shipment batch testing.', {
    x: 70,
    y: boxY + 35,
    size: 9,
    font: fontRegular,
    color: rgb(0.9, 0.9, 0.9)
  });
  page1.drawText('• DIRECT EXPORT: Kayseri manufacturing capital to over 35 countries across 4 continents.', {
    x: 70,
    y: boxY + 15,
    size: 9,
    font: fontRegular,
    color: rgb(0.9, 0.9, 0.9)
  });

  page1.drawText('KAYSERI / TURKIYE  •  EXPORT HOTLINE: +90 352 311 4619', {
    x: 50,
    y: 70,
    size: 10,
    font: fontBold,
    color: rgb(0.7, 0.7, 0.7)
  });

  // =========================================================================
  // PAGE 2: THE MAKEMATTRESS PEDIGREE & MIXED CONTAINER PHILOSOPHY
  // =========================================================================
  const page2 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page2, 2);

  page2.drawText('THE MAKEMATTRESS CONSOLIDATION PHILOSOPHY', {
    x: 40,
    y: PAGE_HEIGHT - 70,
    size: 18,
    font: fontBold,
    color: rgb(0.12, 0.12, 0.15)
  });

  page2.drawText('Why Fragmented Procurement is Costing Your Factory Thousands', {
    x: 40,
    y: PAGE_HEIGHT - 90,
    size: 11,
    font: fontRegular,
    color: rgb(0.55, 0.45, 0.30)
  });

  const introText = [
    'In conventional mattress production, a manufacturer must coordinate with 10 to 15 different factories:',
    'tape weavers, film extruders, chemical formulators, needle-punching mills, spring fabricators, and label printers.',
    'Each supplier demands large container Minimum Order Quantities (MOQs), binding working capital for months.',
    '',
    'MakeMattress was founded in Kayseri, Turkey\'s industrial epicenter for furniture and bedding, to solve this.',
    'We act as your unified B2B sourcing partner, bundling all essential raw materials and hardware into',
    'single mixed-load 20ft or 40ft HQ containers with transparent, unified invoicing and single-point customs dispatch.'
  ];

  let currentY = PAGE_HEIGHT - 125;
  for (const line of introText) {
    page2.drawText(line, {
      x: 40,
      y: currentY,
      size: 9.5,
      font: fontRegular,
      color: rgb(0.2, 0.2, 0.2)
    });
    currentY -= 15;
  }

  // 4 Feature Cards on Page 2
  const cardData = [
    { title: '1. ALL IN ONE HAND', desc: 'Single supplier, single invoice, unified customs clearance. No more managing 15 separate foreign vendors.' },
    { title: '2. ZERO MOQ BARRIER', desc: 'Mix 10+ different products in a single container. Order exact production requirements per component.' },
    { title: '3. IN-HOUSE QC LAB', desc: '10+ years export pedigree with pre-shipment tensile testing, adhesive viscosity checks, and photo reporting.' },
    { title: '4. DIRECT PORT EXPORT', desc: 'Door-to-port intermodal freight from central Anatolia to Europe, Americas, Middle East, and Africa.' }
  ];

  let cardY = currentY - 20;
  for (const c of cardData) {
    page2.drawRectangle({
      x: 40,
      y: cardY - 55,
      width: PAGE_WIDTH - 80,
      height: 50,
      color: rgb(0.97, 0.96, 0.94),
      borderColor: rgb(0.85, 0.82, 0.77),
      borderWidth: 1
    });

    page2.drawText(c.title, {
      x: 55,
      y: cardY - 25,
      size: 11,
      font: fontBold,
      color: rgb(0.60, 0.48, 0.30)
    });

    page2.drawText(c.desc, {
      x: 55,
      y: cardY - 42,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.25, 0.25)
    });

    cardY -= 65;
  }

  // =========================================================================
  // PAGES 3 to 8: PRODUCT CATEGORIES & DETAILED SPECS
  // =========================================================================
  const productSections = [
    {
      pageTitle: 'TAPES, BINDING RIBBONS & PACKAGING FILMS',
      items: [
        {
          name: 'Mattress Tape & Binding Ribbon',
          cat: 'Tapes & Accessories',
          specs: [
            'Material: 100% High-Tenacity Polyester (PES)',
            'Standard Widths: 28mm, 35mm, 38mm, 42mm',
            'Roll Length: 150m continuous rolls on heavy cores',
            'Weaving Types: Jacquard, Herringbone, Plain Ribbed',
            'Customization: Brand name & custom color weaving'
          ],
          img: 'images/mattress-tape-color.jpg'
        },
        {
          name: 'PE Packaging Films & Shrink Bags',
          cat: 'Packaging Materials',
          specs: [
            'Material: 100% Virgin LDPE / LLDPE multi-layer co-extrusion',
            'Thickness Range: 40 to 180 microns (heavy gauge)',
            'Formats: Centerfolded film, gusseted tubing, flat sheets',
            'UV & Anti-Static: High clarity with slip additives',
            'Roll Width: Up to 2600mm for compression roll-packing'
          ],
          img: 'images/pe-film-color.jpg'
        }
      ]
    },
    {
      pageTitle: 'FELT PADS, NONWOVEN TEXTILES & FOAM CHEMICALS',
      items: [
        {
          name: 'Thermobonded Hardened Felts',
          cat: 'Felts & Fibers',
          specs: [
            'Composition: Recycled cotton, synthetic fibers, thermobond resin',
            'Weight Options: 600 gsm up to 1500 gsm hard pad',
            'Standard Sizes: 90x190cm, 140x200cm, 160x200cm, 180x200cm',
            'Roll or Sheet: Supplied in flat sheets or continuous rolls',
            'Function: Pocket spring isolator and firmness reinforcement'
          ],
          img: 'images/felt-color.jpg'
        },
        {
          name: 'Polyurethane Chemicals (Polyol & TDI)',
          cat: 'Raw Materials & Chemicals',
          specs: [
            'Products: Polyether Polyols, Toluene Diisocyanate (TDI 80/20)',
            'Packaging: 210 kg steel drums or 1000 kg IBC containers',
            'Application: Slabstock conventional and high-resilience foam',
            'Quality Control: Verified hydroxyl value and moisture content'
          ],
          img: 'images/pu-chemicals-color.jpg'
        }
      ]
    },
    {
      pageTitle: 'HOTMELT ADHESIVES & ASSEMBLED MATTRESS COVERS',
      items: [
        {
          name: 'Industrial Hotmelt Adhesives',
          cat: 'Adhesives & Glues',
          specs: [
            'Chemistry: EVA, Polyolefin and PSA Hotmelts',
            'Viscosity: 2,500 - 6,000 mPa.s at 160°C application temp',
            'Open Time: Medium to Long open time for line positioning',
            'Packaging: 20 kg silicone-lined export boxes',
            'Eco-Standard: Odorless, zero solvents, non-toxic'
          ],
          img: 'images/hotmelts-g1.png'
        },
        {
          name: 'Zippered Quilted Mattress Covers',
          cat: 'Covers & Quilting',
          specs: [
            'Fabrics: Knitted jacquard, double jersey, bamboo, cooling fibers',
            'Zippers: 3-sided or 4-sided separable heavy-duty nylon zippers',
            'Quilting: 200 gsm - 400 gsm fiberfill quilted backing',
            'Washing: Removable and machine washable at 40°C'
          ],
          img: 'images/zippered-cover-color.jpg'
        }
      ]
    },
    {
      pageTitle: 'STAPLES, HARDWARE & REINFORCED PACKAGING',
      items: [
        {
          name: 'Pneumatic Staples & Hog Rings',
          cat: 'Hardware & Wire',
          specs: [
            'Series: 80 Series, 140 Series, C-Rings, Hog Rings',
            'Wire Finish: High-tensile galvanized steel wire',
            'Box Packaging: 10,000 pcs per box / master export cartons',
            'Tool Compatibility: Compatible with Bostitch, Bea, Fasco'
          ],
          img: 'images/staples-color.jpg'
        },
        {
          name: 'Corrugated Edge Protectors & Boards',
          cat: 'Packaging Protection',
          specs: [
            'Profiles: L-shaped corner guards and U-profile edge board',
            'Wall Thickness: 3mm, 4mm, 5mm multi-ply kraft paper',
            'Lengths: Custom cut from 100mm to 2400mm',
            'Function: Eliminates strap crushing and maritime impact'
          ],
          img: 'images/cardboard-color.jpg'
        }
      ]
    },
    {
      pageTitle: 'LABELS, ACCESSORIES & FINISHED PRODUCTS',
      items: [
        {
          name: 'Woven Damask Labels & Handles',
          cat: 'Labels & Accessories',
          specs: [
            'Weave: High-density damask weaving with satin borders',
            'Cut & Fold: Ultrasonic center-fold or end-fold',
            'Mattress Handles: Embroidered woven handles with brass eyelets',
            'Air Vents: Plastic and brass mesh ventilators'
          ],
          img: 'images/labels-color.jpg'
        },
        {
          name: 'Ergonomic Pillows & Bed Bases',
          cat: 'Finished Products',
          specs: [
            'Fillings: Visco memory foam, shredded latex, micro-gel fiber',
            'Outer Covers: Breathable bamboo and Tencel jacquard',
            'Bed Bases: Knock-down steel frame bases optimized for containers',
            'Shipping: Flat-packed to maximize container cube utilization'
          ],
          img: 'images/pillows-color.jpg'
        }
      ]
    }
  ];

  for (let idx = 0; idx < productSections.length; idx++) {
    const sec = productSections[idx];
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    addHeaderFooter(page, idx + 3);

    page.drawText(sec.pageTitle, {
      x: 40,
      y: PAGE_HEIGHT - 65,
      size: 15,
      font: fontBold,
      color: rgb(0.12, 0.12, 0.15)
    });

    let itemY = PAGE_HEIGHT - 100;

    for (const item of sec.items) {
      // Box
      page.drawRectangle({
        x: 40,
        y: itemY - 280,
        width: PAGE_WIDTH - 80,
        height: 270,
        color: rgb(0.98, 0.98, 0.97),
        borderColor: rgb(0.88, 0.86, 0.82),
        borderWidth: 1
      });

      // Item image
      const img = await embedImageSafe(item.img);
      if (img) {
        page.drawImage(img, {
          x: 55,
          y: itemY - 265,
          width: 200,
          height: 180
        });
      }

      // Details
      page.drawText(item.name, {
        x: 275,
        y: itemY - 30,
        size: 14,
        font: fontBold,
        color: rgb(0.1, 0.1, 0.12)
      });

      page.drawText(`Category: ${item.cat}`, {
        x: 275,
        y: itemY - 48,
        size: 9.5,
        font: fontBold,
        color: rgb(0.60, 0.48, 0.30)
      });

      page.drawText('Technical Specifications:', {
        x: 275,
        y: itemY - 70,
        size: 9,
        font: fontBold,
        color: rgb(0.2, 0.2, 0.2)
      });

      let specY = itemY - 90;
      for (const sp of item.specs) {
        page.drawText(`• ${sp}`, {
          x: 275,
          y: specY,
          size: 8.5,
          font: fontRegular,
          color: rgb(0.3, 0.3, 0.3)
        });
        specY -= 16;
      }

      page.drawText('Consolidation: Available in 20ft / 40ft HQ Mixed Containers', {
        x: 275,
        y: specY - 10,
        size: 8.5,
        font: fontOblique,
        color: rgb(0.2, 0.5, 0.3)
      });

      itemY -= 300;
    }
  }

  // =========================================================================
  // PAGE 9: MIXED CONTAINER LOAD SIMULATION GUIDE
  // =========================================================================
  const page9 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page9, 9);

  page9.drawText('MIXED CONTAINER LOAD PLANNING GUIDE', {
    x: 40,
    y: PAGE_HEIGHT - 65,
    size: 16,
    font: fontBold,
    color: rgb(0.12, 0.12, 0.15)
  });

  page9.drawText('How to Maximize Volume (CBM) & Weight (Payload) Efficiency', {
    x: 40,
    y: PAGE_HEIGHT - 85,
    size: 10,
    font: fontRegular,
    color: rgb(0.55, 0.45, 0.30)
  });

  const containerSpecsY = PAGE_HEIGHT - 120;
  // 20ft Box
  page9.drawRectangle({
    x: 40,
    y: containerSpecsY - 100,
    width: (PAGE_WIDTH - 90) / 2,
    height: 95,
    color: rgb(0.97, 0.97, 0.98),
    borderColor: rgb(0.8, 0.8, 0.85),
    borderWidth: 1
  });
  page9.drawText('20 FT STANDARD CONTAINER', {
    x: 55,
    y: containerSpecsY - 25,
    size: 11,
    font: fontBold,
    color: rgb(0.15, 0.25, 0.4)
  });
  page9.drawText('• Internal Volume: ~33.2 CBM', { x: 55, y: containerSpecsY - 45, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
  page9.drawText('• Max Payload: ~21,500 kg', { x: 55, y: containerSpecsY - 60, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
  page9.drawText('• Best For: Heavy rolls (PE Film, Felts, Chemical Drums)', { x: 55, y: containerSpecsY - 75, size: 8, font: fontOblique, color: rgb(0.4, 0.4, 0.4) });

  // 40ft HQ Box
  page9.drawRectangle({
    x: 50 + (PAGE_WIDTH - 90) / 2,
    y: containerSpecsY - 100,
    width: (PAGE_WIDTH - 90) / 2,
    height: 95,
    color: rgb(0.97, 0.97, 0.98),
    borderColor: rgb(0.8, 0.8, 0.85),
    borderWidth: 1
  });
  page9.drawText('40 FT HIGH CUBE CONTAINER', {
    x: 65 + (PAGE_WIDTH - 90) / 2,
    y: containerSpecsY - 25,
    size: 11,
    font: fontBold,
    color: rgb(0.15, 0.25, 0.4)
  });
  page9.drawText('• Internal Volume: ~76.2 CBM', { x: 65 + (PAGE_WIDTH - 90) / 2, y: containerSpecsY - 45, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
  page9.drawText('• Max Payload: ~26,000 kg', { x: 65 + (PAGE_WIDTH - 90) / 2, y: containerSpecsY - 60, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
  page9.drawText('• Best For: High volume items (Tapes, Covers, Pillows)', { x: 65 + (PAGE_WIDTH - 90) / 2, y: containerSpecsY - 75, size: 8, font: fontOblique, color: rgb(0.4, 0.4, 0.4) });

  // Sample Container Mix Table
  const tableY = containerSpecsY - 130;
  page9.drawText('SAMPLE 40FT HQ MIXED CONTAINER MANIFEST:', {
    x: 40,
    y: tableY,
    size: 11,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1)
  });

  const manifest = [
    { item: 'Mattress Jacquard Tapes', qty: '400 rolls (60,000m)', vol: '12 CBM', wt: '1,800 kg' },
    { item: 'PE Heavy Packaging Film', qty: '80 rolls', vol: '18 CBM', wt: '6,400 kg' },
    { item: 'Thermobonded Hardened Felts', qty: '3,000 sheets', vol: '22 CBM', wt: '7,500 kg' },
    { item: 'EVA / PSA Hotmelt Adhesives', qty: '120 boxes', vol: '6 CBM', wt: '2,400 kg' },
    { item: 'Pneumatic Staples & Hog Rings', qty: '150 master boxes', vol: '4 CBM', wt: '1,950 kg' },
    { item: 'Zippered Mattress Covers', qty: '800 pieces', vol: '11 CBM', wt: '1,200 kg' },
    { item: 'Cardboard Edge Protectors', qty: '2,500 pieces', vol: '3 CBM', wt: '900 kg' }
  ];

  let rowY = tableY - 30;
  // Header
  page9.drawRectangle({ x: 40, y: rowY, width: PAGE_WIDTH - 80, height: 20, color: rgb(0.90, 0.88, 0.85) });
  page9.drawText('Component Description', { x: 50, y: rowY + 5, size: 9, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
  page9.drawText('Sample Quantity', { x: 250, y: rowY + 5, size: 9, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
  page9.drawText('Volume', { x: 400, y: rowY + 5, size: 9, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
  page9.drawText('Weight', { x: 480, y: rowY + 5, size: 9, font: fontBold, color: rgb(0.1, 0.1, 0.1) });

  rowY -= 20;
  for (const m of manifest) {
    page9.drawRectangle({ x: 40, y: rowY, width: PAGE_WIDTH - 80, height: 20, color: rgb(0.98, 0.98, 0.98) });
    page9.drawText(m.item, { x: 50, y: rowY + 5, size: 8.5, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
    page9.drawText(m.qty, { x: 250, y: rowY + 5, size: 8.5, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
    page9.drawText(m.vol, { x: 400, y: rowY + 5, size: 8.5, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
    page9.drawText(m.wt, { x: 480, y: rowY + 5, size: 8.5, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
    rowY -= 20;
  }

  // Total
  page9.drawRectangle({ x: 40, y: rowY, width: PAGE_WIDTH - 80, height: 22, color: rgb(0.15, 0.15, 0.18) });
  page9.drawText('TOTAL CONSOLIDATED 40FT HQ LOAD:', { x: 50, y: rowY + 6, size: 9, font: fontBold, color: rgb(1, 1, 1) });
  page9.drawText('76.0 CBM (99% cube)', { x: 380, y: rowY + 6, size: 9, font: fontBold, color: rgb(0.83, 0.70, 0.50) });
  page9.drawText('22,150 kg', { x: 480, y: rowY + 6, size: 9, font: fontBold, color: rgb(0.83, 0.70, 0.50) });

  // =========================================================================
  // PAGE 10: BACK COVER & INQUIRY CONTACT
  // =========================================================================
  const page10 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page10.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: rgb(0.06, 0.06, 0.08)
  });

  page10.drawText('MAKEMATTRESS', {
    x: 50,
    y: PAGE_HEIGHT - 120,
    size: 28,
    font: fontBold,
    color: rgb(1, 1, 1)
  });

  page10.drawText('YOUR SINGLE-SOURCE PARTNER IN BEDDING MANUFACTURING', {
    x: 50,
    y: PAGE_HEIGHT - 145,
    size: 11,
    font: fontBold,
    color: rgb(0.83, 0.70, 0.50)
  });

  const contactY = PAGE_HEIGHT - 220;
  page10.drawText('HEAD OFFICE & EXPORT LOGISTICS HUB:', {
    x: 50,
    y: contactY,
    size: 11,
    font: fontBold,
    color: rgb(0.9, 0.9, 0.9)
  });
  page10.drawText('ANBAR MAH. 54.CAD 17/A MELIKGAZI, KAYSERI / TURKIYE', {
    x: 50,
    y: contactY - 20,
    size: 10,
    font: fontRegular,
    color: rgb(0.7, 0.7, 0.7)
  });

  page10.drawText('DIRECT CONTACT & RFQ DESK:', {
    x: 50,
    y: contactY - 60,
    size: 11,
    font: fontBold,
    color: rgb(0.9, 0.9, 0.9)
  });
  page10.drawText('Telephone & WhatsApp: +90 352 311 4619', {
    x: 50,
    y: contactY - 80,
    size: 10,
    font: fontRegular,
    color: rgb(0.7, 0.7, 0.7)
  });
  page10.drawText('Sales & Inquiries: info@makemattress.com', {
    x: 50,
    y: contactY - 100,
    size: 10,
    font: fontRegular,
    color: rgb(0.7, 0.7, 0.7)
  });
  page10.drawText('Official Website: https://makemattress.com', {
    x: 50,
    y: contactY - 120,
    size: 10,
    font: fontRegular,
    color: rgb(0.83, 0.70, 0.50)
  });

  page10.drawRectangle({
    x: 50,
    y: contactY - 240,
    width: PAGE_WIDTH - 100,
    height: 80,
    color: rgb(0.12, 0.12, 0.16)
  });
  page10.drawText('HOW TO ORDER YOUR MIXED CONTAINER:', {
    x: 70,
    y: contactY - 180,
    size: 10,
    font: fontBold,
    color: rgb(0.83, 0.70, 0.50)
  });
  page10.drawText('1. Review this catalog and select desired component SKUs.', {
    x: 70,
    y: contactY - 200,
    size: 9,
    font: fontRegular,
    color: rgb(0.8, 0.8, 0.8)
  });
  page10.drawText('2. Send your approximate volumes and destination port to info@makemattress.com.', {
    x: 70,
    y: contactY - 215,
    size: 9,
    font: fontRegular,
    color: rgb(0.8, 0.8, 0.8)
  });
  page10.drawText('3. Receive full CIF container calculation and transparent proforma invoice within 24 hours.', {
    x: 70,
    y: contactY - 230,
    size: 9,
    font: fontRegular,
    color: rgb(0.8, 0.8, 0.8)
  });

  page10.drawText('© 2026 MAKEMATTRESS. ALL RIGHTS RESERVED. EXPORT SPECIFICATIONS SUBJECT TO BATCH CONFIRMATION.', {
    x: 50,
    y: 40,
    size: 7.5,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4)
  });

  const pdfBytes = await pdfDoc.save();
  const outPath = path.resolve(__dirname, '..', 'public', 'catalog', 'makemattress-catalog-2026.pdf');
  fs.writeFileSync(outPath, pdfBytes);
  console.log('Successfully generated authentic MakeMattress B2B Catalog at:', outPath, `(${pdfBytes.length} bytes)`);
}

generateCatalog().catch(err => {
  console.error('Failed to generate catalog:', err);
  process.exit(1);
});
