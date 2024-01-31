
import './App.css';
import { Auth } from "../src/components/Auth.js"
import { useState,useRef } from 'react';
import Cookies from "universal-cookie"
import { Chat } from './components/chatpage.js';
import{signOut} from "firebase/auth"
import { auth } from "./firebase.js"

const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-result"))
  const [room, setroom] = useState(null)
  const signUserOut= async()=>{
  await signOut(auth)
  console.log("signout")
  cookies.remove('auth-token')
  setIsAuth(false)
  setroom(null)
  }
  const roomInputRef=useRef()
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>

    );
  }
  return(
    <>
     <div>
    {room ? (
      <Chat room={room}/>
    ) : (
      <div className='roompage' >
      
        <label>Enter room name:</label>
        <input className='roominput' placeholder='Enter your room' ref={roomInputRef}></input>
        <button className='enterchat' onClick={()=>setroom(roomInputRef.current.value)}>enter chat</button>
        </div>)}
      <div>
    <button className='signout' onClick={signUserOut}>sign out</button>
  </div>
  </div>

    </>
 
  )

}

export default App;
