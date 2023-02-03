import { useEffect, useRef } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { initCanvas, lerp } from '../utils'

function draw(ctx: CanvasRenderingContext2D) {
  const size = 400

  ctx.beginPath()
  ctx.moveTo(200, 0)
  ctx.lineTo(200, 400)
  ctx.moveTo(0, 200)
  ctx.lineTo(400, 200)
  ctx.arc(size / 2, size / 2, 100, 0, Math.PI * 2)
  ctx.stroke()

  const angleStep = (Math.PI * 2) / 3

  ctx.beginPath()
  for (let i = 0; i <= 3; i++) {
    const x = 200 + Math.cos(i * angleStep) * 100
    const y = 200 + Math.sin(i * angleStep) * 100

    ctx.lineTo(x, y)
    // ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.stroke()
  }
}

function Circles() {
  const el = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)

    draw(ctx)
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
