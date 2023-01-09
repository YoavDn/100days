import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRafLoop } from 'react-use'
import { initCanvas, polar2cart, r15, r180, r90 } from '../utils'

const f = {
  start: () => {},
  step: (x: number, y: number, r: number) => {},
}

let steps: Function[] = []
let prevSteps: Function[] = []
let iterations = 0

export default function () {
  const el = useRef<HTMLCanvasElement | null>(null)
  const { random } = Math
  const [test, setTest] = useState(0)

  const [init, setInit] = useState(5)
  const [len, setLen] = useState(5)
  const [stopped, setStopped] = useState(false)

  const frame = () => {
    iterations += 1
    prevSteps = steps
    steps = []
    if (!prevSteps.length) {
      loopStop()
      setStopped(true)
    }
    prevSteps.forEach(i => i())
  }
  const [loopStop, loopStart] = useRafLoop(frame, false)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas
    console.log(width)

    f.step = (x: number, y: number, rad: number) => {
      const length = random() * len
      const [nx, ny] = polar2cart(x, y, length, rad)
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(nx, ny)
      ctx.stroke()
      const rad1 = rad + random() * r15
      const rad2 = rad - random() * r15
      if (nx < -100 || nx > 500 || ny < -100 || ny > 500) return
      if (iterations <= init || random() > 0.5)
        steps.push(() => f.step(nx, ny, rad1))
      if (iterations <= init || random() > 0.5)
        steps.push(() => f.step(nx, ny, rad2))
    }

    f.start = () => {
      loopStop()
      iterations = 0
      ctx.fillRect(0, 0, width, height)
      ctx.lineWidth = 1
      ctx.strokeStyle = 'white'
      prevSteps = []
      steps =
        random() < 0.5
          ? [
              () => f.step(0, random() * 400, 0),
              () => f.step(400, random() * 400, r180),
            ]
          : [
              () => f.step(random() * 400, 0, r90),
              () => f.step(random() * 400, 400, -r90),
            ]
      loopStart()
      setStopped(false)
    }
    f.start()
  }, [])

  return (
    <>
      <div className="page">
        <Link
          className="absolute  text-gray-300 font-mono top-5 left-5 hover:text-gray-500"
          to={'/'}
        >
          Back
        </Link>
        <div className="centered">
          <canvas className="canvas" onClick={f.start} ref={el}></canvas>
        </div>
      </div>
    </>
  )
}
