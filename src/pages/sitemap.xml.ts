import type { APIRoute } from "astro"
import { legalDocuments } from "@/lib/legal-documents"

const pages = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/team/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/legal/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/join-us/", changeFrequency: "weekly", priority: 0.9 },
  ...legalDocuments.map((document) => ({
    path: `/legal/oku/${document.slug}/`,
    changeFrequency: "yearly",
    priority: 0.4,
  })),
]

export const GET: APIRoute = ({ site }) => {
  const lastModified = new Date().toISOString()
  const urls = pages.map(
    (page) =>
      `<url><loc>${new URL(page.path, site)}</loc><lastmod>${lastModified}</lastmod><changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
  )

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } }
  )
}
