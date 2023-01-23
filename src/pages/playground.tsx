import { useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { initCanvas, polar2cart, r360 } from '../utils'

function Circles() {
  const el = useRef<HTMLCanvasElement | null>(null)
  //   const [step, setStep] = useState(20)

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const { width, height } = canvas

    const draw = () => {
      ctx.arc(200, 200, 30, 0, Math.PI * 2)
      ctx.stroke()
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

export default Circles
