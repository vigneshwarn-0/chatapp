import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { auth, db } from "../firebase.js";

export const Chat = (props) => {
    const { room } = props;
    const [newmessage, setnewmessage] = useState("");
    const messageRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryMessage = query(
          
            messageRef,
             where("room", "==",room),
             orderBy('createAt'),
           
             );
     const unsubscribe=onSnapshot(queryMessage, (snapshot) => {
            let fetchedMessages = []; // Use a different variable name
            snapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
               
             
            });
            setMessages(fetchedMessages);
        });
        return ()=>unsubscribe()
   }, [room]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
  
        if (newmessage === "") return;
        await addDoc(messageRef, {
            text: newmessage,
            createAt:serverTimestamp(),
            user: auth.currentUser.displayName,
            room
        });

        setnewmessage("");
    }

    return (
   <div className="chat-app">
    <div className="header">
    <h1 className="">Room:<span>{room}</span></h1>
    </div>
<div className="messages">
{messages.map((message) =>(
             <div className="message" key={message.id}>
              <span className="user">{message.user}:</span>
              {message.text}
                </div>
             ))}
</div>
 <form onSubmit={handleSubmit} className="new-message-form">
          
            <input
            className="new-message-input"
                onChange={(e) => setnewmessage(e.target.value)}
                value={newmessage}
                placeholder='type your message' />
            <button type='submit' className="send-button">sent</button>
        </form>
        </div>
        
       
    );
}
