import { initCanvas, plusOrMinus } from '../utils'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useState, useRef, useEffect } from 'react'

function draw(
  ctx: CanvasRenderingContext2D,
  size: number,
  w: number,
  h: number
) {
  for (let i = size; i <= h - size; i += size) {
    for (let j = size; j <= w - size; j += size) {
      const rotateAmt =
        (((j / w) * Math.PI) / 90) * plusOrMinus() * Math.random() * (size / 2)
      const translateAmt = ((j / w) * plusOrMinus() * Math.random() * size) / 2
      ctx.save()
      ctx.translate(i + translateAmt + size / 3, j + size / 3)
      ctx.rotate(rotateAmt)
      //   ctx.rotate(rotateAmt)
      //   ctx.rotate(rotateAmt)
      ctx.beginPath()

      ctx.rect(-size / 2, -size / 2, size, size)
      ctx.stroke()
      ctx.restore()
    }
  }
}

function CubicDisarray() {
  const el = useRef<HTMLCanvasElement | null>(null)
  const [nCubes, setNCubes] = useState(19)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas

    draw(ctx, width / nCubes, width, height)
  }, [nCubes])
  return (
    <>
      <div className="page">
        <Link className="link" to={'/'}>
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <main className="centered">
          <canvas
            onClick={() => setNCubes((nCubes % 20) + 1)}
            className="canvas"
            ref={el}
          ></canvas>
        </main>
      </div>
    </>
  )
}
export default CubicDisarray
