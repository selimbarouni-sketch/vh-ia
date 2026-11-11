import { useMemo, useState } from 'react'
import { gradeWork, SAMPLE_EXERCISES, type GradeResult } from '../lib/grader'
import { cx, Icon, Reveal, SectionHeading } from './ui'

type Draft = {
  prompt: string
  expected: string
  steps: string
  totalPoints: number
  student: string
}

function draftFromSample(id: string): Draft {
  const ex = SAMPLE_EXERCISES.find((e) => e.id === id) ?? SAMPLE_EXERCISES[0]
  return {
    prompt: ex.prompt,
    expected: ex.expected,
    steps: ex.steps.join('\n'),
    totalPoints: ex.totalPoints,
    student: ex.student,
  }
}

const STATUS: Record<string, { label: string; cls: string; dot: string }> = {
  correct: { label: 'Juste', cls: 'bg-mint/12 text-[#0a9b7c]', dot: 'bg-mint' },
  partial: { label: 'Partiel', cls: 'bg-butter/25 text-[#8a6100]', dot: 'bg-butter' },
  missing: { label: 'Manquant', cls: 'bg-coral/15 text-[#b93b3b]', dot: 'bg-coral' },
  review: { label: 'À revoir', cls: 'bg-lilac text-ink2', dot: 'bg-ink2' },
}

const fmt = (n: number) => String(n).replace('.', ',')

function ScoreDial({ percent, score, total }: { percent: number; score: number; total: number }) {
  const r = 33
  const circumference = 2 * Math.PI * r
  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="dial" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5b45f5" />
            <stop offset="100%" stopColor="#22b3ef" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r={r} fill="none" stroke="#e4e4f6" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="url(#dial)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${Math.min(100, Math.max(0, percent)) * (circumference / 100)} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center leading-none">
          <p className="text-lg font-extrabold text-ink">{fmt(score)}</p>
          <p className="mt-1 text-[10px] font-semibold text-muted">/ {total}</p>
        </div>
      </div>
    </div>
  )
}

