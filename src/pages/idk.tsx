import { useEffect, useRef, useState, ChangeEvent } from 'react'
import {
  ChevronLeftIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { grain, initCanvas, plusOrMinus, shuffle } from '../utils'
import { useRafLoop } from 'react-use'

const { cos, sin } = Math

async function draw(
  ctx: CanvasRenderingContext2D,
  size: number,
  file: File,
  step = 10
) {
  const blockSize = size / step
  const img = new Image()
  const blob = URL.createObjectURL(file)
  img.src = blob

  console.log(blockSize)
  let imgsData: ImageData[] = []

  function init() {
    ctx.drawImage(img, 0, 0, size, size)

    for (let y = blockSize / 2; y < size; y += blockSize) {
      for (let x = blockSize / 2; x < size; x += blockSize) {
        // const rotateAmt = (Math.PI / 180) * 1 * plusOrMinus()
        imgsData.push(
          ctx.getImageData(
            x - blockSize / 2,
            y - blockSize / 2,
            blockSize * 2,
            blockSize * 2
          )
        )
      }
    }
    grain(size, ctx)

    imgsData = shuffle(imgsData)
    ctx.clearRect(0, 0, size, size)

    let idx = 0
    for (let y = blockSize / 2; y < size; y += blockSize) {
      for (let x = blockSize / 2; x < size; x += blockSize) {
        idx++
        console.log(idx)

        ctx.putImageData(imgsData[idx - 1], x, y)
      }
    }

    grain(size, ctx)
  }

  img.onload = () => init()
}

function Sketch() {
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
    const size = 400

    if (!file) return
    draw(ctx, size, file)
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

export default Sketch
