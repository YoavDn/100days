import { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { useRafLoop } from 'react-use'
import { initCanvas, randomColor } from '../utils'

const { random } = Math
const rectSize = 20
let speedX = 2
let speedY = 2
const f = {
  init: () => {},
}
let steps: Function[] = []
let prevSteps: Function[] = []

export default function () {
  const el = useRef<HTMLCanvasElement | null>(null)

  const frame = () => {
    prevSteps = steps
    steps = []
    if (!prevSteps.length) {
      stopLoop()
    }
    prevSteps.forEach(i => i())
  }

  const [stopLoop, startLoop, isLoopActive] = useRafLoop(frame, false)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas, 500)
    const { width, height } = canvas

    let x = 0
    let y = 0
    let color = `#${randomColor()}`

    const move = (x: number, y: number) => {
      if (x >= width - rectSize) {
        speedX = -Math.abs(speedX)
        color = `#${randomColor()}`
      }
      if (x <= 0) {
        speedX = Math.abs(speedX)
        color = `#${randomColor()}`
      }
      if (y > height - rectSize) {
        speedY = -Math.abs(speedY)
        color = `#${randomColor()}`
      }
      if (y < 0) {
        speedY = Math.abs(speedY)
        color = `#${randomColor()}`
      }
      const nx = x + speedX
      const ny = y + speedY

      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = color
      ctx.fillRect(x, y, rectSize, rectSize)

      steps.push(() => move(nx, ny))
    }

    f.init = () => {
      stopLoop()
      x = (random() * width) / 2
      y = (random() * width) / 2
      prevSteps = []
      ctx.clearRect(0, 0, width, height)

      steps = [() => move(x, y)]

      startLoop()
    }

    f.init()
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
            ref={el}
            style={{ width: '400px', height: '400px' }}
          ></canvas>
        </div>
      </main>
    </>
  )
}
