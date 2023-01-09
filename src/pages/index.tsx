import { Link } from 'react-router-dom'
import { Note } from '../components/Note'

const links = [
  { url: '/tilling', title: 'Tiles', number: '01' },
  { url: '/dvd', title: 'DVD', number: '02' },
  { url: '/plum', title: "Antfu's plum", number: '03' },
]

export default function () {
  return (
    <>
      <Note>
        <p>
          This Site is inspired by Tim Holman's killer JS Conf talk
          <span className="italic"> "Generative Art Speedrun" </span>
          You should Check it out
        </p>
        <div className="flex gap-6 text-md font-thin">
          <a
            className="text-gray-400 hover:text-gray-800 duration-150 ease"
            href="https://www.youtube.com/watch?v=pvZiB7NkT8M&t=9078s"
          >
            Tim's Talk
          </a>
          <a
            className="text-gray-400 hover:text-gray-800 duration-150 ease"
            href="https://github.com/YoavDn/gen-art-newbie"
          >
            Project source
          </a>
        </div>
      </Note>
      <div className="page">
        <div className="index-page centered">
          <h1 className="font-mono text-gray-800 font-bold mb-6 text-lg ">
            Generative Art Newbie
          </h1>
          <pre className="grid gap-y-1 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {links.map(link => (
              <li
                key={link.number}
                className="text-gray-400  block mr-4 list-none hover:text-gray-700 duration-150 ease-in-out group/link"
              >
                <Link to={link.url}>
                  <span className="text-gray-300 group-hover/link:text-gray-400 duration-150 ease-in-out mr-2">
                    {link.number}
                  </span>
                  {link.title}
                </Link>
              </li>
            ))}
          </pre>
        </div>
      </div>
    </>
  )
}
