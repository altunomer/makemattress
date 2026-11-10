import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function pdfUploadPlugin() {
  return {
    name: 'pdf-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-catalog-pdf', (req, res, next) => {
        if (req.method === 'POST') {
          const chunks = []
          req.on('data', chunk => chunks.push(chunk))
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks)
              if (buffer.length === 0) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Boş dosya gönderildi' }))
                return
              }

              // Target directory in public/catalog
              const publicCatalogDir = path.resolve(__dirname, 'public/catalog')
              if (!fs.existsSync(publicCatalogDir)) {
                fs.mkdirSync(publicCatalogDir, { recursive: true })
              }

              const targetFile = path.join(publicCatalogDir, 'makemattress-catalog-2026.pdf')
              fs.writeFileSync(targetFile, buffer)

              // Also update dist/catalog if dist exists
              const distCatalogDir = path.resolve(__dirname, 'dist/catalog')
              if (fs.existsSync(distCatalogDir)) {
                fs.writeFileSync(path.join(distCatalogDir, 'makemattress-catalog-2026.pdf'), buffer)
              }

              const timestamp = Date.now()
              console.log(`[MakeMattress] Yeni katalog PDF başarıyla diske kaydedildi: ${targetFile} (${(buffer.length / (1024 * 1024)).toFixed(2)} MB)`)

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({
                success: true,
                size: buffer.length,
                path: `/catalog/makemattress-catalog-2026.pdf?v=${timestamp}`,
                timestamp
              }))
            } catch (err) {
              console.error('[MakeMattress] PDF kaydetme hatası:', err)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message }))
            }
          })
        } else {
          next()
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    pdfUploadPlugin(),
  ],
  server: {
    port: 3005,
    host: true,
  },
})
