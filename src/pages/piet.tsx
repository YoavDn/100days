import { useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { initCanvas, polar2cart, r360 } from '../utils'

type SquareType = { x: number; y: number; width: number; height: number }
const squares: SquareType[] = []

function Piet() {
  const el = useRef<HTMLCanvasElement | null>(null)
  //   const [step, setStep] = useState(20)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas
    ctx.lineWidth = 8
    const step = width / 7

    squares.push({ x: 0, y: 0, width, height })

    function draw() {
      for (let i = 0; i < squares.length; i++) {
        const square = squares[i]
        ctx.beginPath()
        ctx.rect(square.x, square.y, square.width, square.height)
        ctx.stroke()
      }
    }

    draw()
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

export default Piet
