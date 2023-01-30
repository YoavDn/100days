import { useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { initCanvas, polar2cart, randomColor, range, deg2Rad } from '../utils'
import { createNoise2D } from 'simplex-noise'

const draw = (ctx: CanvasRenderingContext2D) => {
  const size = 400

  const makeShape = () => {
    const noise2D = createNoise2D()
    // let x = range(0, 400)
    // let y = range(0, 400)
    let x = 40
    let y = 200
    console.log(noise2D(x, y))
    const color = randomColor()

    const length = Math.random() > 0.5 ? 80 : 160
    const lineCount = range(10, 16)
    const deg = deg2Rad(45 * Math.round(range(1, 10)))
    ctx.strokeStyle = `#${color}`

    for (let i = 0; i < lineCount; i++) {
      for (let j = 1; j <= length; j++) {
        const [nx, ny] = polar2cart(x, y, j, (Math.PI / 180) * -45)
        const r = Math.random() > 0.5 ? (i * range(0, 1)) / 8 : range(0, 1)

        ctx.save()
        ctx.beginPath()
        ctx.arc(nx, ny, r, 0, Math.PI * 2)
        ctx.fill()
        // ctx.moveTo(x, y)
        // ctx.lineTo(nx, ny)
        ctx.stroke()
        ctx.restore()
      }
      ctx.beginPath()

      //   ctx.rect(x, y, 20, 20)
      //   ctx.stroke()

      ctx.strokeStyle = `#${color}`
      x += 20
    }
  }

  makeShape()
}

function Circles() {
  const el = useRef<HTMLCanvasElement | null>(null)
  //   const [step, setStep] = useState(20)

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
