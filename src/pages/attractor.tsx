import { useEffect, useRef, useState } from 'react'
import {
  ChevronLeftIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { initCanvas, randomPalette } from '../utils'
import { useRafLoop } from 'react-use'

const { cos, sin } = Math

async function draw(ctx: CanvasRenderingContext2D, size: number, step = 10) {
  const palette = await randomPalette()
  const blockSize = size / step

  for (let y = blockSize / 2; y < size; y += blockSize) {
    for (let x = blockSize / 2; x < size; x += blockSize) {
      ctx.beginPath()
      ctx.fillStyle = palette[Math.floor(Math.random() * palette.length - 1)]
      ctx.fillRect(x - blockSize / 2, y - blockSize / 2, blockSize, blockSize)
      ctx.stroke()
    }
  }
}

function Sketch() {
  const el = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const size = 400

    draw(ctx, size)
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

export default Sketch
