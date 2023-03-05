import { useEffect, useRef } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { grain, initCanvas, randomPalette, shuffle } from '../utils'

function init(canvas: HTMLCanvasElement) {
  const { ctx } = initCanvas(canvas)
  const size = 400

  const rectPos = { x: 0, y: 40, width: 30, heigth: 40 }

  function move() {
    gsap.to(rectPos, {
      duration: 3,
      ease: 'pow',
      x: 400,
      onUpdate: () => {
        draw()
      },
    })
    // the other stuff
  }

  function draw() {
    ctx.fillRect(rectPos.x, rectPos.y, rectPos.width, rectPos.y)
  }

  move()
}

function Circles() {
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

export default Circles
