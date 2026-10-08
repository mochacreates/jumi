"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"

export function RevealButton({
  isPhraseBlurred,
  onToggle,
}: {
  isPhraseBlurred: boolean
  onToggle: () => void
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <Button
      className={`fixed left-4 top-4 transition-opacity duration-500 motion-reduce:transition-none md:left-8 md:top-8 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      type="button"
      variant={isPhraseBlurred ? "destructiveGhost" : "destructiveSolid"}
      aria-pressed={!isPhraseBlurred}
      onClick={onToggle}
    >
      <Eye aria-hidden="true" />
      {isPhraseBlurred ? "Revelar" : "Ocultar"}
    </Button>
  )
}