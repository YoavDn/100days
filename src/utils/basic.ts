export const range = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const deg2Rad = (angle: number) => (angle * Math.PI) / 180

export const shuffle = (arr: any[]) => [...arr].sort(() => 0.5 - Math.random())
