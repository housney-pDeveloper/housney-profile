import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsap'
import { setMeshMood } from '@/canvas/meshBus'
import { useReducedMotion } from '@/providers/MotionProvider'
import { useSplitReveal } from '@/motion/useSplitReveal'
import { EmailCta } from '@/ui/EmailCta'
import { profile } from '@/content/profile'

export function Contact() {
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const headRef = useSplitReveal<HTMLHeadingElement>()

  useGSAP(
    () => {
      if (reduced || !root.current) return
      gsap.fromTo(
        root.current,
        { yPercent: -12, autoAlpha: 0.85 },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'top 45%',
            scrub: 1,
            onEnter: () => setMeshMood({ intensity: 0.9, temperature: 0.6 }),
          },
        },
      )
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <footer ref={root} id="contact" className="relative mx-auto max-w-5xl scroll-mt-24 px-6 pb-24 pt-40 text-center md:px-10">
      <h2 ref={headRef} className="font-display text-4xl font-medium tracking-tight text-mesh-text md:text-7xl">
        {profile.contact.headline}
      </h2>
      <p className="mt-6 text-lg text-mesh-copy">{profile.contact.sub}</p>
      <div className="mt-12">
        <EmailCta email={profile.contact.email} />
      </div>
      <p className="mono-label mx-auto mt-24 max-w-md normal-case tracking-normal text-mesh-muted">
        {profile.contact.meta}
      </p>
      <p className="mono-label mt-6">© 2026 LEE HYEONSU</p>
    </footer>
  )
}
