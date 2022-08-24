import React, {SyntheticEvent, useState} from 'react';
import {Wrapper} from "../components/Wrapper";
import axios from "axios";
import {Navigate} from "react-router-dom";
export const Login = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[redirectUser,setRedirectUser]=useState(false)

    const handleSubmit=async (e:SyntheticEvent)=>{
        e.preventDefault()
         await axios.post('login',{
            email,
            password,
        })
        setRedirectUser(true)

    }
    if(redirectUser){
        return<Navigate to={'/'}/>
    }
    return (
        <Wrapper>
            <main className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Login</h1>
                    <input type="email" className="form-control" onChange={e => setEmail(e.target.value)}
                           placeholder="name@example.com"/>
                    <input type="password" onChange={e => setPassword(e.target.value)}
                           className="form-control" placeholder="Password"/>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </main>
        </Wrapper>
    );
};

