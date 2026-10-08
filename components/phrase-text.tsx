"use client"

import { useEffect, useState } from "react"

export function PhraseText({
  text,
  isBlurred,
}: {
  text: string
  isBlurred: boolean
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <p
      className={`text-md font-normal transition-opacity duration-500 motion-reduce:transition-none ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${isBlurred ? "blur-sm select-none" : ""}`}
    >
      {text}
    </p>
  )
}