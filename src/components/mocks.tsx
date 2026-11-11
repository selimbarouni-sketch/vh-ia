import type { ReactNode } from 'react'
import { cx, Icon } from './ui'

export function MockFrame({
  label,
  tone = 'text-grape',
  children,
  className,
}: {
  label: string
  tone?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cx(
        'overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-50px_rgba(27,20,53,.7)] ring-1 ring-line',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line/80 bg-lilac2/70 px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-coral/70" />
          <span className="h-2 w-2 rounded-full bg-butter" />
          <span className="h-2 w-2 rounded-full bg-mint/70" />
        </span>
        <span className={cx('ml-1 truncate text-[11px] font-semibold tracking-wide', tone)}>{label}</span>
      </div>
      <div className="p-3.5 sm:p-4">{children}</div>
    </div>
  )
}

function ScoreRing({ score, total }: { score: number; total: number }) {
  const pct = Math.round((score / total) * 100)
  return (
    <div className="relative grid h-12 w-12 shrink-0 place-items-center">
      <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e4e4f6" strokeWidth="4" />
        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          stroke="#5b45f5"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * 97.4} 97.4`}
        />
      </svg>
      <span className="text-[11px] font-bold text-ink">
        {score}
        <span className="text-[9px] font-semibold text-muted">/{total}</span>
      </span>
    </div>
  )
}

const gradedLines = [
  { work: 'x² − 5x + 6 = 0', note: 'reads correctly', kind: 'ok', points: '0' },
  { work: '(x − 2)(x − 3) = 0', note: 'correct factoring', kind: 'ok', points: '+3' },
  { work: 'x = 2  x = 3', note: 'both roots found', kind: 'ok', points: '+3' },
  { work: 'sum of roots = −5', note: 'sign slip: should be 5', kind: 'warn', points: '−1' },
  { work: 'vertex at (2.5, −0.25)', note: 'shows the method', kind: 'ok', points: '+2' },
]

export function GradingMock({ compact = false }: { compact?: boolean }) {
  return (
    <MockFrame label="Algebra II · Quiz 4 · Period 3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-grape/10 text-xs font-bold text-grape">AR</span>
          <div className="leading-tight">
            <p className="text-xs font-bold text-ink">A. Rivera</p>
            <p className="text-[10px] text-muted">4 of 12 papers graded · 38s</p>
          </div>
        </div>
        <span className="rounded-full bg-mint/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0a9b7c]">
          Needs review
        </span>
      </div>

      <div className="mt-3 rounded-xl bg-[repeating-linear-gradient(to_bottom,transparent,transparent_27px,#eef0ff_27px,#eef0ff_28px)] p-2.5 ring-1 ring-line/70">
        <ul className="grid gap-1.5">
          {gradedLines.map((line) => (
            <li key={line.work} className="flex items-center justify-between gap-2">
              <span className="font-hand text-[17px] leading-none text-ink2">{line.work}</span>
              {!compact ? (
                <span
                  className={cx(
                    'shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-semibold',
                    line.kind === 'warn' ? 'bg-butter/30 text-[#8a6100]' : 'bg-mint/12 text-[#0a9b7c]',
                  )}
                >
                  {line.note} · {line.points}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ScoreRing score={18} total={20} />
          <div className="leading-tight">
            <p className="text-[11px] font-bold text-ink">3 comments drafted</p>
            <p className="text-[10px] text-muted">Aligned to CCSS A-REI.B.4</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <span className="rounded-full px-2.5 py-1.5 text-[10px] font-semibold text-ink2 ring-1 ring-line">Edit</span>
          <span className="rounded-full bg-grape px-2.5 py-1.5 text-[10px] font-semibold text-white">Approve</span>
        </div>
      </div>
    </MockFrame>
  )
}

const skills = [
  { name: 'Completing the square', value: 92, tone: 'bg-mint' },
  { name: 'Quadratic formula', value: 74, tone: 'bg-sky' },
  { name: 'Factoring trinomials', value: 58, tone: 'bg-grapesoft' },
  { name: 'Interpreting the discriminant', value: 41, tone: 'bg-coral' },
]

export function InsightsMock() {
  return (
    <MockFrame label="Class mastery · 28 students" tone="text-mint">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-bold text-ink">Quadratics unit</p>
        <p className="text-[10px] text-muted">last 3 assessments</p>
      </div>
      <ul className="mt-3 grid gap-2.5">
        {skills.map((skill) => (
          <li key={skill.name}>
            <div className="flex items-center justify-between text-[10.5px] font-medium text-ink2">
              <span>{skill.name}</span>
              <span className="font-bold text-ink">{skill.value}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-lilac">
              <div className={cx('h-full rounded-full', skill.tone)} style={{ width: `${skill.value}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3.5 flex items-start gap-2 rounded-xl bg-lilac2 p-2.5 ring-1 ring-line/80">
        <Icon name="bolt" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-grape" />
        <p className="text-[10.5px] leading-relaxed text-ink2">
          <span className="font-bold text-ink">6 students</span> lost points on the same step. A 10-minute re-teach on the
          discriminant would recover an estimated 12% of unit points.
        </p>
      </div>
    </MockFrame>
  )
}

