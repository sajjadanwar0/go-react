import React, {SyntheticEvent, useState} from 'react'
import {Wrapper} from "../components/Wrapper";
import '../Login.css'
import axios from 'axios'
import {Navigate} from "react-router-dom";
export const Register = () => {

    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [PasswordConfirm, setPasswordConfirm] = useState('')
    const handleSubmit=async (e:SyntheticEvent)=>{
        e.preventDefault()
        await axios.post('register', {
            first_name:FirstName,
            last_name:LastName,
            email:Email,
            password:Password,
            password_confirm:PasswordConfirm
        })

    }

    return (

        <Wrapper>
                <main className="form-signin w-100 m-auto">
                    <form onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Register</h1>
                        <input type="text" className="form-control"
                               onChange={e => setFirstName(e.target.value)} placeholder="First Name" required/>
                        <input type="text" className="form-control" onChange={e => setLastName(e.target.value)}
                               placeholder="Last Name" required/>

                        <input type="email" className="form-control" onChange={e => setEmail(e.target.value)}
                               placeholder="name@example.com"/>
                        <input type="password" onChange={e => setPassword(e.target.value)}
                               className="form-control" placeholder="Password"/>
                        <input type="password" className="form-control"
                               onChange={e => setPasswordConfirm(e.target.value)}
                               placeholder="Confirm Password"/>

                        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                    </form>
                </main>
    </Wrapper>)
}
