export function initCanvas(
  canvas: HTMLCanvasElement,
  width = 400,
  height = 400,
  _dpi?: number
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

  const dpi = _dpi || dpr / bsr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpr * width
  canvas.height = dpr * height
  ctx.scale(dpi, dpi)

  return { ctx, dpi }
}
