import { useEffect, useRef } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { grain, initCanvas,  randomPalette, shuffle } from '../utils'

// const { random, floor } = Math


function draw(ctx: CanvasRenderingContext2D) {
  const size = 400
  let colors = randomPalette()
  ctx.lineWidth = 3

  const count = 3
  const angleStep = (Math.PI * 2) / count

  function polygon(count: number) {
    for (let i = 1; i <= count; i++) {
      colors = shuffle(colors)
      // ctx.fillStyle = colors[floor(random() * colors.length)]
      const x = 0 + Math.cos(i * angleStep) * 100
      const y = 0 + Math.sin(i * angleStep) * 100

      ctx.fillStyle = colors[0]
      ctx.save()
      ctx.beginPath()
      ctx.arc(x, y, 100, 0, Math.PI * 2)
      ctx.fill()
      ctx.moveTo(x, y)
      ctx.fillStyle = colors[1]
      ctx.fillRect(x - 100 / 2, y - 100 / 2, 100, 100)
      ctx.stroke()
      ctx.restore()
    }
  }

  for (let i = 0; i < 10; i++) {
    polygon(20)
  }

  grain(size, ctx)
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
