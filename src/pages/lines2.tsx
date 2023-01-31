import { useEffect, useRef } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import {
  deg2Rad,
  grain,
  initCanvas,
  polar2cart,
  randomPalette,
  range,
} from '../utils'

const draw = async (ctx: CanvasRenderingContext2D) => {
  const size = 400
  ctx.fillStyle = '#03001C'
  ctx.fillRect(0, 0, size, size)

  const colors = await randomPalette()

  const makeShape = () => {
    const change50 = Math.random() > 0.5
    const change20 = Math.random() > 0.8

    const length = Math.random() > 0.5 ? 80 : 160
    const lineCount = range(10, 16)

    const deg = deg2Rad(change50 ? 45 : 0)
    ctx.rotate(deg)
    ctx.translate(200, 200)

    let x = range(-size / 2, size / 2)
    const y = range(-size / 2, size / 2)

    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
    for (let i = 0; i < lineCount; i++) {
      for (let j = 1; j <= length; j++) {
        const [nx, ny] = polar2cart(x, y, j, (Math.PI / 180) * -45)
        const r = change20 ? range(0, 2) : (i * range(0, 0.8)) / 10

        ctx.save()
        ctx.beginPath()
        ctx.arc(nx, ny, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      x += 10
    }
    ctx.translate(-200, -200)

    if (change50) {
      ctx.rotate(deg2Rad(-45))
    }
    ctx.restore()
  }

  const shapesCount = Math.floor(range(30, 70))

  for (let i = 0; i < shapesCount; i++) {
    makeShape()
  }

  ctx.fillStyle = 'red'
  ctx.fillRect(size - 50, size - 50, 50, 50)
  ctx.fill()
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
