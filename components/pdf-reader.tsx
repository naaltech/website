"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist"
import { Minus, Plus, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

const MIN_ZOOM = 0.75
const MAX_ZOOM = 2
const ZOOM_STEP = 0.25

type ReaderStatus = "loading" | "ready" | "missing" | "error"

function imagesFromCanvases(host: HTMLElement | null) {
  const canvases = host?.querySelectorAll("canvas")
  if (!canvases?.length) return null

  try {
    const images: HTMLImageElement[] = []
    for (const canvas of canvases) {
      if (canvas.width < 1 || canvas.height < 1) continue
      const image = document.createElement("img")
      image.alt = ""
      image.width = canvas.clientWidth || canvas.width
      image.height = canvas.clientHeight || canvas.height
      image.style.display = "block"
      image.style.width = "100%"
      image.style.height = "auto"
      image.src = canvas.toDataURL("image/png")
      images.push(image)
    }
    return images.length > 0 ? images : null
  } catch {
    return null
  }
}

function mountPrintRoot(images: HTMLImageElement[]) {
  document.getElementById("pdf-print-root")?.remove()
  const root = document.createElement("div")
  root.id = "pdf-print-root"
  root.setAttribute("aria-hidden", "true")
  for (const image of images) root.appendChild(image)
  document.body.appendChild(root)
  return root
}

// Chrome takes the print snapshot before `beforeprint` mutations and before
// newly created images have decoded, so the first preview is a blank page.
function waitForPrintSnapshot(root: HTMLElement) {
  const pending = [...root.querySelectorAll("img")].map((image) => image.decode().catch(() => undefined))
  return Promise.all(pending).then(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              void root.offsetHeight
              resolve()
            }, 100)
          })
        })
      }),
  )
}

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
  const [preparingPrint, setPreparingPrint] = useState(false)
  const printingRef = useRef(false)
  const printGeneration = useRef(0)

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
      try {
        if (pdf) void pdf.destroy().catch(() => undefined)
        else void loadingTask?.destroy().catch(() => undefined)
      } catch {
        // Navigating away can destroy the worker while a page is still drawing.
      }
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

          if (cancelled || run !== generation || !host.isConnected) return

          const wrap = document.createElement("div")
          wrap.className = "flex justify-center"
          wrap.appendChild(canvas)
          host.appendChild(wrap)

          const task = page.render({
            canvas,
            viewport,
            transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0],
          })
          task.promise.catch(() => undefined)
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
      for (const task of tasks) {
        try {
          task.cancel()
        } catch {
          // The render may already have finished.
        }
      }
      try {
        host.replaceChildren()
      } catch {
        // The page is already gone.
      }
    }
  }, [status, zoom])

  const printDocument = useCallback(async () => {
    if (printingRef.current) return
    const images = imagesFromCanvases(hostRef.current)
    if (!images) return

    const generation = ++printGeneration.current
    printingRef.current = true
    setPreparingPrint(true)
    try {
      const root = mountPrintRoot(images)
      await waitForPrintSnapshot(root)
      if (generation !== printGeneration.current || !root.isConnected) {
        if (generation === printGeneration.current) {
          printingRef.current = false
          setPreparingPrint(false)
        }
        return
      }
      window.print()
    } catch {
      if (generation !== printGeneration.current) return
      document.getElementById("pdf-print-root")?.remove()
      printingRef.current = false
      setPreparingPrint(false)
    }
  }, [])

  useEffect(() => {
    if (status !== "ready") return

    const onBeforePrint = () => {
      if (document.getElementById("pdf-print-root")) return
      const images = imagesFromCanvases(hostRef.current)
      if (!images) return
      mountPrintRoot(images)
    }

    const onAfterPrint = () => {
      document.getElementById("pdf-print-root")?.remove()
      printingRef.current = false
      setPreparingPrint(false)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "KeyP" || event.altKey || event.shiftKey) return
      if (!event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      void printDocument()
    }

    window.addEventListener("beforeprint", onBeforePrint)
    window.addEventListener("afterprint", onAfterPrint)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      printGeneration.current += 1
      printingRef.current = false
      window.removeEventListener("beforeprint", onBeforePrint)
      window.removeEventListener("afterprint", onAfterPrint)
      window.removeEventListener("keydown", onKeyDown)
      document.getElementById("pdf-print-root")?.remove()
    }
  }, [status, printDocument])

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
          <Button
            type="button"
            variant="outline"
            disabled={status !== "ready" || preparingPrint}
            onClick={() => void printDocument()}
          >
            <Printer />
            {preparingPrint ? "Hazırlanıyor..." : "Yazdır"}
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
        #pdf-print-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 210mm;
          margin: 0;
          padding: 0;
          opacity: 0;
          pointer-events: none;
          z-index: -1;
        }
        @media print {
          body:has(#pdf-print-root) > *:not(#pdf-print-root) { display: none !important; }
          #pdf-print-root {
            display: block !important;
            position: static !important;
            width: auto !important;
            opacity: 1 !important;
            z-index: auto !important;
            margin: 0;
            padding: 0;
          }
          #pdf-print-root img {
            display: block !important;
            width: 100% !important;
            height: auto !important;
            break-after: page;
            page-break-after: always;
          }
          #pdf-print-root img:last-child {
            break-after: auto;
            page-break-after: auto;
          }
        }
        @page { margin: 0; }
      `}</style>
    </div>
  )
}
