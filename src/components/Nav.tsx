import { useEffect, useRef, useState } from 'react'
import { cx, Icon, Logo } from './ui'

type MenuItem = { title: string; desc: string; icon: string; href: string }

const MENUS: Record<string, MenuItem[]> = {
  Produit: [
    { title: 'IA de correction', desc: 'Lit la copie, attribue le crédit partiel.', icon: 'pen', href: '#correction' },
    { title: 'Analyses actionnables', desc: 'La maîtrise par compétence, pas juste une note.', icon: 'chart', href: '#insights' },
    { title: 'Exercices ciblés', desc: 'Des activités construites sur les vraies erreurs.', icon: 'target', href: '#practice' },
    { title: 'Assistant IA', desc: 'Un assistant qui connaît votre classe.', icon: 'chat', href: '#assistant' },
  ],
  Solutions: [
    { title: 'Pour les enseignants', desc: 'Retrouvez vos soirées.', icon: 'users', href: '#teachers' },
    { title: 'Pour les équipes', desc: 'Barèmes et bilans partagés.', icon: 'layers', href: '#integrations' },
    { title: 'Pour les établissements', desc: 'Déploiement, formation et conformité.', icon: 'shield', href: '#privacy' },
  ],
  Ressources: [
    { title: 'Blog', desc: 'Recherche sur la correction et notes de classe.', icon: 'book', href: '#' },
    { title: 'Tutoriels', desc: 'Démonstrations courtes, de A à Z.', icon: 'play', href: '#' },
    { title: 'Webinaires', desc: 'Sessions en direct avec des enseignants.', icon: 'users', href: '#' },
    { title: "Centre d'aide", desc: 'Réponses, guides et support.', icon: 'chat', href: '#' },
  ],
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null)
        setMobile(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="container-page">
        <div
          ref={navRef}
          className={cx(
            'flex items-center justify-between gap-4 rounded-full px-3 py-2.5 transition-all duration-300 sm:px-4',
            scrolled || open || mobile
              ? 'bg-white/85 shadow-[0_18px_40px_-30px_rgba(27,20,53,.6)] ring-1 ring-line backdrop-blur-xl'
              : 'bg-transparent',
          )}
        >
          <a href="#top" className="shrink-0" aria-label="Accueil VH.IA">
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {Object.keys(MENUS).map((key) => (
              <div key={key} className="relative" onMouseEnter={() => setOpen(key)}>
                <button
                  type="button"
                  onClick={() => setOpen((cur) => (cur === key ? null : key))}
                  aria-expanded={open === key}
                  className={cx(
                    'flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
                    open === key ? 'bg-lilac text-grape' : 'text-ink2 hover:text-grape',
                  )}
                >
                  {key}
                  <Icon name="chevron" className={cx('h-3.5 w-3.5 transition-transform', open === key && 'rotate-180')} />
                </button>
                {open === key ? (
                  <div
                    onMouseLeave={() => setOpen(null)}
                    className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-3"
                  >
                    <div className="grid gap-1 rounded-3xl bg-white p-3 shadow-[0_30px_70px_-40px_rgba(27,20,53,.65)] ring-1 ring-line">
                      {MENUS[key].map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setOpen(null)}
                          className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-lilac2"
                        >
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-lilac text-grape transition-colors group-hover:bg-grape group-hover:text-white">
                            <Icon name={item.icon} className="h-4.5 w-4.5" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-ink">{item.title}</span>
                            <span className="block text-xs leading-relaxed text-muted">{item.desc}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
            <a href="#correction" className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink2 hover:text-grape">
              Démo
            </a>
            <a href="#pricing" className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink2 hover:text-grape">
              Tarifs
            </a>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href="#" className="rounded-full px-3 py-2 text-sm font-semibold text-ink2 hover:text-grape">
              Se connecter
            </a>
            <a href="#start" className="btn btn-primary px-5 py-2.5 text-sm">
              Commencer gratuitement
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobile((v) => !v)}
            aria-label={mobile ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobile}
            className="grid h-10 w-10 place-items-center rounded-full bg-grape text-white lg:hidden"
          >
            <Icon name={mobile ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>

        {mobile ? (
          <div className="mt-2 max-h-[75vh] overflow-y-auto rounded-3xl bg-white p-4 shadow-[0_30px_70px_-40px_rgba(27,20,53,.6)] ring-1 ring-line lg:hidden">
            {Object.entries(MENUS).map(([key, items]) => (
              <div key={key} className="border-b border-line/70 py-3 last:border-0">
                <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-grape">{key}</p>
                <div className="grid gap-0.5">
                  {items.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobile(false)}
                      className="flex items-center gap-3 rounded-xl px-1.5 py-2 text-sm font-medium text-ink2 hover:bg-lilac2"
                    >
                      <Icon name={item.icon} className="h-4 w-4 text-grape" />
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex gap-2 pt-4">
              <a href="#start" onClick={() => setMobile(false)} className="btn btn-primary flex-1 px-5 py-3 text-sm">
                Commencer
              </a>
              <a href="#" className="btn btn-secondary flex-1 px-5 py-3 text-sm">
                Se connecter
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
