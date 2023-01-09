import { Outlet, Link } from 'react-router-dom'

const links = [
  { url: '/tilling', title: 'tiles', number: '01' },
  { url: '/dvd', title: 'DVD', number: '02' },
  { url: '/plum', title: "Antfu's plum", number: '03' },
]

export default function () {
  return (
    <>
      <div className="page">
        <div className="index-page centered">
          <h1 className="font-mono font-bold mb-4 text-lg ">100 Challenge</h1>
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
