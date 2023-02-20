import { range } from './basic'
export function initCanvas(
  canvas: HTMLCanvasElement,
  width = 400,
  height = 400
) {
  const ctx = canvas.getContext('2d')!

  const dpr = window.devicePixelRatio || 1
  const bsr =
    // @ts-expect-error
    ctx.webkitBackingStorePixelRatio ||
    // @ts-expect-error
    ctx.mozBackingStorePixelRatio ||
    // @ts-expect-error
    ctx.msBackingStorePixelRatio ||
    // @ts-expect-error
    ctx.oBackingStorePixelRatio ||
    // @ts-expect-error
    ctx.backingStorePixelRatio ||
    1

  const dpi = dpr / bsr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpr * width
  canvas.height = dpr * height
  ctx.scale(dpi, dpi)

  return { ctx, dpi }
}

export function grain(size: number, ctx: CanvasRenderingContext2D) {
  ctx.save()
  //making the texture
  for (let i = 0; i < size - 1; i += 2) {
    for (let j = 0; j < size - 1; j += 2) {
      const grey = Math.floor(range(205 - 40, 205 + 30))
      ctx.fillStyle = 'rgba(' + grey + ',' + grey + ',' + grey + ', .1)'
      _rect(ctx, { x: i, y: j, w: 2, h: 2 })
    }
  }
  //making some gray darker dots
  for (let i = 0; i < 30; i++) {
    const grey = Math.floor(range(130, 215))
    const opacity = (range(100, 170) / 255).toFixed(2)
    ctx.fillStyle =
      'rgba(' + grey + ',' + grey + ',' + grey + ', ' + opacity + ')'
    _rect(ctx, {
      x: range(0, size - 2),
      y: range(0, size - 2),
      w: range(1, 3),
      h: range(1, 3),
    })
  }

  ctx.restore()
}

function _rect(
  ctx: CanvasRenderingContext2D,
  pos: { x: number; y: number; w: number; h: number }
) {
  const { x, y, w, h } = pos
  ctx.fillRect(x - w / 2, y - h / 2, w, h)
}
