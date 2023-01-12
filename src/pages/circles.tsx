import { useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { initCanvas, plusOrMinus, r360, randomColor } from '../utils'
const { random, sin, cos, floor, sqrt } = Math

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
      let circle: CircleType = { x: 0, y: 0, r: 0 }
      let circleSafeToDraw = false
      for (let i = 0; i < totalCircles; i++) {
        circle = {
          x: floor(random() * width),
          y: floor(random() * width),
          r: minR,
        }

        if (doesCircleHaveACollision(circle)) {
          continue
        } else {
          circleSafeToDraw = true
          break
        }
      }

      if (!circleSafeToDraw) {
        return
      }

      for (let r = minR; r < maxR; r++) {
        circle.r = r
        if (doesCircleHaveACollision(circle)) {
          circle.r--
          break
        }
      }

      circles.push(circle)
      ctx.beginPath()
      ctx.arc(circle.x, circle.y, circle.r, 0, r360)
      //   ctx.fillStyle = `#${randomColor()}`
      //   ctx.fill()
      ctx.stroke()
    }

    function doesCircleHaveACollision(circle: CircleType) {
      for (let i = 0; i < circles.length; i++) {
        const a = circle.r + circles[i].r
        const x = circle.x - circles[i].x
        const y = circle.y - circles[i].y

        if (a >= sqrt(x * x + y * y)) return true
      }

      return false
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
