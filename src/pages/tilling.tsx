import { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

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

  for (let x = 0; x < width; x += tileSize) {
    for (let y = 0; y < height; y += tileSize) {
      const isToLeft = random() >= 0.5

      ctx.beginPath()
      if (isToLeft) {
        ctx.moveTo(x, y)
        ctx.lineTo(x + tileSize, y + tileSize)
      } else {
        ctx.moveTo(x + tileSize, y)
        ctx.lineTo(x, y + tileSize)
      }

      ctx.stroke()
    }
  }
}

function Tilling() {
  const el = useRef<HTMLCanvasElement | null>(null)
  const [tileSize, setTileSize] = useState(2)

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
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div className="centered">
          <canvas
            onClick={() => setTileSize((tileSize % 30) + 1)}
            className="canvas"
            style={{ width: '400px', height: '400px' }}
            ref={el}
          ></canvas>
          <p className="font-mono py-3 text-gray-500">Tiles: {tileSize}</p>
        </div>
      </main>
    </>
  )
}
export default Tilling