const practiceItems = [
  { q: 'Solve 2x² + 4x − 6 = 0 by completing the square.', tag: 'completing the square' },
  { q: 'Rewrite x² + 8x + 7 in vertex form.', tag: 'vertex form' },
  { q: 'How many real solutions does 3x² − 4x + 5 = 0 have?', tag: 'discriminant' },
]

export function PracticeMock() {
  return (
    <MockFrame label="Practice set · built for A. Rivera" tone="text-sky">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-sky/10 px-2.5 py-1 text-[10px] font-bold text-[#0a83b5]">3 targeted skills</span>
        <span className="text-[10px] text-muted">editable · printable</span>
      </div>
      <ol className="mt-3 grid gap-2">
        {practiceItems.map((item, i) => (
          <li key={item.q} className="rounded-xl bg-lilac2/70 p-2.5 ring-1 ring-line/70">
            <p className="text-[11px] font-semibold leading-snug text-ink">
              {i + 1}. {item.q}
            </p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-grape ring-1 ring-grape/15">
              <Icon name="target" className="h-2.5 w-2.5" />
              {item.tag}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <span className="rounded-full bg-grape py-1.5 text-center text-[10px] font-semibold text-white">Assign online</span>
        <span className="rounded-full py-1.5 text-center text-[10px] font-semibold text-ink2 ring-1 ring-line">
          <Icon name="print" className="mr-1 inline h-3 w-3" />
          Print
        </span>
      </div>
    </MockFrame>
  )
}

export function AssistantMock() {
  return (
    <MockFrame label="Sumly assistant" tone="text-grapesoft">
      <div className="grid gap-2">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-grape px-3 py-2 text-[11px] leading-relaxed text-white">
          My period 3 is still shaky on the discriminant. Build a warm-up that uses their actual mistakes.
        </div>
        <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-lilac2 px-3 py-2.5 text-[11px] leading-relaxed text-ink2 ring-1 ring-line/80">
          <p className="mb-1.5 font-semibold text-ink">5-question warm-up ready</p>
          <ul className="grid gap-1 text-[10.5px]">
            <li>· 2 questions mirror the sign error from Quiz 4</li>
            <li>· 1 sorting task: two roots, one root, no real roots</li>
            <li>· 2 exit-ticket items at grade level</li>
          </ul>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-grape ring-1 ring-grape/15">
              uses period 3 data
            </span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-muted ring-1 ring-line">
              CCSS A-REI.B.4b
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 ring-1 ring-line">
          <span className="text-[10.5px] text-muted">Ask about your class…</span>
          <span className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-grape text-white">
            <Icon name="arrow" className="h-3 w-3" />
          </span>
        </div>
      </div>
    </MockFrame>
  )
}
