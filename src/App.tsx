import { useState } from 'react'
import { MotionProvider } from '@/providers/MotionProvider'
import { LenisProvider } from '@/providers/LenisProvider'
import { MeshField } from '@/canvas/MeshField'
import { Nav } from '@/ui/Nav'
import { Rail } from '@/ui/Rail'
import { Preloader } from '@/sections/Preloader'
import { Hero } from '@/sections/Hero'
import { IdentityShift } from '@/sections/IdentityShift'
import { Declaration } from '@/sections/Declaration'
import { CareerTimeline } from '@/sections/CareerTimeline'
import { WorkIntro } from '@/sections/WorkIntro'
import { FieldBackend } from '@/sections/FieldBackend'
import { FieldDatabase } from '@/sections/FieldDatabase'
import { ChapterSystems } from '@/sections/ChapterSystems'
import { ChapterAX } from '@/sections/ChapterAX'
import { Contact } from '@/sections/Contact'

export default function App() {
  const [booted, setBooted] = useState(false)
  return (
    <MotionProvider>
      <LenisProvider>
        <MeshField />
        <div className="progressive-blur-top" aria-hidden="true"><i /><i /><i /></div>
        <Nav />
        <Rail />
        <Preloader onComplete={() => setBooted(true)} />
        <main className="relative">
          <Hero booted={booted} />
          <IdentityShift />
          <Declaration />
          <CareerTimeline />
          <WorkIntro />
          <FieldBackend />
          <FieldDatabase />
          <ChapterSystems />
          <ChapterAX />
          <Contact />
        </main>
      </LenisProvider>
    </MotionProvider>
  )
}
