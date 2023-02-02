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
      //   ctx.rect(0, 0, blockSize, blockSize)
      //   ctx.stroke()
      //   ctx.beginPath()

      if (Math.random() > 0.5) {
        p3(blockSize)
      } else {
        p2(blockSize)
      }
      ctx.restore()
    }
  }

  function p2(blockSize: number) {
    const tileSize = blockSize / 20

    for (let y = tileSize / 2; y < blockSize; y += tileSize) {
      for (let x = 0; x < blockSize; x += blockSize / 2) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
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
    const step = blockSize / Math.floor(range(7, 14))

    for (let i = step / 2; i < blockSize; i += step) {
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      ctx.beginPath()
      ctx.fillRect(i - step / 2, 0, step, blockSize)
      ctx.fill()
      ctx.stroke()
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
