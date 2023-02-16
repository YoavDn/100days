import { useEffect, useRef } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { grain, initCanvas, randomPalette, shuffle } from '../utils'

// const { random, floor } = Math

function init(ctx: CanvasRenderingContext2D) {
  const colors = randomPalette()
  console.log(colors)
  const size = 400
  let frames = 0
  const amplitude = 100
  const frequency = 0.01
  let phi = 0

  ctx.strokeStyle = 'white'
  ctx.fillStyle = 'pink'
  ctx.lineWidth = 4
  function draw() {
    frames++
    phi = frames / 30

    ctx.clearRect(0, 0, size, size)
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      ctx.moveTo(0, size)
      for (let x = 5; x < size - 5; x++) {
        const y =
          (Math.sin(x * frequency + phi) * amplitude) / 2 + amplitude / 2
        ctx.lineTo(x, y + 200) // 40 = offset
      }
      ctx.lineTo(size, size)
      ctx.lineTo(0, size)
      ctx.stroke()
      ctx.fill()
    }
    window.requestAnimationFrame(draw)
  }

  requestAnimationFrame(draw)
}

function Circles() {
  const el = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)

    init(ctx)
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
