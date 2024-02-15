import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import './App.css'
import { toast } from 'react-toastify';
import ChatWindow from './components/ChatWindow';




const socket = io('http://localhost:8000');
function App() {
  let [name, setName] = useState("");
  let [room, setRoom] = useState("");
  let [showChat, setShowChat] = useState(false);
  let joinTheRoom = (e) => {
    e.preventDefault();
    if (room !== "" && room !== "") {
      socket.emit("join_room", { name, room });
      setShowChat(true);

      
    }
  }

  useEffect(() => {
    socket.on("member_join", ({ name, id }) => {

      toast.info(`${name} joined room.`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });

    })


  }, [socket])
  return (

    <>
      {
        !showChat ? (<div className='d-flex flex-column justify-content-center align-items-center theMainComponet'>
          <div className='shadow-5 p-5 thConatiner'>
            <p className="h1 mb-4">Welcome to the Chatterly !</p>
            <div className='thForm p-4'>
              <form >

                <div data-mdb-input-init className="form mb-4">
                  <label className="form-label" htmlFor="form1Example1">User Name</label>
                  <input type="text" id="form1Example1" className="form-control" autoComplete='off' value={name} onChange={e => setName(e.target.value)} required />
                </div>


                <div data-mdb-input-init className="form mb-4">
                  <label className="form-label" htmlFor="form1Example2">Room Name To Join</label>
                  <input type="text" id="form1Example2" className="form-control" autoComplete="off" value={room} onChange={e => setRoom(e.target.value)} required />
                </div>
                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block" onClick={joinTheRoom}>Join Room</button>
              </form>
            </div>

          </div>

        </div>) : (<ChatWindow username={name} roomId={room} socket={socket} />)
      }



    </>

  )
}

export default App
