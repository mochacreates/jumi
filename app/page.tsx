"use client"

import { useState } from "react"

import { PhraseCarousel } from "@/components/phrase-carousel"
import { PasswordForm } from "@/components/password-form"

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-12">
      {isAuthorized ? (
        <PhraseCarousel
          currentPhraseIndex={currentPhraseIndex}
          onPhraseChange={setCurrentPhraseIndex}
          onExit={() => {
            setCurrentPhraseIndex(0)
            setIsAuthorized(false)
          }}
        />
      ) : (
        <PasswordForm onAuthorize={() => setIsAuthorized(true)} />
      )}
    </main>
  )
}