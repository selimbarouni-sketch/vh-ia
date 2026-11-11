import { useState } from 'react'
import { Avatar, cx, Icon, Reveal, SectionHeading } from './ui'
import { AssistantMock, GradingMock, InsightsMock, PracticeMock } from './mocks'

/* ------------------------------------------------------------ bandeau clé */

const stats = [
  { value: '12 min', label: 'temps moyen pour corriger une classe de 28 copies' },
  { value: '95 %', label: 'de précision sur les raisonnements manuscrits en plusieurs étapes' },
  { value: '3,4 h', label: 'rendues à chaque enseignant chaque semaine' },
  { value: '1 400+', label: 'départements de mathématiques dans 9 pays' },
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

/* --------------------------------------------------------------- piliers */

const pillars = [
  {
    icon: 'pen',
    title: 'Une correction qui lit la copie',
    body: "Écriture manuscrite, brouillon, ratures, algèbre en plusieurs étapes. VH.IA suit le raisonnement, attribue le crédit partiel et explique où la logique se brise — dans des mots que l'élève peut utiliser.",
    points: ['Un crédit partiel fidèle à votre barème', 'Des commentaires que vous modifiez avant envoi', 'CCSS, TEKS et vos référentiels locaux'],
  },
  {
    icon: 'chart',
    title: 'Voir au-delà de la note',
    body: "Une note dit ce qui s'est passé. La maîtrise par compétence dit pourquoi. Voyez exactement quelles compétences chaque élève maîtrise — et celles que toute la classe devine en silence.",
    points: ['Maîtrise par compétence, par élève et par classe', 'Détection des erreurs récurrentes', "Progression suivie sur l'année"],
  },
  {
    icon: 'target',
    title: 'Des exercices nés des vraies erreurs',
    body: "Chaque élève reçoit un travail ciblé sur sa lacune réelle, pas une fiche générique. Entièrement modifiable, imprimable ou assignable en un clic.",
    points: ['Des fiches ciblées en quelques minutes', 'Chaque exercice modifiable', 'Assigner, imprimer ou exporter vers votre ENT'],
  },
]

export function Pillars() {
  return (
    <section id="teachers" className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Conçu par des enseignants, pour des enseignants"
            title={
              <>
                Trois enseignants ont créé cet outil après <span className="gradient-text">un dimanche de corrections</span>{' '}
                interminable.
              </>
            }
            sub="VH.IA n'est pas une IA générique qu'on aurait pointée sur une copie de maths. L'outil est pensé à partir de la façon dont les maths s'enseignent, se corrigent et se réexpliquent."
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

/* ------------------------------------------------------------- le produit */

const tabs = [
  {
    id: 'grading',
    label: 'Correction IA',
    icon: 'pen',
    title: 'Une correction qui explique les maths',
    body: "VH.IA lit l'écriture, suit le raisonnement en plusieurs étapes et corrige comme un professeur de maths : la méthode, pas seulement le résultat. Chaque commentaire cite l'étape d'où il vient.",
    bullets: [
      "Lecture de l'écriture manuscrite à 95 %, ratures comprises",
      'Crédit partiel intelligent sur les solutions en plusieurs étapes',
      'Barèmes alignés sur CCSS, TEKS ou les référentiels que vous collez',
    ],
    mock: <GradingMock />,
  },
  {
    id: 'insights',
    label: 'Analyses',
    icon: 'chart',
    title: 'Dépassez la note, suivez les apprentissages',
    body: "Chaque question est rattachée à une compétence : une pile de copies devient une carte de ce que vos élèves maîtrisent vraiment — et de ce qu'il faut reprendre.",
    bullets: [
      'Maîtrise par compétence, élève, classe et période',
      "Détection des schémas d'erreurs : la même faute, sur des dizaines de copies",
      "Progression suivie de la première à la dernière séquence",
    ],
    mock: <InsightsMock />,
  },
  {
    id: 'practice',
    label: 'Exercices ciblés',
    icon: 'target',
    title: 'La différenciation en minutes, pas en soirées',
    body: "Transformez les données d'évaluation en action. VH.IA génère des exercices à partir des erreurs de chaque élève, puis vous laisse la main : tout modifier, assigner ou imprimer.",
    bullets: [
      'Des exercices qui ciblent la vraie erreur de compréhension',
      'Chaque énoncé modifiable, avec le corrigé joint',
      'Assigner en ligne, imprimer ou pousser vers votre ENT',
    ],
    mock: <PracticeMock />,
  },
  {
    id: 'assistant',
    label: 'Assistant IA',
    icon: 'chat',
    title: 'Un assistant qui connaît votre classe',
    body: "Demandez une entrée en matière sur la compétence fragile de la semaine, un plan de reprise pour six élèves ou un contrôle de rattrapage calqué sur le vôtre. L'assistant répond avec vos données, pas avec du contenu générique.",
    bullets: [
      'Chaque réponse s\'appuie sur vos évaluations et vos référentiels',
      'Rédige entraînements, plans de reprise et contrôles de rattrapage',
      "N'invente jamais une note ni le travail d'un élève",
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
            eyebrow="Le produit"
            title={
              <>
                Deux fois moins de correction. <span className="gradient-text">Deux fois plus de retours.</span>
              </>
            }
            sub="Un seul flux de travail, quatre métiers : corriger, comprendre, agir et préparer la suite."
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
              <a href="#correction" className="btn btn-primary mt-7 px-6 py-3 text-sm">
                L'essayer sur un de vos contrôles
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

/* ----------------------------------------------------------- témoignages */

const quotes = [
  {
    quote:
      "J'ai corrigé le même contrôle pour deux classes en une heure de disponibilité, et les commentaires étaient plus précis que ceux que j'ai le temps d'écrire d'habitude.",
    name: 'Dana Whitfield',
    role: 'Professeure · Algèbre II',
    tone: 'bg-grape',
  },
  {
    quote:
      "La vue par compétence a changé mon enseignement. J'ai arrêté de refaire toute la séquence et j'ai ciblé les deux étapes qui bloquaient vraiment.",
    name: 'Marcus Ellery',
    role: 'Coordinateur de mathématiques',
    tone: 'bg-sky',
  },
  {
    quote:
      "On me donne une fiche construite sur ce que mes élèves ont raté, et je peux encore modifier chaque question. Cet équilibre, c'est tout l'intérêt.",
    name: 'Priya Raman',
    role: 'Géométrie & Algèbre I',
    tone: 'bg-mint',
  },
]

export function Testimonials() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Pourquoi ils restent"
            title="Les retours sont la raison"
            sub="Les premiers utilisateurs nous ont dit la même chose : les commentaires se lisent comme s'ils venaient d'un enseignant, parce que le barème derrière est celui d'un enseignant."
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

/* ------------------------------------------------------------ intégrations */

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
  'Export CSV',
  'Impression & scan',
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
                eyebrow="Intégrations"
                title="Là où vous enseignez déjà"
                sub="Importez des copies, synchronisez les listes, exportez les notes. L'installation prend quelques minutes, sans ticket au service informatique."
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
              Et 15 autres plateformes ENT/SIS, plus un flux papier pour tout le reste.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- confidentialité */

const compliance = ['FERPA', 'COPPA', 'RGPD', 'SOC 2 Type II', 'Lois locales sur les données']

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
                  Données des élèves
                </span>
                <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
                  Le travail des élèves n'est jamais une donnée d'entraînement.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/80">
                  VH.IA a été conçu pour des mineurs : la confidentialité est une contrainte de conception depuis le
                  premier jour, pas une page de politique ajoutée après coup. Copies, commentaires et listes restent dans
                  l'espace de votre établissement, sont chiffrés en transit et au repos, et sont supprimés selon votre
                  calendrier.
                </p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    'Aucun entraînement de modèle sur les copies',
                    "Données propriété de l'établissement, exportables à tout moment",
                    "Accès par rôle avec journal d'audit",
                    'Durées de conservation par établissement',
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

/* ------------------------------------------------------------------- CTA */

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
                Corrigez une classe ce soir.
                <br />
                <span className="gradient-text">Décidez demain matin.</span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                Importez une pile de copies scannées, regardez VH.IA les corriger et gardez chaque commentaire qui vous
                plaît. Sans carte bancaire, sans appel d'onboarding, sans installation.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#start" className="btn btn-primary px-7 py-3.5 text-[15px]">
                  Commencer — 30 jours gratuits
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
                <a href="#correction" className="btn btn-secondary px-7 py-3.5 text-[15px]">
                  Réserver une démo de 20 minutes
                </a>
              </div>
              <p className="mt-4 text-xs text-muted">
                Conforme FERPA et COPPA · Résiliable à tout moment · Fonctionne avec des copies imprimées ou scannées
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
