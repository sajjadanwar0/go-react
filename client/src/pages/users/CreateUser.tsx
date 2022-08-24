import React, {SyntheticEvent, useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import axios from "axios";
import {RoleType} from "../../models/roleType";
import {Navigate} from "react-router-dom";

export const CreateUser=()=>{
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [roleId,setRoleId]=useState('')
    const [roles,setRoles]=useState([])
    const [redirect,setRedirect]=useState(false)
    const handleSubmit=async (e:SyntheticEvent)=>{
        e.preventDefault()
        await axios.post('users', {
            first_name:FirstName,
            last_name:LastName,
            email:Email,
            role_id:roleId
        })
        setRedirect(true)
    }

    useEffect(()=>{
        (
            async ()=>{
                const {data}=await axios.get("roles")
                setRoles(data)
            }
        )()
    },[])

    if(redirect){
        return <Navigate to={"/users"}/>
    }
    return(
        <Wrapper>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3">Register</h1>
                    <div className="mb-3">
                        <label>First Name</label>
                        <input type="text" className="form-control"
                               onChange={e => setFirstName(e.target.value)} placeholder="First Name" required/>
                    </div>
                    <div className="mb-3">
                        <label>Last Name</label>
                    <input type="text" className="form-control" onChange={e => setLastName(e.target.value)}
                           placeholder="Last Name" required/>
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={e => setEmail(e.target.value)}
                               placeholder="Email" required/>
                    </div>
                    <div className="mb-3">
                        <label>Role</label>
                         <select className="form-control" onChange={e=>setRoleId(e.target.value)}>
                             {roles.map((role:RoleType)=>{
                                 return(
                                     <option key={role.id} value={role.id}>{role.name}</option>
                                 )
                             })}

                         </select>
                    </div>
                    <button className=" btn btn-sm btn-primary" type="submit">Submit</button>
                </form>

            </div>
        </Wrapper>
    )
}
