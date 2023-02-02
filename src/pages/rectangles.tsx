import { useEffect, useRef, useState, ChangeEvent } from 'react'
import {
  ChevronLeftIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import {
  grain,
  initCanvas,
  plusOrMinus,
  randomPalette,
  range,
  shuffle,
} from '../utils'

async function draw(ctx: CanvasRenderingContext2D) {
  const size = 400
  const blockSize = size / 4
  ctx.lineWidth = 2
  const colors = randomPalette()

  for (let y = blockSize / 2; y < size; y += blockSize) {
    for (let x = blockSize / 2; x < size; x += blockSize) {
      ctx.save()

      ctx.translate(x - blockSize / 2, y - blockSize / 2)
      ctx.beginPath()

      if (Math.random() > 0.5) {
        p3(blockSize)
      } else {
        p2(blockSize)
      }
      ctx.restore()
    }
  }

  function p2(blockSize: number) {
    const change50 = Math.random() > 0.5
    const tileSize = blockSize / 20

    for (let y = tileSize / 2; y < blockSize; y += tileSize) {
      for (let x = tileSize / 2; x < blockSize; x += blockSize / 2) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
        if (change50) {
          ctx.beginPath()
          ctx.fillRect(0, y - tileSize / 2, blockSize, tileSize)
          continue
        }
        ctx.beginPath()
        ctx.fillRect(
          x - tileSize / 2,
          y - tileSize / 2,
          blockSize / 2,
          tileSize
        )
        ctx.fill()
        ctx.stroke()
      }
    }
  }

  function p3(blockSize: number) {
    const chance50 = Math.random() > 0.5
    // const step = blockSize / Math.floor(range(7, 14))
    const step = blockSize / 20

    for (let i = step / 2; i < blockSize; i += blockSize / 2) {
      for (let j = step / 2; j < blockSize; j += step) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
        if (chance50) {
          ctx.beginPath()
          ctx.fillRect(j - step / 2, 0, step, blockSize)
          continue
        }
        ctx.beginPath()
        ctx.fillRect(j - step / 2, i - step / 2, j, blockSize / 2)
        ctx.fill()
        ctx.stroke()
      }
    }
  }

  grain(size, ctx)
}

function Sketch() {
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
          <canvas className="canvas " ref={el}></canvas>
        </div>
      </main>
    </>
  )
}

export default Sketch
