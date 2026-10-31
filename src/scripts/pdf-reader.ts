import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist"

const MIN_ZOOM = 0.75
const MAX_ZOOM = 2
const ZOOM_STEP = 0.25

type ReaderStatus = "loading" | "ready" | "missing" | "error"

function imagesFromCanvases(host: HTMLElement) {
  const canvases = host.querySelectorAll("canvas")
  if (!canvases.length) return null

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

export function initPdfReader(reader: HTMLElement) {
  const fileUrl = reader.dataset.fileUrl
  const scroller = reader.querySelector<HTMLElement>("[data-scroller]")
  const host = reader.querySelector<HTMLElement>("[data-host]")
  const pageCount = reader.querySelector<HTMLElement>("[data-page-count]")
  const zoomLabel = reader.querySelector<HTMLElement>("[data-zoom-label]")
  const zoomOut = reader.querySelector<HTMLButtonElement>("[data-zoom-out]")
  const zoomIn = reader.querySelector<HTMLButtonElement>("[data-zoom-in]")
  const print = reader.querySelector<HTMLButtonElement>("[data-print]")
  const printLabel = reader.querySelector<HTMLElement>("[data-print-label]")
  if (!fileUrl || !scroller || !host || !pageCount || !zoomLabel || !zoomOut || !zoomIn || !print || !printLabel) return

  let pdf: PDFDocumentProxy | null = null
  let status: ReaderStatus = "loading"
  let zoom = 1
  let preparingPrint = false
  let generation = 0
  let frame = 0
  const tasks: RenderTask[] = []

  const updateControls = () => {
    const ready = status === "ready"
    zoomOut.disabled = !ready || zoom <= MIN_ZOOM
    zoomIn.disabled = !ready || zoom >= MAX_ZOOM
    print.disabled = !ready || preparingPrint
    zoomLabel.textContent = `${Math.round(zoom * 100)}%`
    printLabel.textContent = preparingPrint ? "Hazırlanıyor..." : "Yazdır"
  }

  const setStatus = (next: ReaderStatus) => {
    status = next
    reader.querySelectorAll<HTMLElement>("[data-status]").forEach((panel) => {
      panel.hidden = panel.dataset.status !== next
    })
    updateControls()
  }

  const setPreparingPrint = (value: boolean) => {
    preparingPrint = value
    updateControls()
  }

  const paint = async () => {
    if (!pdf) return
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
        if (run !== generation) return
        const page = await pdf.getPage(pageNumber)
        if (run !== generation) return

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
        task.promise.catch(() => undefined)
        tasks.push(task)
        await task.promise
      }
    } catch (error) {
      const name = error && typeof error === "object" && "name" in error ? String(error.name) : ""
      if (run !== generation || name === "RenderingCancelledException") return
      setStatus("error")
    }
  }

  const changeZoom = (value: number) => {
    zoom = value
    updateControls()
    void paint()
  }

  const printDocument = async () => {
    if (preparingPrint) return
    const images = imagesFromCanvases(host)
    if (!images) return

    setPreparingPrint(true)
    try {
      const root = mountPrintRoot(images)
      await waitForPrintSnapshot(root)
      window.print()
    } catch {
      document.getElementById("pdf-print-root")?.remove()
      setPreparingPrint(false)
    }
  }

  const load = async () => {
    try {
      const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs")

      pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs"
      const response = await fetch(fileUrl)
      if (response.status === 404) {
        setStatus("missing")
        return
      }
      if (!response.ok) {
        setStatus("error")
        return
      }

      const data = new Uint8Array(await response.arrayBuffer())
      const header = new TextDecoder().decode(data.slice(0, 5))
      if (header !== "%PDF-") {
        setStatus("missing")
        return
      }

      pdf = await pdfjs.getDocument({
        data,
        standardFontDataUrl: "/pdfjs/standard_fonts/",
      }).promise

      pageCount.textContent = `${pdf.numPages} sayfa`
      setStatus("ready")
      void paint()
    } catch {
      setStatus("error")
    }
  }

  zoomOut.addEventListener("click", () => {
    changeZoom(Math.max(MIN_ZOOM, Number((zoom - ZOOM_STEP).toFixed(2))))
  })
  zoomIn.addEventListener("click", () => {
    changeZoom(Math.min(MAX_ZOOM, Number((zoom + ZOOM_STEP).toFixed(2))))
  })
  print.addEventListener("click", () => void printDocument())

  window.addEventListener("resize", () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      void paint()
    })
  })

  window.addEventListener("beforeprint", () => {
    if (status !== "ready" || document.getElementById("pdf-print-root")) return
    const images = imagesFromCanvases(host)
    if (images) mountPrintRoot(images)
  })

  window.addEventListener("afterprint", () => {
    document.getElementById("pdf-print-root")?.remove()
    setPreparingPrint(false)
  })

  window.addEventListener("keydown", (event) => {
    if (status !== "ready" || event.code !== "KeyP" || event.altKey || event.shiftKey) return
    if (!event.ctrlKey && !event.metaKey) return
    event.preventDefault()
    void printDocument()
  })

  void load()
}
