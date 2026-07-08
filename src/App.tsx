import { useState } from 'react'
import { MotionProvider } from '@/providers/MotionProvider'
import { LenisProvider } from '@/providers/LenisProvider'
import { MeshField } from '@/canvas/MeshField'
import { Preloader } from '@/sections/Preloader'
import { Hero } from '@/sections/Hero'
import { IdentityShift } from '@/sections/IdentityShift'
import { ChapterAX } from '@/sections/ChapterAX'

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
        </main>
      </LenisProvider>
    </MotionProvider>
  )
}
