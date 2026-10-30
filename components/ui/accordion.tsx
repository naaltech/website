"use client"

import * as React from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
  openValue: string | null
  setOpenValue: React.Dispatch<React.SetStateAction<string | null>>
} | null>(null)

const AccordionItemContext = React.createContext<{
  value: string
  triggerId: string
  contentId: string
} | null>(null)

function useAccordionItem() {
  const accordion = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)
  if (!accordion || !item) {
    throw new Error("AccordionItem parts must be used inside Accordion.")
  }

  return {
    ...item,
    open: accordion.openValue === item.value,
    setOpenValue: accordion.setOpenValue,
  }
}

function Accordion({ ...props }: React.ComponentProps<"div">) {
  const [openValue, setOpenValue] = React.useState<string | null>(null)

  return (
    <AccordionContext.Provider value={{ openValue, setOpenValue }}>
      <div data-slot="accordion" {...props} />
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  className,
  value,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  const id = React.useId()

  return (
    <AccordionItemContext.Provider
      value={{ value, triggerId: `${id}-trigger`, contentId: `${id}-content` }}
    >
      <div
        data-slot="accordion-item"
        className={cn("border-b last:border-b-0", className)}
        {...props}
      />
    </AccordionItemContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { value, triggerId, contentId, open, setOpenValue } = useAccordionItem()

  return (
    <h3 className="flex">
      <button
        type="button"
        id={triggerId}
        data-slot="accordion-trigger"
        data-state={open ? "open" : "closed"}
        aria-expanded={open}
        aria-controls={contentId}
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        onClick={(event) => {
          onClick?.(event)
          setOpenValue((current) => (current === value ? null : value))
        }}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </button>
    </h3>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { triggerId, contentId, open } = useAccordionItem()

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      inert={!open}
      data-slot="accordion-content"
      data-state={open ? "open" : "closed"}
      className="grid grid-rows-[0fr] text-sm transition-[grid-template-rows] duration-200 ease-out data-[state=open]:grid-rows-[1fr]"
      {...props}
    >
      <div className="overflow-hidden">
        <div className={cn("pt-0 pb-4", className)}>{children}</div>
      </div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
