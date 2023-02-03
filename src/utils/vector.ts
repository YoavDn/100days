export type Vector = [number, number]

export const r180 = Math.PI
export const r90 = Math.PI / 2
export const r60 = Math.PI / 3
export const r30 = Math.PI / 6
export const r15 = Math.PI / 12
export const r120 = (Math.PI / 3) * 2
export const r360 = Math.PI * 2

export const SQRT_3 = Math.sqrt(3)
export const SQRT_2 = Math.sqrt(2)

export function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
  const dx = r * Math.cos(theta)
  const dy = r * Math.sin(theta)
  return [x + dx, y + dy]
}

export function getDistance(x1: number, x2: number, y1: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

export const plusOrMinus = () => (Math.random() < 0.5 ? 1 : -1)

export const lerp = (a: number, b: number, pct: number) => a + pct * (b - a)
