/**
 * Persistent PDF Catalog Storage for MakeMattress
 * 
 * Solves the 5MB browser localStorage ceiling by using:
 * 1. Local Vite dev server direct file write (overwriting public/catalog/makemattress-catalog-2026.pdf on disk).
 * 2. HTML5 IndexedDB storage engine for persistent client-side Blobs without size limits.
 * 3. Timestamped cache-busting to prevent aggressive browser/CDN 304 caching.
 */

const DB_NAME = 'makemattress_db';
const DB_VERSION = 1;
const STORE_NAME = 'catalogs';
const CATALOG_KEY = 'active_catalog_pdf';
const META_KEY = 'makemattress_catalog_meta';
const DEFAULT_CATALOG_PATH = '/catalog/makemattress-catalog-2026.pdf';

/**
 * Open or initialize IndexedDB
 */
function openDb() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB desteklenmiyor.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Upload PDF to local Vite dev server to overwrite the physical file on disk:
 * public/catalog/makemattress-catalog-2026.pdf
 */
export async function uploadPdfToLocalServer(file) {
  try {
    const res = await fetch('/api/upload-catalog-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/pdf',
        'X-Filename': encodeURIComponent(file.name)
      },
      body: file
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, serverSaved: true, ...data };
    }
  } catch (err) {
    // Ignore if running on static production host without /api endpoint
  }
  return { success: false, serverSaved: false };
}

/**
 * Save PDF Blob/File into browser IndexedDB permanently (No 5MB limit!)
 */
export async function savePdfToIndexedDB(fileOrBlob, filename = 'makemattress-catalog-2026.pdf') {
  const db = await openDb();
  const timestamp = Date.now();
  const size = fileOrBlob.size;

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const record = {
      blob: fileOrBlob,
      filename,
      size,
      updatedAt: timestamp
    };

    const putRequest = store.put(record, CATALOG_KEY);

    putRequest.onsuccess = () => {
      // Store lightweight metadata in localStorage
      try {
        localStorage.setItem(META_KEY, JSON.stringify({
          filename,
          size,
          updatedAt: timestamp,
          hasIndexedDbRecord: true
        }));
      } catch (e) {}

      resolve({
        success: true,
        filename,
        size,
        updatedAt: timestamp
      });
    };

    putRequest.onerror = () => reject(putRequest.error);
  });
}

/**
 * Retrieve persistent PDF from IndexedDB as a Blob Object URL
 */
export async function getPdfFromIndexedDB() {
  try {
    const db = await openDb();

    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getRequest = store.get(CATALOG_KEY);

      getRequest.onsuccess = () => {
        const record = getRequest.result;
        if (record && record.blob) {
          const objectUrl = URL.createObjectURL(record.blob);
          resolve({
            url: objectUrl,
            filename: record.filename,
            size: record.size,
            updatedAt: record.updatedAt,
            isCustomBlob: true
          });
        } else {
          resolve(null);
        }
      };

      getRequest.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

/**
 * Remove stored PDF from IndexedDB and reset to default
 */
export async function clearPdfFromIndexedDB() {
  try {
    const db = await openDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(CATALOG_KEY);

    try {
      localStorage.removeItem(META_KEY);
      localStorage.removeItem('makemattress_catalog_pdf');
    } catch (e) {}

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get active catalog metadata (stored in localStorage)
 */
export function getCatalogMetadata() {
  try {
    const meta = localStorage.getItem(META_KEY);
    if (meta) return JSON.parse(meta);
  } catch (e) {}
  return null;
}

export { DEFAULT_CATALOG_PATH };
