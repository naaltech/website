import { cpSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// pdf.js işçisi ve standart fontlar public altına kopyalanır.
// Okuyucu PDF adresine gitmez; bu dosyalar yalnızca çizim içindir.
const require = createRequire(import.meta.url)
const root = dirname(fileURLToPath(import.meta.url))
const pdfjsPackage = dirname(require.resolve('pdfjs-dist/package.json'))
const pdfjsPublic = join(root, 'public', 'pdfjs')
mkdirSync(pdfjsPublic, { recursive: true })
cpSync(join(pdfjsPackage, 'legacy', 'build', 'pdf.worker.min.mjs'), join(pdfjsPublic, 'pdf.worker.min.mjs'))
cpSync(join(pdfjsPackage, 'standard_fonts'), join(pdfjsPublic, 'standard_fonts'), { recursive: true })

export default defineConfig({
  site: 'https://tech.naal.org.tr',
  output: 'static',
  outDir: 'out',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
})
