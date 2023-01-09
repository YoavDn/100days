import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { initCanvas } from '../utils'

const { random } = Math

const draw = (
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  height: number,
  width: number
) => {
  ctx.clearRect(0, 0, width, height)

  for (let x = 0; x <= width / tileSize; x++) {
    for (let y = 0; y <= height / tileSize; y++) {
      let isToLeft = random() <= 0.5

      const xOff = x * tileSize
      const yOff = y * tileSize
      console.log(isToLeft)
      ctx.beginPath()

      if (isToLeft) {
        ctx.moveTo(xOff, yOff)
        ctx.lineTo(xOff + tileSize, yOff + tileSize)
      } else {
        ctx.moveTo(xOff + tileSize, yOff)
        ctx.lineTo(xOff, yOff + tileSize)
      }

      ctx.stroke()
    }
  }
}

export default function () {
  const el = useRef<HTMLCanvasElement | null>(null)
  const [tileSize, setTileSize] = useState(3)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas
    draw(ctx, width / tileSize, width, height)
  }, [tileSize])

  return (
    <>
      <main className="page">
        <Link className="link" to={'/'}>
          Back
        </Link>
        <div className="centered">
          <canvas
            onClick={() => setTileSize(tileSize + 1)}
            className="canvas"
            style={{ width: '400px', height: '400px' }}
            ref={el}
          ></canvas>
        </div>
      </main>
    </>
  )
}
