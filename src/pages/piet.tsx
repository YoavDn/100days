import { useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { initCanvas, polar2cart, r360 } from '../utils'

type SquareType = {
  x: number
  y: number
  width: number
  height: number
  color?: string
}
const squares: SquareType[] = []

function Piet() {
  const el = useRef<HTMLCanvasElement | null>(null)
  //   const [step, setStep] = useState(20)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas
    ctx.lineWidth = 8
    const step = width / 6

    const white = '#F2F5F1'
    const colors = ['#D40920', '#1356A2', '#F7D842']

    squares.push({ x: 0, y: 0, width, height })

    function splitSquaresWith(coordinates: any) {
      const { x, y } = coordinates

      for (let i = squares.length - 1; i >= 0; i--) {
        const square = squares[i]

        if (x && x > square.x && x < square.x + square.width) {
          if (Math.random() > 0.5) {
            squares.splice(i, 1)
            splitOnX(square, x)
          }
        }

        if (y && y > square.y && y < square.y + square.height) {
          if (Math.random() > 0.5) {
            squares.splice(i, 1)
            splitOnY(square, y)
          }
        }
      }
    }

    function splitOnX(square: SquareType, splitAt: number) {
      const squareA = {
        x: square.x,
        y: square.y,
        width: square.width - (square.width - splitAt + square.x),
        height: square.height,
      }

      const squareB = {
        x: splitAt,
        y: square.y,
        width: square.width - splitAt + square.x,
        height: square.height,
      }

      squares.push(squareA)
      squares.push(squareB)
    }

    function splitOnY(square: SquareType, splitAt: number) {
      const squareA = {
        x: square.x,
        y: square.y,
        width: square.width,
        height: square.height - (square.height - splitAt + square.y),
      }

      const squareB = {
        x: square.x,
        y: splitAt,
        width: square.width,
        height: square.height - splitAt + square.y,
      }

      squares.push(squareA)
      squares.push(squareB)
    }

    for (let i = 0; i < width; i += step) {
      splitSquaresWith({ y: i })
      splitSquaresWith({ x: i })
    }

    function draw() {
      for (let i = 0; i < colors.length; i++) {
        squares[Math.floor(Math.random() * squares.length)].color = colors[i]
      }
      for (let i = 0; i < squares.length; i++) {
        ctx.beginPath()
        ctx.rect(
          squares[i].x,
          squares[i].y,
          squares[i].width,
          squares[i].height
        )
        if (squares[i].color) {
          ctx.fillStyle = squares[i].color!
        } else {
          ctx.fillStyle = white
        }
        ctx.fill()
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
