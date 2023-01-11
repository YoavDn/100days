import { useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { initCanvas, plusOrMinus, r360 } from '../utils'
const { random, sin, cos, floor } = Math

type CircleType = { x: number; y: number; r: number }
export default function () {
  const el = useRef<HTMLCanvasElement | null>(null)
  const [step, setStep] = useState(20)
  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas

    const circles: CircleType[] = []
    const minR = 2
    const maxR = width / 4
    const totalCircles = 500

    function createCircle() {
      const circle: CircleType = {
        x: floor(random() * width),
        y: floor(random() * width),
        r: minR,
      }
      circles.push(circle)
      ctx.beginPath()
      ctx.arc(circle.x, circle.y, circle.r, 0, r360)
      ctx.stroke()
    }

    const draw = () => {
      for (let i = 0; i < totalCircles; i++) {
        createCircle()
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
