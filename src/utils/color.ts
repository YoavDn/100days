import { shuffle } from './basic'
import colors from '../../palettes/100.json'

export const randomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16)
}

export function randomPalette(size = 1) {
  if (!colors) {
    throw new Error("something went wrong, can't get colors")
  }

  const palette = shuffle(colors)

  return palette[0]
}
