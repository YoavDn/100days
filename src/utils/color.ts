import { shuffle } from './basic'

export const randomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16)
}

export async function randomPalette(size = 1): Promise<string[]> {
  const fileName =
    size > 500 ? '1000' : size > 200 ? 500 : size > 100 ? 200 : 100

  const getColors = async (): Promise<string[][]> => {
    const res = await fetch(`../../palettes/${fileName}.json`)
    const colors = await res.json()
    return colors
  }

  const colors = shuffle(await getColors())

  if (!colors || colors.length === 0) {
    throw new Error("something went wrong, can't get colors")
  }

  return colors[0]
}