export default function Grader() {
  const [mode, setMode] = useState<'sample' | 'own'>('sample')
  const [sampleId, setSampleId] = useState(SAMPLE_EXERCISES[0].id)
  const [draft, setDraft] = useState<Draft>(() => draftFromSample(SAMPLE_EXERCISES[0].id))
  const [result, setResult] = useState<GradeResult | null>(null)
  const [approved, setApproved] = useState(false)
  const [error, setError] = useState('')

  const steps = useMemo(
    () =>
      draft.steps
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    [draft.steps],
  )

  function loadSample(id: string) {
    setSampleId(id)
    setDraft(draftFromSample(id))
    setResult(null)
    setApproved(false)
    setError('')
  }

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((cur) => ({ ...cur, [key]: value }))
  }

  function correct() {
    if (!draft.student.trim()) {
      setError("Collez d'abord le travail de l'élève.")
      return
    }
    setError('')
    setApproved(false)
    setResult(
      gradeWork({
        prompt: draft.prompt,
        expected: draft.expected,
        steps,
        student: draft.student,
        totalPoints: Number(draft.totalPoints) || 20,
      }),
    )
  }

  const confidencePct = result ? Math.round(result.confidence * 100) : 0

  return (
    <section id="correction" className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Moteur de correction"
            title={
              <>
                Corrigez une évaluation <span className="gradient-text">ici même</span>
              </>
            }
            sub="Choisissez un exemple ou saisissez le vôtre : la réponse attendue, les étapes attendues et la copie d'un élève. VH.IA corrige avec crédit partiel et explique chaque point."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {/* ------------------------------------------------------- saisie */}
            <div className="card p-6 sm:p-7">
              <div className="flex gap-1.5 rounded-full bg-lilac2 p-1 ring-1 ring-line">
                {(
                  [
                    { id: 'sample', label: "Devoirs d'exemple" },
                    { id: 'own', label: 'Votre propre devoir' },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMode(option.id)}
                    aria-pressed={mode === option.id}
                    className={cx(
                      'flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors sm:text-[13px]',
                      mode === option.id ? 'bg-white text-grape shadow-sm ring-1 ring-line' : 'text-ink2 hover:text-grape',
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {mode === 'sample' ? (
                <div className="mt-5">
                  <label htmlFor="sample" className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    Évaluation
                  </label>
                  <select
                    id="sample"
                    value={sampleId}
                    onChange={(e) => loadSample(e.target.value)}
                    className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-ink ring-1 ring-line outline-none focus:ring-2 focus:ring-grape/40"
                  >
                    {SAMPLE_EXERCISES.map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        {ex.title}
                      </option>
                    ))}
                  </select>
                  <div className="mt-3 rounded-xl bg-lilac2 p-3 ring-1 ring-line/80">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Énoncé</p>
                    <p className="mt-1 font-hand text-xl leading-tight text-ink">{draft.prompt}</p>
                  </div>
                </div>
              ) : (
                <div className="mt-5 grid gap-3">
                  <div>
                    <label htmlFor="prompt" className="text-[11px] font-bold uppercase tracking-wider text-muted">
                      Énoncé
                    </label>
                    <input
                      id="prompt"
                      value={draft.prompt}
                      onChange={(e) => set('prompt', e.target.value)}
                      placeholder="Résolvez 4x + 7 = 31"
                      className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink ring-1 ring-line outline-none focus:ring-2 focus:ring-grape/40"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[1fr_110px]">
                    <div>
                      <label htmlFor="expected" className="text-[11px] font-bold uppercase tracking-wider text-muted">
                        Réponse attendue
                      </label>
                      <input
                        id="expected"
                        value={draft.expected}
                        onChange={(e) => set('expected', e.target.value)}
                        placeholder="x = 6"
                        className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink ring-1 ring-line outline-none focus:ring-2 focus:ring-grape/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="points" className="text-[11px] font-bold uppercase tracking-wider text-muted">
                        Points
                      </label>
                      <input
                        id="points"
                        type="number"
                        min={1}
                        max={100}
                        value={draft.totalPoints}
                        onChange={(e) => set('totalPoints', Number(e.target.value))}
                        className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-ink ring-1 ring-line outline-none focus:ring-2 focus:ring-grape/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="steps" className="text-[11px] font-bold uppercase tracking-wider text-muted">
                      Étapes attendues — une par ligne
                    </label>
                    <textarea
                      id="steps"
                      value={draft.steps}
                      onChange={(e) => set('steps', e.target.value)}
                      rows={3}
                      placeholder={'4x = 24\nx = 6'}
                      className="mt-1.5 w-full resize-y rounded-xl bg-white px-3 py-2.5 text-sm text-ink ring-1 ring-line outline-none focus:ring-2 focus:ring-grape/40"
                    />
                  </div>
                </div>
              )}

              <div className="mt-5">
                <label htmlFor="student" className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  Copie de l'élève
                </label>
                <textarea
                  id="student"
                  value={draft.student}
                  onChange={(e) => set('student', e.target.value)}
                  rows={5}
                  spellCheck={false}
                  placeholder={'x² − 5x + 6 = 0\n(x − 2)(x − 3) = 0\nx = 2 ou x = 3'}
                  className="mt-1.5 w-full resize-y rounded-xl bg-white px-3 py-2.5 font-hand text-lg leading-snug text-ink ring-1 ring-line outline-none focus:ring-2 focus:ring-grape/40"
                />
              </div>

              {error ? <p className="mt-2 text-xs font-semibold text-[#b93b3b]">{error}</p> : null}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button type="button" onClick={correct} className="btn btn-primary px-5 py-3 text-sm">
                  <Icon name="sparkle" className="h-4 w-4" />
                  Corriger avec VH.IA
                </button>
                <button
                  type="button"
                  onClick={() => loadSample(sampleId)}
                  className="btn btn-secondary px-5 py-3 text-sm"
                >
                  Réinitialiser
                </button>
                <span className="ml-auto text-[11px] text-muted">Fonctionne dans votre navigateur</span>
              </div>
            </div>

            {/* ------------------------------------------------------ résultats */}
            <div className="card flex flex-col p-6 sm:p-7">
              {!result ? (
                <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lilac text-grape">
                    <Icon name="pen" className="h-7 w-7" />
                  </span>
                  <p className="mt-4 text-sm font-bold text-ink">Votre correction apparaît ici</p>
                  <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-muted">
                    Note, points par critère, commentaires et l'étape exacte où le raisonnement se brise — prêts pour
                    votre validation avant tout envoi à l'élève.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <ScoreDial percent={result.percent} score={result.score} total={result.total} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-full bg-grape/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-grape">
                          {result.percent} %
                        </span>
                        <span
                          className={cx(
                            'rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide',
                            confidencePct >= 80 ? 'bg-mint/12 text-[#0a9b7c]' : 'bg-butter/30 text-[#8a6100]',
                          )}
                        >
                          {confidencePct} % de confiance
                        </span>
                      </div>
                      <p className="mt-2 text-[13px] font-semibold leading-snug text-ink">{result.summary}</p>
                      {confidencePct < 80 ? (
                        <p className="mt-1 text-[11px] leading-relaxed text-muted">
                          Confiance faible — lisez les étapes signalées avant d'envoyer.
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <ul className="mt-5 grid gap-2 border-t border-line/80 pt-4">
                    {result.criteria.map((c) => {
                      const status = STATUS[c.status]
                      return (
                        <li key={c.id} className="rounded-xl bg-lilac2/60 p-2.5 ring-1 ring-line/70">
                          <div className="flex items-center gap-2">
                            <span className={cx('h-1.5 w-1.5 rounded-full', status.dot)} />
                            <p className="text-[11.5px] font-bold text-ink">{c.label}</p>
                            <span className={cx('ml-auto shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold', status.cls)}>
                              {status.label}
                            </span>
                            <span className="w-11 shrink-0 text-right text-[11px] font-extrabold text-ink">
                              {fmt(c.earned)}/{fmt(c.max)}
                            </span>
                          </div>
                          <p className="mt-1 pl-3.5 text-[11px] leading-relaxed text-ink2">{c.comment}</p>
                        </li>
                      )
                    })}
                  </ul>

                  {result.flags.length ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {result.flags.map((flag) => (
                        <span
                          key={flag}
                          className="inline-flex items-center gap-1 rounded-full bg-butter/25 px-2.5 py-1 text-[10px] font-semibold text-[#8a6100]"
                        >
                          <Icon name="bolt" className="h-3 w-3" />
                          {flag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                    {approved ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/12 px-3 py-2 text-[12px] font-bold text-[#0a9b7c]">
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                        Validé — le retour est prêt à être envoyé
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setApproved(true)}
                          className="btn btn-primary px-5 py-2.5 text-[13px]"
                        >
                          Valider et envoyer
                        </button>
                        <button type="button" className="btn btn-secondary px-5 py-2.5 text-[13px]">
                          Modifier le retour
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 max-w-2xl text-center text-[11.5px] leading-relaxed text-muted">
          Cette démo publique tourne entièrement dans votre navigateur avec un barème transparent — aucune copie ne
          quitte la page. Le moteur de production ajoute la reconnaissance de l'écriture manuscrite et un barème évalué
          par modèle, avec la même validation par l'enseignant avant l'envoi.
        </p>
      </div>
    </section>
  )
}
