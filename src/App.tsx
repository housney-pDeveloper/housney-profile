import { MotionProvider } from '@/providers/MotionProvider'
import { MeshField } from '@/canvas/MeshField'

export default function App() {
  return (
    <MotionProvider>
      <MeshField />
      <main className="relative">{/* sections mount here */}</main>
    </MotionProvider>
  )
}
