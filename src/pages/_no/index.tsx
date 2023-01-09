import './index.scss'
import { Link } from 'react-router-dom'
const COLORS = [
  '#bbf7d0',
  '#99f6e4',
  '#bfdbfe',
  '#ddd6fe',
  '#f5d0fe',
  '#fed7aa',
  '#fee2e2',
]
const TAGS = [
  'HTML',
  'CSS',
  'JavaScript',
  'Typescript',
  'Tailwind',
  'React',
  'Next.js',
  'Gatsby',
  'UI/UX',
  'SVG',
  'animation',
  'webdev',
]
const DURATION = 25000
const ROWS = 5
const TAGS_PER_ROW = 5

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const shuffle = (arr: any[]) => [...arr].sort(() => 0.5 - Math.random())

type sliderProps = {
  children: React.ReactNode
  duration: number
  reverse: boolean
}

const InfiniteLoopSlider = ({
  children,
  duration,
  reverse = false,
}: sliderProps) => {
  const styles = {
    '--duration': `${duration}ms`,
    '--direction': reverse ? 'reverse' : 'normal',
  } as React.CSSProperties
  return (
    <div className="loop-slider" style={styles}>
      <div className="inner">
        {children}
        {children}
      </div>
    </div>
  )
}

const Tag = ({ text }: { text: string }) => (
  <div className="tag">
    <span>#</span> {text}
  </div>
)

const App = () => (
  <div className="app">
    <Link className="absolute top-5 left-5" to={'/'}>
      Back
    </Link>

    <header>
      <h1>Infinite Scroll Animation</h1>
      <p>CSS only, content independent, bi-directional, customizable</p>
    </header>
    <div className="tag-list">
      {[...new Array(ROWS)].map((_, i) => (
        <InfiniteLoopSlider
          key={i}
          duration={random(DURATION - 2000, DURATION + 2000)}
          reverse={!!(i % 2)}
        >
          {shuffle(TAGS)
            .slice(0, TAGS_PER_ROW)
            .map(tag => (
              <Tag text={tag} key={tag} />
            ))}
        </InfiniteLoopSlider>
      ))}
    </div>
  </div>
)

export default function () {
  return (
    <>
      <App />
    </>
  )
}
