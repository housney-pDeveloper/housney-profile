import { useState } from 'react'
import { MotionProvider } from '@/providers/MotionProvider'
import { LenisProvider } from '@/providers/LenisProvider'
import { MeshField } from '@/canvas/MeshField'
import { Preloader } from '@/sections/Preloader'
import { Hero } from '@/sections/Hero'
import { IdentityShift } from '@/sections/IdentityShift'
import { ChapterAX } from '@/sections/ChapterAX'
import { RewindStrip } from '@/sections/RewindStrip'
import { ChapterSystems } from '@/sections/ChapterSystems'
import { ChapterData } from '@/sections/ChapterData'
import { Timeline } from '@/sections/Timeline'
import { Capabilities } from '@/sections/Capabilities'
import { profile } from '@/content/profile'

export default function App() {
  const [booted, setBooted] = useState(false)
  return (
    <MotionProvider>
      <LenisProvider>
        <MeshField />
        <Preloader onComplete={() => setBooted(true)} />
        <main className="relative">
          <Hero booted={booted} />
          <IdentityShift />
          <ChapterAX />
          <RewindStrip {...profile.rewinds[0]} />
          <ChapterSystems />
          <RewindStrip {...profile.rewinds[1]} />
          <ChapterData />
          <Timeline />
          <Capabilities />
        </main>
      </LenisProvider>
    </MotionProvider>
  )
}
