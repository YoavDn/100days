import { useEffect, useRef, useState, ChangeEvent } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { initCanvas, grain } from '../utils'

function Pixelator() {
  const el = useRef<HTMLCanvasElement | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0])
    }
  }

  useEffect(() => {
    const canvas = el.current!
    const { ctx } = initCanvas(canvas)
    const w = 400
    const h = 400

    const blockSize = 400 / 50
    const img = new Image()

    const draw = () => {
      if (!file) return
      const blob = URL.createObjectURL(file)
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 400, 400)
        grain(canvas, ctx)
        pixelator()
      }
      img.src = blob
    }

    function pixelator() {
      for (let i = blockSize / 2; i < w; i += blockSize) {
        for (let j = blockSize / 2; j < h; j += blockSize) {
          const pixel = ctx.getImageData(j, i, 1, 1)
          const rgb = `rgb(${pixel.data[0]}, ${pixel.data[1]} ,${pixel.data[2]} 
          )`
          ctx.beginPath()
          ctx.fillStyle = rgb
          ctx.fillRect(
            j - blockSize / 2,
            i - blockSize / 2,
            blockSize,
            blockSize
          )
        }
      }
      ctx.clip()
      ctx.drawImage(img, w, h)
    }

    draw()
  }, [file])
  return (
    <>
      <main className="page">
        <Link className="link" to={'/'}>
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div className="centered">
          <input
            onChange={uploadImg}
            type="file"
            accept="image/png, image/jpeg"
            id="input"
            className="opacity-0 w-0 h-0"
            name="input"
          ></input>
          <label
            htmlFor="input"
            className="cursor-pointer relative group/canvas"
          >
            <canvas className="canvas " ref={el}></canvas>
            {!file && (
              <span className="font-mono  text-center sm:invisible sm:group-hover/canvas:visible  z-40 text-gray-500 absolute top-1/2 left-1/2   -translate-x-1/2">
                Click to select an image
              </span>
            )}
          </label>
          <p className="font-mono text-gray-500 py-2">Pixelator</p>
        </div>
      </main>
    </>
  )
}

export default Pixelator
