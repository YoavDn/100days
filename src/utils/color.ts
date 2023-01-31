import { range } from './basic'
import colors from '../../palettes/100.json'

export const randomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16)
}

export function randomPalette() {
  if (!colors) {
    throw new Error("something went wrong, can't get colors")
  }

  return colors[Math.floor(range(0, colors.length))]
}
