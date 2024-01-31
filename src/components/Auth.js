import React from 'react'
import { auth, provider } from "../firebase.js"
import { signInWithPopup } from 'firebase/auth'
import Cookies from "universal-cookie"
const cookie = new Cookies()

export const Auth = (props) => {
    const { setIsAuth}=props
    const signInGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookie.set("auth-result", result.user.refreshToken)
            setIsAuth(true)
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div className='auth'>
            <p>signin with google to continue</p>
            <button className='signin' onClick={signInGoogle}>sign in with google</button>
        </div>
    )
}

