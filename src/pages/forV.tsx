import { useEffect, useRef } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { grain, initCanvas, randomPalette, shuffle } from '../utils'

function init(canvas: HTMLCanvasElement) {
  const { ctx } = initCanvas(canvas)
  const size = 400

  ctx.rect(10, 10, 20, 20)
  ctx.stroke()
}

function Canvas() {
  const el = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = el.current!

    init(canvas)
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

export default Canvas
