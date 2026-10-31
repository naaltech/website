export type LegalDocument = {
  slug: string
  title: string
  description: string
  filename: string
}

// Dosyalar public/belgeler içine, filename ile aynı adla konur.
// Sayfalar bu dosyaya bağlanmaz; okuyucu içeriği fetch ile çizer.
export const legalDocuments: LegalDocument[] = [
  {
    slug: "kulup-tuzugu",
    title: "Kulüp Tüzüğü",
    description: "Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü resmi tüzüğü",
    filename: "kulup-tuzugu.pdf",
  },
  {
    slug: "verification-letter",
    title: "Verification Letter",
    description: "Hack Club mali sponsorluk doğrulama mektubu",
    filename: "verification-letter.pdf",
  },
  {
    slug: "fiscal-sponsorship",
    title: "Fiscal Sponsorship Confirmation",
    description: "Hack Club mali sponsorluk onay belgesi",
    filename: "fiscal-sponsorship-confirmation.pdf",
  },
  {
    slug: "certificate-of-status",
    title: "Certificate of Status",
    description: "Hack Club kuruluş durum belgesi",
    filename: "certificate-of-status.pdf",
  },
  {
    slug: "irs-501c3",
    title: "IRS 501(c)(3) Certificate",
    description: "The Hack Foundation vergi muafiyeti belgesi",
    filename: "irs-501c3-certificate.pdf",
  },
  {
    slug: "hack-club-w9",
    title: "Hack Club W-9 Form",
    description: "Hack Club W-9 formu",
    filename: "hack-club-w9.pdf",
  },
  {
    slug: "hack-foundation-990",
    title: "Hack Foundation 990",
    description: "The Hack Foundation Form 990",
    filename: "hack-foundation-990.pdf",
  },
  {
    slug: "davranis-kurallari",
    title: "Davranış Kuralları",
    description: "Kulüp üyeleri için davranış kuralları",
    filename: "davranis-kurallari.pdf",
  },
  {
    slug: "uyelik-basvuru-formu",
    title: "Üyelik Başvuru Formu",
    description: "Fiziksel üyelik başvuru formu",
    filename: "uyelik-basvuru-formu.pdf",
  },
]

export function getLegalDocument(slug: string) {
  return legalDocuments.find((document) => document.slug === slug)
}

export function documentHref(slug: string) {
  const document = getLegalDocument(slug)
  if (!document) {
    throw new Error(`Unknown legal document: ${slug}`)
  }
  return `/legal/oku/${document.slug}/`
}

export function documentFileUrl(filename: string) {
  return `/belgeler/${filename}`
}
