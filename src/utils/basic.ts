export const range = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const deg2Rad = (angle: number) => (angle * Math.PI) / 180

export function shuffle<T>(arr: T[]): T[] {
  const array = arr.slice(0)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
