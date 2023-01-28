import { useEffect, useRef, useState } from 'react'
import {
  ChevronLeftIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import {
  deg2Rad,
  getDistance,
  grain,
  initCanvas,
  randomPalette,
} from '../utils'
import { useRafLoop } from 'react-use'

const { cos, sin } = Math

async function draw(ctx: CanvasRenderingContext2D, size: number, step = 10) {
  const palette = await randomPalette()
  const blockSize = size / step

  //   ctx.save()
  ctx.translate(0, 0)
  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, size, size)
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
