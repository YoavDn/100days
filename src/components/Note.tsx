import { ReactNode, useState } from 'react'

interface props {
  children: ReactNode
}

export const Note = ({ children }: props) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="p-2 px-4 z-10 border-gray-200 border text-gray-500 text-lg  fixed left-1/2 bottom-0 font-mono  -translate-x-1/2"
      >
        <h2>i</h2>
      </div>

      <main
        onClick={() => setShow(!show)}
        className={`fixed h-screen w-full z-10 bg-black/20 duration-150 ease ${
          show
            ? 'opacity-1 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } `}
      ></main>
      <div
        className={`p-12 text-gray-600 max-w-lg flex flex-col gap-4 leading-7 shadow-md z-20 fixed left-1/2 bottom-0 -translate-x-1/2 font-mono duration-150 ease bg-white  ${
          show
            ? 'translate-y-[0%] pointer-events-auto'
            : 'translate-y-[100%] pointer-events-none'
        } `}
      >
        {children}
      </div>
    </>
  )
}
