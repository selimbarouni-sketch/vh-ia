import { Icon, Logo } from './ui'

const columns = [
  {
    title: 'Produit',
    links: ['Correction IA', 'Analyses actionnables', 'Exercices ciblés', 'Assistant IA', 'Tarifs'],
  },
  {
    title: 'Ressources',
    links: ['Blog', 'Tutoriels', 'Webinaires', 'Formation enseignants', "Centre d'aide"],
  },
  {
    title: 'Intégrations',
    links: ['Canvas', 'Google Classroom', 'Schoology', 'Clever', 'Toutes les intégrations'],
  },
  {
    title: 'Entreprise',
    links: ['À propos', 'Carrières', 'Contact', 'Confidentialité', 'Conditions'],
  },
]

export default function Footer() {
  return (
    <footer className="relative mt-6 rounded-t-[2.5rem] bg-inkdeep px-6 pb-10 pt-16 text-white sm:px-12">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <span className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
                <Icon name="sparkle" className="h-5 w-5 text-butter" />
              </span>
              <span className="text-xl font-extrabold tracking-tight">VH.IA</span>
            </span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Correction, analyses et exercices pour les professeurs de mathématiques. Conçu par des enseignants, en
              classe, pour les soirées que vous préférez garder.
            </p>
            <div className="mt-6 flex gap-2.5">
              {['LinkedIn', 'Instagram', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold uppercase tracking-wider text-white/50">{col.title}</p>
                <ul className="mt-4 grid gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[13.5px] text-white/75 transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} VH.IA Labs. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
            <span>Conditions</span>
            <span>Confidentialité</span>
            <span>Conditions de vente</span>
            <span className="text-white/70">Français (FR)</span>
          </div>
        </div>

        <p className="mt-10 text-center text-[13px] font-semibold tracking-tight text-white/40">
          L'enseignement est humain. La paperasse ne doit pas l'être.
        </p>
      </div>
    </footer>
  )
}
