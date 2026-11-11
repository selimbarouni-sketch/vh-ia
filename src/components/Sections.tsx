import { useState } from 'react'
import { Avatar, cx, Icon, Reveal, SectionHeading } from './ui'
import { AssistantMock, GradingMock, InsightsMock, PracticeMock } from './mocks'

/* ------------------------------------------------------------- trust strip */

const stats = [
  { value: '12 min', label: 'average time to grade a class set of 28 papers' },
  { value: '95%', label: 'accuracy reading handwritten multi-step work' },
  { value: '3.4 hrs', label: 'given back to every teacher each week' },
  { value: '1,400+', label: 'math departments across 9 countries' },
]

export function Stats() {
  return (
    <section className="relative py-14">
      <div className="container-page">
        <Reveal>
          <div className="card grid gap-8 px-6 py-9 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.value} className="text-center sm:text-left">
                <p className="text-3xl font-extrabold tracking-tight text-ink sm:text-[2.1rem]">{s.value}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- pillars */

const pillars = [
  {
    icon: 'pen',
    title: 'Grading that reads the work',
    body: 'Handwriting, scratch work, crossed-out lines, multi-step algebra. VH.IA follows the reasoning, awards partial credit, and explains where the logic broke — in language a student can act on.',
    points: ['Partial credit that matches your rubric', 'Comments you edit before release', 'CCSS, TEKS and your local standards'],
  },
  {
    icon: 'chart',
    title: 'Insight past the score',
    body: 'A grade tells you what happened. Skill-level mastery tells you why. See exactly which standards each student owns, and which ones the whole class is quietly guessing at.',
    points: ['Mastery by skill, student and class', 'Recurring error patterns detected', 'Growth tracked across the year'],
  },
  {
    icon: 'target',
    title: 'Practice built from real mistakes',
    body: 'Every student gets practice aimed at their actual gap — not a generic worksheet. Fully editable, printable, or assignable online in one click.',
    points: ['Targeted problem sets in minutes', 'Every item editable', 'Assign, print or export to your LMS'],
  },
]

export function Pillars() {
  return (
    <section id="teachers" className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Built by teachers, for teachers"
            title={
              <>
                Three teachers built this after one <span className="gradient-text">very long Sunday</span> of grading.
              </>
            }
            sub="VH.IA is not a generic AI that was pointed at a math paper. It was designed around how math is actually taught, marked and re-taught."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className="card flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1.5 sm:p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lilac text-grape">
                  <Icon name={p.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
                <ul className="mt-5 grid gap-2 border-t border-line/80 pt-5">
                  {p.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-[13px] text-ink2">
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" strokeWidth={2.6} />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- deep dive */

const tabs = [
  {
    id: 'grading',
    label: 'AI correction',
    icon: 'pen',
    title: 'Correction that explains the math',
    body: 'VH.IA reads handwriting, tracks multi-step reasoning, and marks the way a math teacher does: method, not just answer. Every comment cites the step it came from.',
    bullets: [
      'Reads handwriting at 95% accuracy, including crossed-out work',
      'Awards partial credit intelligently across multi-step solutions',
      'Rubrics align to CCSS, TEKS or the standards you paste in',
    ],
    mock: <GradingMock />,
  },
  {
    id: 'insights',
    label: 'Actionable insights',
    icon: 'chart',
    title: 'Move past the grade, track the learning',
    body: 'Every question is tagged to a skill, so a class set of papers becomes a map of what your students have actually mastered — and what to re-teach next.',
    bullets: [
      'Skill-level mastery for each student, class and grading period',
      'Error pattern detection: same mistake, many papers',
      'Growth tracking from the first unit to the last',
    ],
    mock: <InsightsMock />,
  },
  {
    id: 'practice',
    label: 'Targeted practice',
    icon: 'target',
    title: 'Differentiation in minutes, not evenings',
    body: 'Turn assessment data into action. VH.IA generates practice from each student\u2019s own mistakes, then hands you the pen: edit anything, assign it, or print it.',
    bullets: [
      'Practice that targets the actual misconception',
      'Every item editable, with the answer key attached',
      'Assign online, print, or push to your LMS',
    ],
    mock: <PracticeMock />,
  },
  {
    id: 'assistant',
    label: 'AI assistant',
    icon: 'chat',
    title: 'An assistant that knows your class',
    body: 'Ask for a warm-up on last week\u2019s weak skill, a re-teach plan for six students, or a retake that mirrors your quiz. The assistant answers with your data, not generic content.',
    bullets: [
      'Grounds every answer in your assessments and standards',
      'Drafts warm-ups, re-teach plans and retakes',
      'Never invents a grade or a student\u2019s work',
    ],
    mock: <AssistantMock />,
  },
]

export function DeepDive() {
  const [active, setActive] = useState(tabs[0].id)
  const current = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <section id="how" className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="The product"
            title={
              <>
                Half the grading. <span className="gradient-text">Twice the feedback.</span>
              </>
            }
            sub="One workflow, four jobs: mark it, understand it, act on it, and plan what comes next."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                aria-pressed={active === tab.id}
                className={cx(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all',
                  active === tab.id
                    ? 'bg-grape text-white shadow-[0_14px_30px_-16px_rgba(91,69,245,.9)]'
                    : 'bg-white text-ink2 ring-1 ring-line hover:text-grape',
                )}
              >
                <Icon name={tab.icon} className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            id={current.id}
            className="card mt-8 grid items-center gap-9 p-6 sm:p-9 lg:grid-cols-2 lg:gap-12 lg:p-11"
          >
            <div>
              <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-ink sm:text-[1.75rem]">{current.title}</h3>
              <p className="mt-3.5 text-[15px] leading-relaxed text-muted">{current.body}</p>
              <ul className="mt-6 grid gap-3">
                {current.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-ink2">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint/15 text-mint">
                      <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <a href="#start" className="btn btn-primary mt-7 px-6 py-3 text-sm">
                Try it on one of your quizzes
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
            <div className="animate-float-slow">{current.mock}</div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- testimonials */

const quotes = [
  {
    quote:
      'I marked the same quiz for two classes in one prep period, and the comments were more specific than the ones I usually have time to write.',
    name: 'Dana Whitfield',
    role: 'Algebra II · 11th grade',
    tone: 'bg-grape',
  },
  {
    quote:
      'The mastery view is what changed my teaching. I stopped re-teaching the whole unit and started targeting the two steps that actually broke down.',
    name: 'Marcus Ellery',
    role: 'Math department chair',
    tone: 'bg-sky',
  },
  {
    quote:
      'It hands me a practice set built from what my students got wrong, and I still get to edit every single question. That balance is the whole point.',
    name: 'Priya Raman',
    role: 'Geometry & Algebra I',
    tone: 'bg-mint',
  },
]

export function Testimonials() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Why teachers stay"
            title="The feedback is the reason"
            sub="Early users told us the same thing: the comments read like a teacher wrote them, because the rubric behind them is a teacher's."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 90}>
              <figure className="card flex h-full flex-col p-6 sm:p-7">
                <span className="text-4xl leading-none text-grape/25" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-ink2">{q.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line/80 pt-5">
                  <Avatar name={q.name} tone={q.tone} />
                  <span className="leading-tight">
                    <span className="block text-sm font-bold text-ink">{q.name}</span>
                    <span className="block text-xs text-muted">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- integrations */

const integrations = [
  'Canvas',
  'Google Classroom',
  'Schoology',
  'Clever',
  'PowerSchool',
  'Infinite Campus',
  'Aeries',
  'Blackboard',
  'Moodle',
  'Microsoft Teams',
  'ClassLink',
  'Edulastic',
  'CSV export',
  'Print & scan',
]

export function Integrations() {
  return (
    <section id="integrations" className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="card relative overflow-hidden px-6 py-12 text-center sm:px-12">
            <div aria-hidden="true" className="bg-dotgrid absolute inset-0 opacity-50" />
            <div className="relative">
              <SectionHeading
                eyebrow="Integrations"
                title="Works where you already teach"
                sub="Import papers, sync rosters, export grades. Setup takes minutes and no IT ticket."
              />
            </div>
            <div className="relative mt-9 flex flex-wrap justify-center gap-2.5">
              {integrations.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-ink2 ring-1 ring-line transition-colors hover:text-grape"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="relative mt-7 text-xs text-muted">
              Plus 15 more LMS and SIS platforms, and a plain-paper workflow for everything else.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- privacy */

const compliance = ['FERPA', 'COPPA', 'GDPR', 'SOC 2 Type II', 'State privacy laws']

export function Privacy() {
  return (
    <section id="privacy" className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(140deg,#2a1c72,#4a34e0_55%,#1b1435)] px-6 py-14 text-white sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(34,179,239,.45),transparent_65%)] blur-2xl"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
                  <Icon name="lock" className="h-3.5 w-3.5" />
                  Student data
                </span>
                <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
                  Student work is never training data.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/80">
                  VH.IA was built for minors, so privacy was a design constraint from day one — not a policy page added
                  later. Papers, comments and rosters stay in your school&rsquo;s tenant, are encrypted in transit and at
                  rest, and are deleted on your schedule.
                </p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    'No model training on student work',
                    'District-owned data, exportable anytime',
                    'Role-based access with audit logs',
                    'Retention controls per school',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-white/85">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-mint" strokeWidth={2.6} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {compliance.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3.5 ring-1 ring-white/15 backdrop-blur"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-white">
                      <Icon name="shield" className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-sm font-semibold">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- CTA */

export function FinalCTA() {
  return (
    <section id="start" className="relative pb-24 pt-4">
      <div className="container-page">
        <Reveal>
          <div className="card relative overflow-hidden px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,107,255,.35),transparent_65%)] blur-2xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[2.6rem]">
                Grade one class tonight.
                <br />
                <span className="gradient-text">Decide tomorrow.</span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                Upload a class set of scanned papers, watch VH.IA mark them, and keep every comment you like. No credit
                card, no onboarding call, no setup.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#start" className="btn btn-primary px-7 py-3.5 text-[15px]">
                  Start free — 30 days
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
                <a href="#how" className="btn btn-secondary px-7 py-3.5 text-[15px]">
                  Book a 20-minute demo
                </a>
              </div>
              <p className="mt-4 text-xs text-muted">
                FERPA and COPPA compliant · Cancel anytime · Works with printed or scanned papers
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
