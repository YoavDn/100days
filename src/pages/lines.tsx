import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useRafLoop } from 'react-use'
import {
  getDistance,
  initCanvas,
  plusOrMinus,
  polar2cart,
  randomColor,
  Vector,
} from '../utils'
type LineType = Vector[]
const lines: LineType[] = []
let steps: Function[] = []
let prevSteps: Function[] = []
let iterations = 0

function Temp() {
  const el = useRef<HTMLCanvasElement | null>(null)
  const [stopLoop, startLoop, isLoopActive] = useRafLoop(frame, false)

  function frame() {
    prevSteps = steps
    steps = []

    if (!prevSteps.length) {
      stopLoop()
    }

    prevSteps.forEach(i => i())
  }

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas

    const box = { x1: 0, x2: width, y1: 0, y2: height }

    const step = (line: LineType, r: number) => {
      const [x, y] = line[line.length - 1]
      const [nx, ny] = polar2cart(x, y, 3, r)

      line.push([nx, ny])

      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(nx, ny)
      ctx.stroke()

      if (x < box.x1 || x > box.x2 || y < box.y1 || y > box.y2) {
        iterations++
        const randomPoint = Math.floor(Math.random() * line.length)

        const [rx, ry] = line[randomPoint]
        const nr = Math.random() >= 0.5 ? r + Math.PI / 2 : r - Math.PI / 2
        const newLine: LineType = [[rx, ry]]

        lines.push(newLine)
        if (lines.length > 50) return

        steps.push(() => step(newLine, nr))

        return
      }

      steps.push(() => step(line, r))
    }

    const start = () => {
      stopLoop()
      prevSteps = []
      const line: LineType = [[0, height / 2]]
      const line2: LineType = [[width / 2, 0]]
      lines.push(line, line2)
      steps = [() => step(line, 0), () => step(line2, Math.PI / 2)]
      startLoop()
    }
    start()
  }, [])
  return (
    <>
      <main className="page">
        <Link className="link" to={'/'}>
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div className="centered">
          <canvas
            className="canvas"
            onClick={() => (isLoopActive() ? stopLoop() : startLoop())}
            ref={el}
          ></canvas>
        </div>
      </main>
    </>
  )
}

export default Temp
