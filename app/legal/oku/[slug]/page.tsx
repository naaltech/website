import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import { PdfReader } from "@/components/pdf-reader"
import { documentFileUrl, getLegalDocument, legalDocuments } from "@/lib/legal-documents"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return legalDocuments.map((document) => ({ slug: document.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const document = getLegalDocument(slug)
  if (!document) return { title: "Belge" }

  return {
    title: document.title,
    description: document.description,
  }
}

export default async function LegalDocumentPage({ params }: Props) {
  const { slug } = await params
  const document = getLegalDocument(slug)
  if (!document) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/legal" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            ← Yasal belgeler
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">{document.title}</h1>
          <p className="mt-2 mb-6 text-gray-600">{document.description}</p>
          <PdfReader fileUrl={documentFileUrl(document.filename)} filename={document.filename} />
        </div>
      </section>
      <Footer />
    </div>
  )
}
