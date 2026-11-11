import { useEffect, useRef, useState, type ReactNode } from 'react'

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/* ------------------------------------------------------------------ icons */

const paths: Record<string, ReactNode> = {
  sparkle: (
    <path d="M12 3l1.8 4.9L18.7 9.7l-4.9 1.8L12 16.4l-1.8-4.9L5.3 9.7l4.9-1.8L12 3z" />
  ),
  arrow: <path d="M5 12h13m-5.5-5.5L18 12l-5.5 5.5" />,
  check: <path d="M4.5 12.5l5 5 10-11" />,
  chart: <path d="M4 19V9m5 10V5m5 14v-7m5 7V8" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  chat: <path d="M20 12.5a7.5 7.5 0 01-7.5 7.5H8l-4 3v-5.2A7.5 7.5 0 0112 5a7.5 7.5 0 018 7.5z" />,
  pen: <path d="M4 20l4-1 10.5-10.5a2.5 2.5 0 10-3.5-3.5L4.5 15.5 4 20z" />,
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="3" />
      <path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5" />
    </>
  ),
  layers: <path d="M12 3.5l8.5 4.7-8.5 4.8L3.5 8.2 12 3.5zM3.5 12.5l8.5 4.8 8.5-4.8M3.5 16.6l8.5 4.8 8.5-4.8" />,
  bolt: <path d="M13.5 3L5 14h6l-1 7 9-11.5h-6.2L13.5 3z" />,
  book: <path d="M4.5 5.5A2.5 2.5 0 017 3h12v15H7a2.5 2.5 0 00-2.5 2.5V5.5zM4.5 20.5A2 2 0 016.5 18h12.5" />,
  shield: <path d="M12 3l7.5 3v6c0 4.4-3 7.9-7.5 9.5C7.5 19.9 4.5 16.4 4.5 12V6L12 3z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chevron: <path d="M7 10l5 5 5-5" />,
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" />
    </>
  ),
  play: <path d="M8 5.5l10 6.5-10 6.5v-13z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.2a3.5 3.5 0 010 6.6M18 20c0-2.6-.8-4.6-2-6" />
    </>
  ),
  print: <path d="M7 9V4h10v5M7 18H5.5A1.5 1.5 0 014 16.5V11a2 2 0 012-2h12a2 2 0 012 2v5.5a1.5 1.5 0 01-1.5 1.5H17M7 14h10v6H7v-6z" />,
}

export function Icon({
  name,
  className = 'h-5 w-5',
  strokeWidth = 1.8,
}: {
  name: keyof typeof paths | string
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.sparkle}
    </svg>
  )
}

/* ------------------------------------------------------------------ logo */

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-grape text-white shadow-[0_8px_20px_-10px_rgba(91,69,245,.9)]">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3.6 5.5l3.6 12h1.5l3.6-12" />
          <path d="M15.6 5.5v12M21 5.5v12M15.6 11.5H21" />
        </svg>
      </span>
      <span className="text-xl font-extrabold tracking-tight text-ink">VH.IA</span>
    </span>
  )
}

/* ------------------------------------------------------------------ mascot */

export function Mascot({ className = 'h-40 w-40' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} role="img" aria-label="Mascotte VH.IA">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b6dff" />
          <stop offset="100%" stopColor="#4a34e0" />
        </linearGradient>
        <linearGradient id="belly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e7e9ff" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="196" rx="62" ry="10" fill="#3b2fa8" opacity=".18" />
      <path d="M62 74c-8-16-6-30 2-38 10 4 18 14 20 26" fill="#4a34e0" />
      <path d="M158 74c8-16 6-30-2-38-10 4-18 14-20 26" fill="#4a34e0" />
      <ellipse cx="110" cy="118" rx="66" ry="70" fill="url(#body)" />
      <ellipse cx="110" cy="132" rx="44" ry="50" fill="url(#belly)" />
      <circle cx="86" cy="106" r="15" fill="#fff" />
      <circle cx="134" cy="106" r="15" fill="#fff" />
      <circle cx="89" cy="108" r="7" fill="#1b1435" />
      <circle cx="131" cy="108" r="7" fill="#1b1435" />
      <circle cx="91.5" cy="105" r="2.4" fill="#fff" />
      <circle cx="133.5" cy="105" r="2.4" fill="#fff" />
      <path d="M96 134c4.5 4 8.5 5.8 14 5.8s9.5-1.8 14-5.8" stroke="#1b1435" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M110 138l-9 12h18l-9-12z" fill="#ffd36e" />
      <rect x="58" y="92" width="22" height="26" rx="8" fill="#4a34e0" />
      <rect x="140" y="92" width="22" height="26" rx="8" fill="#4a34e0" />
      <path d="M80 100h28M112 100h28" stroke="#4a34e0" strokeWidth="4" strokeLinecap="round" />
      <g className="animate-float">
        <path d="M180 48l3.4 8.6 8.6 3.4-8.6 3.4-3.4 8.6-3.4-8.6-8.6-3.4 8.6-3.4L180 48z" fill="#ffd36e" />
      </g>
      <g className="animate-float-slow">
        <path d="M36 132l2.4 6 6 2.4-6 2.4-2.4 6-2.4-6-6-2.4 6-2.4 2.4-6z" fill="#fff" opacity=".9" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ reveal */

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cx('reveal', visible && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ bits */

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cx(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow ? (
        <span className="eyebrow">
          <Icon name="sparkle" className="h-3.5 w-3.5" />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-3xl text-balance text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-4xl md:text-[2.85rem]">
        {title}
      </h2>
      {sub ? (
        <p className={cx('max-w-2xl text-base leading-relaxed text-muted sm:text-lg')}>{sub}</p>
      ) : null}
    </div>
  )
}

export function Avatar({ name, tone }: { name: string; tone: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
  return (
    <span
      className={cx('grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white', tone)}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}
