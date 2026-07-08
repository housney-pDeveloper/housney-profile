import { useLenis } from '@/providers/LenisProvider'
import { profile } from '@/content/profile'

export function Nav() {
  const lenis = useLenis()
  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = `#${id}`
    if (lenis) lenis.scrollTo(target, { offset: -80 })
    else document.querySelector(target)?.scrollIntoView()
  }
  return (
    <nav className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
      <div className="glass-border flex items-center gap-1 rounded-full p-1.5 backdrop-blur-xl">
        <a href="#top" onClick={e => go(e, 'top')} className="px-3 py-1.5 font-mono text-sm font-bold text-mesh-accent">
          HS
        </a>
        {profile.nav.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={e => go(e, item.id)}
            className="hidden rounded-full px-3.5 py-1.5 text-sm text-mesh-copy transition-colors hover:bg-white/8 hover:text-mesh-text md:block"
          >
            {item.label}
          </a>
        ))}
        <a
          href={`mailto:${profile.contact.email}`}
          className="rounded-full bg-mesh-text px-4 py-1.5 text-sm font-medium text-[#020617]"
        >
          ✉
        </a>
      </div>
    </nav>
  )
}
