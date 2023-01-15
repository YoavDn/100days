import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getDistance, initCanvas, randomColor } from '../utils'

function Volonoi() {
  const el = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas
  }, [])
  return (
    <>
      <main className="page">
        <Link className="link" to={'/'}>
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div className="centered">
          <canvas className="canvas" ref={el}></canvas>
        </div>
      </main>
    </>
  )
}

export default Volonoi
