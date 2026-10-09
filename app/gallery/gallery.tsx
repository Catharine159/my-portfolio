'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export type Photo = {
  src: string
  caption: string
  width: number
  height: number
}

// Shown until real photos are added to /public/gallery.
const PLACEHOLDERS = [
  { ratio: '4 / 5', colors: ['#38bdf8', '#6366f1', '#a78bfa'] },
  { ratio: '1 / 1', colors: ['#86efac', '#34d399', '#0d9488'] },
  { ratio: '3 / 4', colors: ['#fdba74', '#fb7185', '#c084fc'] },
  { ratio: '4 / 3', colors: ['#67e8f9', '#5eead4', '#bef264'] },
  { ratio: '3 / 4', colors: ['#fda4af', '#f0abfc', '#a5b4fc'] },
  { ratio: '5 / 4', colors: ['#fde68a', '#fdba74', '#f472b6'] },
  { ratio: '1 / 1', colors: ['#6366f1', '#3b82f6', '#22d3ee'] },
  { ratio: '4 / 5', colors: ['#bef264', '#4ade80', '#2dd4bf'] },
  { ratio: '3 / 2', colors: ['#fca5a5', '#fdba74', '#fde68a'] },
]

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
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
      className={`mb-4 break-inside-avoid transition duration-700 ease-out motion-reduce:transition-none ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  )
}

function CameraIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  )
}

function Placeholder({ ratio, colors }: (typeof PLACEHOLDERS)[number]) {
  return (
    <div
      style={{
        aspectRatio: ratio,
        backgroundImage: `radial-gradient(120% 80% at 15% 0%, rgba(255,255,255,.6), transparent 55%), linear-gradient(135deg, ${colors.join(',')})`,
      }}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl text-white/90 shadow-sm ring-1 ring-black/5 dark:brightness-75 dark:ring-white/10"
    >
      <CameraIcon />
      <span className="text-xs uppercase tracking-[0.25em]">Photo coming soon</span>
    </div>
  )
}

export function Lightbox({
  photos,
  index,
  onClose,
  onChange,
}: {
  photos: Photo[]
  index: number
  onClose: () => void
  onChange: (next: number) => void
}) {
  const photo = photos[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const total = photos.length

  const go = useCallback(
    (dir: number) => onChange((index + dir + total) % total),
    [index, total, onChange]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [go, onClose])

  const btn =
    'flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption || `Photo ${index + 1} of ${total}`}
      className="gallery-fade fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-white/80">
        <span className="text-sm tabular-nums tracking-widest">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          className={btn}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <figure
        key={photo.src}
        className="gallery-rise flex max-w-[92vw] flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.caption || `Photo ${index + 1}`}
          width={photo.width}
          height={photo.height}
          sizes="92vw"
          priority
          className="h-auto max-h-[78vh] w-auto max-w-[92vw] rounded-lg object-contain shadow-2xl"
        />
        {photo.caption && (
          <figcaption className="text-center text-sm tracking-wide text-white/80">
            {photo.caption}
          </figcaption>
        )}
      </figure>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            className={`${btn} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className={`${btn} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const hasPhotos = photos.length > 0

  const open = (i: number) => {
    trigger.current = document.activeElement as HTMLElement
    setActive(i)
  }
  const close = useCallback(() => {
    setActive(null)
    trigger.current?.focus()
  }, [])

  return (
    <section className="relative lg:left-1/2 lg:w-[calc(100vw-2rem)] lg:max-w-5xl lg:-translate-x-1/2">
      <header className="relative mb-14 text-center">
        <div
          aria-hidden="true"
          className="gallery-drift pointer-events-none absolute -top-16 left-1/2 -z-10 h-56 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400/40 via-emerald-300/40 to-amber-300/40 blur-3xl"
        />
        <h1 className="text-4xl font-semibold tracking-tighter sm:text-6xl">
          Gallery
        </h1>
        {hasPhotos && (
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
            {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
          </p>
        )}
      </header>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {hasPhotos
          ? photos.map((photo, i) => (
              <Reveal key={photo.src} index={i}>
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-label={photo.caption ? `Open ${photo.caption}` : `Open photo ${i + 1}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl text-left shadow-sm ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:ring-white/10"
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption || `Photo ${i + 1}`}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  {photo.caption && (
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm font-medium tracking-wide text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      {photo.caption}
                    </span>
                  )}
                </button>
              </Reveal>
            ))
          : PLACEHOLDERS.map((p, i) => (
              <Reveal key={i} index={i}>
                <Placeholder {...p} />
              </Reveal>
            ))}
      </div>

      {active !== null &&
        // Portal: the section's transform would otherwise trap `position: fixed`.
        createPortal(
          <Lightbox photos={photos} index={active} onClose={close} onChange={setActive} />,
          document.body
        )}
    </section>
  )
}
