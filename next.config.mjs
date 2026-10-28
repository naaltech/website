import { cpSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// pdf.js işçisi ve standart fontlar public altına kopyalanır.
// Okuyucu PDF adresine gitmez; bu dosyalar yalnızca çizim içindir.
const require = createRequire(import.meta.url)
const root = dirname(fileURLToPath(import.meta.url))
const pdfjsPackage = dirname(require.resolve('pdfjs-dist/package.json'))
const pdfjsPublic = join(root, 'public', 'pdfjs')
mkdirSync(pdfjsPublic, { recursive: true })
cpSync(join(pdfjsPackage, 'legacy', 'build', 'pdf.worker.min.mjs'), join(pdfjsPublic, 'pdf.worker.min.mjs'))
cpSync(join(pdfjsPackage, 'standard_fonts'), join(pdfjsPublic, 'standard_fonts'), { recursive: true })

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
}

export default nextConfig
