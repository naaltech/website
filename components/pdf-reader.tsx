"use client"

import { useEffect, useRef, useState } from "react"
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist"
import { Minus, Plus, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

const MIN_ZOOM = 0.75
const MAX_ZOOM = 2
const ZOOM_STEP = 0.25

type ReaderStatus = "loading" | "ready" | "missing" | "error"

export function PdfReader({
  fileUrl,
  filename,
}: {
  fileUrl: string
  filename: string
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const pdfRef = useRef<PDFDocumentProxy | null>(null)
  const [status, setStatus] = useState<ReaderStatus>("loading")
  const [pageCount, setPageCount] = useState(0)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    let cancelled = false
    let loadingTask: { destroy: () => Promise<void> } | null = null

    async function load() {
      setStatus("loading")
      setPageCount(0)
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs")
        if (cancelled) return

        pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs"
        const response = await fetch(fileUrl)
        if (cancelled) return
        if (response.status === 404) {
          setStatus("missing")
          return
        }
        if (!response.ok) {
          setStatus("error")
          return
        }

        const data = new Uint8Array(await response.arrayBuffer())
        if (cancelled) return
        const header = new TextDecoder().decode(data.slice(0, 5))
        if (header !== "%PDF-") {
          setStatus("missing")
          return
        }

        loadingTask = pdfjs.getDocument({
          data,
          isEvalSupported: false,
          standardFontDataUrl: "/pdfjs/standard_fonts/",
        })
        const pdf = await loadingTask.promise
        loadingTask = null
        if (cancelled) {
          await pdf.destroy().catch(() => undefined)
          return
        }

        pdfRef.current = pdf
        setPageCount(pdf.numPages)
        setStatus("ready")
      } catch {
        if (!cancelled) setStatus("error")
      }
    }

    void load()

    return () => {
      cancelled = true
      const pdf = pdfRef.current
      pdfRef.current = null
      if (pdf) void pdf.destroy().catch(() => undefined)
      else void loadingTask?.destroy().catch(() => undefined)
    }
  }, [fileUrl])

  useEffect(() => {
    if (status !== "ready") return
    const pdf = pdfRef.current
    const scroller = scrollerRef.current
    const host = hostRef.current
    if (!pdf || !scroller || !host) return

    let cancelled = false
    let generation = 0
    const tasks: RenderTask[] = []
    let frame = 0

    const paint = async () => {
      const run = ++generation
      tasks.forEach((task) => {
        try {
          task.cancel()
        } catch {
          // Finished renders have nothing left to cancel.
        }
      })
      tasks.length = 0
      host.replaceChildren()

      const width = scroller.clientWidth - 32
      if (width < 64) return

      try {
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled || run !== generation) return
          const page = await pdf.getPage(pageNumber)
          if (cancelled || run !== generation) return

          const base = page.getViewport({ scale: 1 })
          const viewport = page.getViewport({ scale: (width / base.width) * zoom })
          const canvas = document.createElement("canvas")
          const ratio = Math.min(window.devicePixelRatio || 1, 2)
          canvas.width = Math.floor(viewport.width * ratio)
          canvas.height = Math.floor(viewport.height * ratio)
          canvas.style.width = `${Math.floor(viewport.width)}px`
          canvas.style.height = `${Math.floor(viewport.height)}px`
          canvas.className = "pdf-page bg-white shadow-md"

          const wrap = document.createElement("div")
          wrap.className = "flex justify-center"
          wrap.appendChild(canvas)
          host.appendChild(wrap)

          const task = page.render({
            canvas,
            viewport,
            transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0],
          })
          tasks.push(task)
          await task.promise
        }
      } catch (error) {
        const name = error && typeof error === "object" && "name" in error ? String(error.name) : ""
        if (cancelled || run !== generation || name === "RenderingCancelledException") return
        setStatus("error")
      }
    }

    void paint()

    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        void paint()
      })
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelled = true
      generation += 1
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", onResize)
      tasks.forEach((task) => task.cancel())
      host.replaceChildren()
    }
  }, [status, zoom])

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="no-print flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3">
        <p className="text-sm text-gray-600">
          {status === "ready" ? `${pageCount} sayfa` : "PDF okuyucu"}
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Uzaklaştır"
            disabled={status !== "ready" || zoom <= MIN_ZOOM}
            onClick={() => setZoom((value) => Math.max(MIN_ZOOM, Number((value - ZOOM_STEP).toFixed(2))))}
          >
            <Minus />
          </Button>
          <span className="w-12 text-center text-sm text-gray-700">{Math.round(zoom * 100)}%</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Yakınlaştır"
            disabled={status !== "ready" || zoom >= MAX_ZOOM}
            onClick={() => setZoom((value) => Math.min(MAX_ZOOM, Number((value + ZOOM_STEP).toFixed(2))))}
          >
            <Plus />
          </Button>
          <Button type="button" variant="outline" disabled={status !== "ready"} onClick={() => window.print()}>
            <Printer />
            Yazdır
          </Button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="pdf-scroll max-h-[75vh] overflow-auto bg-gray-100 p-4 md:p-6"
      >
        {status === "loading" && (
          <div className="flex h-80 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
              <p className="text-gray-600">Belge açılıyor...</p>
            </div>
          </div>
        )}
        {status === "missing" && (
          <div className="flex h-80 items-center justify-center px-6 text-center">
            <div>
              <p className="font-medium text-gray-900">Bu belge henüz eklenmedi.</p>
              <p className="mt-2 text-sm text-gray-600">
                PDF dosyasını şu adla klasöre koyun:{" "}
                <span className="font-mono">public/belgeler/{filename}</span>
              </p>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="flex h-80 items-center justify-center px-6 text-center">
            <p className="text-gray-600">Belge okunamadı. Dosyanın geçerli bir PDF olduğundan emin olun.</p>
          </div>
        )}
        <div ref={hostRef} className="flex flex-col gap-4" />
      </div>

      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          .pdf-scroll { max-height: none !important; overflow: visible !important; background: white !important; }
          .pdf-page { box-shadow: none !important; break-after: page; }
        }
      `}</style>
    </div>
  )
}
