import { Mascot, Icon } from './ui'
import { GradingMock } from './mocks'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* décor de fond */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(124,107,255,.35),transparent_65%)] blur-2xl" />
        <div className="absolute -right-24 top-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(34,179,239,.28),transparent_65%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-lilac2" />
      </div>

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            Correction par IA pour le secondaire et le supérieur
          </span>

          <h1 className="mt-5 max-w-[15ch] text-balance text-[2.6rem] font-extrabold leading-[1.03] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.1rem]">
            Chaque évaluation corrigée.
            <br />
            <span className="gradient-text">Chaque erreur expliquée.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink2 sm:text-lg">
            VH.IA corrige les évaluations de mathématiques manuscrites, suit les raisonnements en plusieurs étapes et
            attribue le crédit partiel comme vous le feriez — puis transforme chaque erreur en exercices ciblés. Rien
            n'arrive à l'élève avant votre validation.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href="#start" className="btn btn-primary px-7 py-3.5 text-[15px]">
              Corriger ma première classe
              <Icon name="arrow" className="h-4 w-4" />
            </a>
            <a href="#correction" className="btn btn-secondary px-7 py-3.5 text-[15px]">
              <Icon name="play" className="h-4 w-4" />
              Corriger un exemple
            </a>
          </div>

          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] text-muted lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-3.5 w-3.5 text-mint" /> Aucune installation
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-3.5 w-3.5 text-mint" /> Compatible avec vos devoirs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-3.5 w-3.5 text-mint" /> Gratuit pendant 30 jours
            </span>
          </p>

          <div className="mt-9 flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {[
                { initials: 'JD', tone: 'bg-grape' },
                { initials: 'MK', tone: 'bg-sky' },
                { initials: 'RS', tone: 'bg-mint' },
                { initials: 'AL', tone: 'bg-[#f08a5d]' },
              ].map((a) => (
                <span
                  key={a.initials}
                  className={`grid h-8 w-8 place-items-center rounded-full text-[10px] font-bold text-white ring-2 ring-lilac ${a.tone}`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <p className="text-left text-xs leading-snug text-muted">
              <span className="font-bold text-ink">1 400+ départements de mathématiques</span>
              <br />
              corrigent avec VH.IA chaque semaine
            </p>
          </div>
        </div>

        {/* visuel */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-white/40 blur-2xl" aria-hidden="true" />
          <div className="relative animate-float-slow">
            <GradingMock />
          </div>

          <div className="card absolute -bottom-8 -left-2 hidden w-[190px] rotate-[-4deg] p-3.5 sm:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Temps gagné</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
              3,4<span className="text-sm font-bold text-muted"> h</span>
            </p>
            <p className="text-[10px] leading-snug text-muted">par enseignant, par semaine</p>
            <div className="mt-2 flex h-8 items-end gap-1" aria-hidden="true">
              {[35, 55, 42, 70, 58, 88, 76].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-grape/25 to-grape"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="absolute -right-3 -top-6 hidden h-24 w-24 sm:block">
            <Mascot className="h-24 w-24 animate-float" />
          </div>
        </div>
      </div>
    </section>
  )
}
