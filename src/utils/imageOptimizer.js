/**
 * Client-Side WebP Image Optimizer for MakeMattress Admin Panel
 * 
 * Automatically converts uploaded images (PNG, JPG, HEIC, WebP, etc.)
 * into high-efficiency, retina-ready WebP data URLs directly in the browser
 * using HTML5 Canvas. Prevents localStorage quota overflows and boosts performance.
 */

export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes <= 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Optimizes an image File into a WebP Data URL
 * 
 * @param {File|Blob} file The input image file
 * @param {Object} options Configuration options
 * @param {number} [options.maxWidth=1200] Maximum width in pixels
 * @param {number} [options.maxHeight=1200] Maximum height in pixels
 * @param {number} [options.quality=0.82] Compression quality (0 to 1)
 * @returns {Promise<{
 *   dataUrl: string,
 *   format: string,
 *   originalSize: number,
 *   originalSizeFormatted: string,
 *   optimizedSize: number,
 *   optimizedSizeFormatted: string,
 *   savingsPercent: number,
 *   width: number,
 *   height: number
 * }>}
 */
export async function optimizeImageToWebP(file, options = {}) {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.82
  } = options;

  if (!file) {
    throw new Error('Dosya bulunamadı.');
  }

  if (!file.type || !file.type.startsWith('image/')) {
    throw new Error('Lütfen geçerli bir görsel dosyası seçin (JPG, PNG, WebP vb.).');
  }

  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      try {
        let width = img.width;
        let height = img.height;

        // Calculate proportional scale within maxWidth & maxHeight
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas 2D context alınamadı.');
        }

        // Enable high-quality anti-aliasing / smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Attempt WebP export
        let format = 'image/webp';
        let dataUrl = canvas.toDataURL(format, quality);

        // Check if browser actually supported WebP (fallback to JPEG if not)
        if (!dataUrl.startsWith('data:image/webp')) {
          format = 'image/jpeg';
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Calculate accurate byte size of the base64 string
        const base64Data = dataUrl.split(',')[1] || '';
        const optimizedSize = Math.round((base64Data.length * 3) / 4);

        const savings = originalSize > 0 
          ? Math.max(0, Math.round(((originalSize - optimizedSize) / originalSize) * 100))
          : 0;

        resolve({
          dataUrl,
          format: format.replace('image/', ''),
          originalSize,
          originalSizeFormatted: formatBytes(originalSize),
          optimizedSize,
          optimizedSizeFormatted: formatBytes(optimizedSize),
          savingsPercent: savings,
          width,
          height
        });
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Görsel yüklenirken veya işlenirken bir hata oluştu.'));
    };

    img.src = objectUrl;
  });
}
