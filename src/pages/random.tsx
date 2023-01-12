import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { initCanvas, plusOrMinus, randomColor } from '../utils'
import { useRafLoop } from 'react-use'

const { random, floor } = Math

let steps: Function[] = []
let prevSteps: Function[] = []
let iterations = 0

function Webs() {
  const el = useRef<HTMLCanvasElement | null>(null)
  const [stopLoop, startLoop] = useRafLoop(frame, false)

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
    let lineWidth = 0
    ctx.lineCap = 'round'

    const step = (x: number, y: number, color: string) => {
      iterations++
      const nx = x + random() * 10 * plusOrMinus()
      const ny = y + random() * 10 * plusOrMinus()

      const cx = (x + nx) / 2
      const cy = (y + ny) / 2

      if (iterations % 10 === 0) {
        lineWidth = (lineWidth % 3) + 1
      }
      ctx.strokeStyle = `#${color}`
      ctx.lineWidth = lineWidth
      ctx.beginPath()
      ctx.save()
      ctx.moveTo(x, y)

      ctx.lineTo(nx, ny)
      ctx.lineJoin = 'bevel'

      ctx.stroke()

      if (x > width + 100 || x < -100 || y > height + 100 || y < -100) {
        return
      }

      //   if (random() <= 0.5 || iterations < 100) {
      //     steps.push(() => step(nx, ny, randomColor()))
      //   }
      //   if (random() <= 0.5 || iterations < 100) {
      //     steps.push(() => step(nx, ny, randomColor()))
      //   }
      steps.push(() => step(nx, ny, randomColor()))
    }
    const start = () => {
      stopLoop()
      prevSteps = []
      steps = [
        () => step(0, 200, randomColor()),
        () => step(200, 0, randomColor()),
        () => step(200, 400, randomColor()),
        () => step(400, 200, randomColor()),
      ]
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
          <canvas className="canvas" ref={el}></canvas>
        </div>
      </main>
    </>
  )
}
export default Webs
