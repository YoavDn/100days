import { useEffect, useRef, useState, ChangeEvent } from 'react'
import {
  ChevronLeftIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { grain, initCanvas, plusOrMinus, shuffle } from '../utils'
import { useRafLoop } from 'react-use'

const { cos, sin } = Math

async function draw(ctx: CanvasRenderingContext2D) {
  const size = 400

  ctx.rect(20, 20, 20, 20)
  ctx.stroke()
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
