import React from "react"
import { io } from "socket.io-client"

import Entry from "./Entry"
import Chat from "./Chat"

// cited from https://stackoverflow.com/questions/37122818/test-if-socket-is-open-and-listening-node-socket-io
function checkSocketIoConnect(url, timeout) {
    return new Promise(function(resolve, reject) {
        var errAlready = false;
        timeout = timeout || 5000;
        var socket = io(url, {reconnection: false, timeout: timeout});

        // success
        socket.on("connect", function() {
            clearTimeout(timer);
            resolve();
            socket.close();
        });

        // set our own timeout in case the socket ends some other way than what we are listening for
        var timer = setTimeout(function() {
            timer = null;
            error("local timeout");
        }, timeout);

        // common error handler
        function error(data) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            if (!errAlready) {
                errAlready = true;
                reject(data);
                socket.disconnect();
            }
        }

        // errors
        socket.on("connect_error", error);
        socket.on("connect_timeout", error);
        socket.on("error", error);
        socket.on("disconnect", error);

    });
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      joinedGame: false,
      socket: null, 
      messageList: []
     }
  }

  connectServer = (name) => {
    checkSocketIoConnect("http://localhost:3333", 2000).then(() => {
      var socket = io("http://localhost:3333", { transports : ['websocket'] })
      this.setState({ name: name })
      socket.emit("name", name)
      socket.on("message", msg => this.receiveMessage(msg))
      
      this.setState({ joinedGame: true, socket: socket })
    }).catch(err => {
      alert(err)
    })
  }

  receiveMessage = (msg) => {
    let newList = this.state.messageList
    newList.push({ name: msg.split(':')[0], content: msg.split(':')[1] })
    this.setState({ messageList: newList })
  }

  sendMessage = (msg) => {
    this.state.socket.emit("message", this.state.name + ':' + msg)
  }

  render() {
    return (
      <div className="bg-yellow-200 w-screen h-screen">
        { this.state.joinedGame ? <Chat sendMessage={this.sendMessage} messageList={this.state.messageList}/>
        : <Entry connectServer={this.connectServer}/> }
      </div>
    )
  }
}

export default App;
