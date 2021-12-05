import React from "react"
import Entry from "./Entry"
import Game from "./Game"

function App() {
  const [joinedGame, setJoinedGame] = React.useState(false)
  const server = ""

  function connectServer (ip) {
    console.log(ip)
  }

  return (
    <div className="bg-yellow-200 w-screen h-screen">
      { joinedGame ? <Game/> : <Entry connectServer={connectServer}/> }
    </div>
  );
}

export default App;
