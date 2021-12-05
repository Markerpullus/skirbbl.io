import React from 'react'

export default function Entry({connectServer}) {
  const ipRef = React.useRef(null)

  return (
    <div className="flex justify-center items-center text-center rounded-md h-screen">
      <div className="w-1/2">
        <div className="my-8 font-sans font-bold text-yellow-500 text-4xl">
          Skirbble.io
        </div>
        <div className="my-5 text-lg">
          <input type="text" ref={ipRef} placeholder="server address"
          className="m-5 p-2 w-80 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:border-transparent focus:ring-yellow-400"/>
          <br />
          <button className="btn" onClick={() => {
            connectServer(ipRef.current.value)
          }}>Join Game</button>
        </div>
      </div>
    </div>
  )
}
