import { React, useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatWindow = ({ socket, roomId, username }) => {
    let [message, setMessage] = useState("");
    let [messageList, setMessageList] = useState([]);



    let sendMessage = async () => {
        if (message !== "") {
            let data = {
                socketid: socket.id,
                message,
                roomId,
                username,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("sendingMessageToRoom", data);
            setMessageList((list) => [...list, data]);
            setMessage("");
        }
    }

    const handleKeyDownt = (e) => {
        if (e.key == "Enter" && message != "") {
            sendMessage();
        }
    }

    useEffect(() => {
        socket.on("message_responding", (data) => {

            setMessageList((list) => [...list, data]);
        })
    }, [socket])
    return (
        <>
            <div className='d-flex justify-content-center align-items-center p-4 pb-5'>
                <div className='chatWindowOuteDiv'>
                    <div className='head p-4'>
                        <h3>Live chat of {username}</h3>
                    </div>
                    <div className="chat-box">
                        <ScrollToBottom className="toScroll">
                            {
                                messageList.map((messageContent, id) => {
                                    return <div className='d-flex flex-column' key={id}> <div className="message client" id={socket.id !== messageContent.socketid ? 'client' : 'support'}>{messageContent.message}</div>
                                        <div className='d-flex forLeft' id={socket.id !== messageContent.socketid ? 'dateToleft' : 'dateToright'}>
                                            <p className='dateSupport mx-1'>{messageContent.time}</p>
                                            <p className='nameSupport mx-2'>{messageContent.username}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </ScrollToBottom>

                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Type your message..." value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleKeyDownt} />
                        <button className='sendButtong' onClick={sendMessage} ><i className="fas fa-paper-plane"></i></button>
                    </div>
                </div>

            </div >
        </>
    )
}

export default ChatWindow
