"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, LogOut } from "lucide-react"

import { phrases } from "@/constants"
import { PhraseText } from "@/components/phrase-text"
import { RevealButton } from "@/components/reveal-button"
import { Button } from "@/components/ui/button"

export function PhraseCarousel({
  currentPhraseIndex,
  onPhraseChange,
  onExit,
}: {
  currentPhraseIndex: number
  onPhraseChange: (index: number) => void
  onExit: () => void
}) {
  const [revealedPhraseIds, setRevealedPhraseIds] = useState<Set<number>>(
    () => new Set(),
  )
  const currentPhrase = phrases[currentPhraseIndex]
  const isPhraseBlurred =
    currentPhrase.requiresReveal &&
    !revealedPhraseIds.has(currentPhrase.id)

  function changePhrase(nextIndex: number) {
    setRevealedPhraseIds((revealedIds) => {
      const nextRevealedIds = new Set(revealedIds)
      nextRevealedIds.delete(currentPhrase.id)
      return nextRevealedIds
    })
    onPhraseChange(nextIndex)
  }

  return (
    <section
      aria-label="Carrossel de frases"
      className="w-full max-w-sm space-y-6"
    >
      <header>
        <h1 className="sr-only">Frases para refletir</h1>
        {currentPhrase.requiresReveal && (
          <RevealButton
            key={`${currentPhrase.id}-${isPhraseBlurred}`}
            isPhraseBlurred={isPhraseBlurred}
            onToggle={() =>
              setRevealedPhraseIds((revealedIds) => {
                const nextRevealedIds = new Set(revealedIds)
                if (nextRevealedIds.has(currentPhrase.id)) {
                  nextRevealedIds.delete(currentPhrase.id)
                } else {
                  nextRevealedIds.add(currentPhrase.id)
                }
                return nextRevealedIds
              })
            }
          />
        )}
        <Button
          className="fixed right-4 top-4 md:right-8 md:top-8"
          type="button"
          variant="ghost"
          onClick={onExit}
        >
          <LogOut aria-hidden="true" />
          Sair
        </Button>
      </header>
      <article
        aria-live="polite"
        aria-atomic="true"
        className="text-center"
      >
        <PhraseText
          key={currentPhrase.id}
          text={currentPhrase.text}
          isBlurred={isPhraseBlurred}
        />
      </article>
      <nav
        aria-label="Navegação entre frases"
        className="fixed bottom-4 left-1/2 grid w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 grid-cols-3 items-center md:bottom-8"
      >
        <Button
          className="justify-self-start rounded-full"
          type="button"
          size="icon"
          aria-label="Frase anterior"
          disabled={currentPhraseIndex === 0}
          onClick={() => changePhrase(currentPhraseIndex - 1)}
        >
          <ArrowLeft aria-hidden="true" />
        </Button>
        <span
          aria-label={`Frase ${currentPhraseIndex + 1} de ${phrases.length}`}
          className="justify-self-center text-sm text-muted-foreground"
          aria-live="polite"
        >
          {currentPhraseIndex + 1} / {phrases.length}
        </span>
        <Button
          className="justify-self-end rounded-full"
          type="button"
          size="icon"
          aria-label="Próxima frase"
          disabled={currentPhraseIndex === phrases.length - 1}
          onClick={() => changePhrase(currentPhraseIndex + 1)}
        >
          <ArrowRight aria-hidden="true" />
        </Button>
      </nav>
    </section>
  )
}