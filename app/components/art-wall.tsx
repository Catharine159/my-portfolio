'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Lightbox } from 'app/gallery/gallery'

export type Art = {
  file: string
  alt: string
  width: number
  height: number
  span: string
  tilt: string
  tape?: boolean
}

function Reveal({ index, children }: { index: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 2) * 120}ms` }}
      className={`transition duration-700 ease-out motion-reduce:transition-none ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  )
}

// A "gallery wall" of prints hung slightly crooked, pinned up with tape.
// Hover straightens a piece and lifts it forward; click opens it full screen.
export default function ArtWall({ arts }: { arts: Art[] }) {
  const [active, setActive] = useState<number | null>(null)
  const trigger = useRef<HTMLElement | null>(null)

  const photos = arts.map((a) => ({
    src: `/arts/${a.file}`,
    caption: '',
    width: a.width,
    height: a.height,
  }))

  const open = (i: number) => {
    trigger.current = document.activeElement as HTMLElement
    setActive(i)
  }
  const close = useCallback(() => {
    setActive(null)
    trigger.current?.focus()
  }, [])

  return (
    <div className="relative mt-6 mb-16 grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:grid-cols-12 sm:gap-x-5 sm:gap-y-12 lg:left-1/2 lg:w-[calc(100vw-2rem)] lg:max-w-4xl lg:-translate-x-1/2 lg:gap-x-8 lg:gap-y-14">
      {arts.map((art, i) => (
        <div key={art.file} className={art.span}>
          <Reveal index={i}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`Open artwork: ${art.alt}`}
              className={`group relative block w-full cursor-zoom-in bg-white p-1.5 text-left shadow-[0_14px_30px_-12px_rgba(0,0,0,0.4)] ring-1 ring-black/5 transition duration-500 ease-out hover:z-10 hover:rotate-0 hover:scale-[1.03] hover:shadow-[0_24px_50px_-14px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 sm:p-2 dark:bg-neutral-200 ${art.tilt}`}
            >
              {art.tape && (
                <span
                  aria-hidden="true"
                  className="absolute -top-2.5 left-1/2 z-10 h-5 w-14 -translate-x-1/2 -rotate-3 bg-amber-200/80 shadow-sm"
                />
              )}
              <Image
                src={`/arts/${art.file}`}
                alt={art.alt}
                width={art.width}
                height={art.height}
                sizes="(min-width: 896px) 520px, 50vw"
                className="h-auto w-full"
              />
            </button>
          </Reveal>
        </div>
      ))}

      {active !== null &&
        createPortal(
          <Lightbox photos={photos} index={active} onClose={close} onChange={setActive} />,
          document.body
        )}
    </div>
  )
}
