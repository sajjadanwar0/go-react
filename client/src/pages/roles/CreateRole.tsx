import React, {SyntheticEvent, useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {PermissionType} from "../../models/permissionType";

export const CreateRole = () => {
    const [name, setName] = useState('')
    const [permissions, setPermissions] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [selectedPermissions,setSelectedPermissions]=useState([] as string[])
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await axios.post('roles', {
            name,
            "permissions":selectedPermissions,
        })
        setRedirect(true)
    }

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("permissions")
                setPermissions(data)
            }
        )()
    }, [])

    const checkPermission=(id:string)=>{
        if(selectedPermissions.some(s=>s===id)){
            setSelectedPermissions(selectedPermissions.filter(s=>s!==id))
            return
        }
          setSelectedPermissions([...selectedPermissions,id])
    }

    if (redirect) {
        return <Navigate to={"/roles"}/>
    }
    return (
        <Wrapper>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3">Register</h1>
                    <div className="mb-3">
                        <label> Name</label>
                        <input type="text" className="form-control"
                               onChange={e => setName(e.target.value)} placeholder=" Name" required/>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Permissions</label>
                        <div className="col-sm-10">
                            {permissions.map((p: PermissionType) => {
                                return (
                                    <div className="form-check  form-check-inline col-3"
                                    key={p.id}
                                    ><input
                                        onChange={()=>checkPermission(p.id.toString())}
                                        value={p.id}
                                        className="form-check-input" type={"checkbox"}/><label
                                        className={"form-check-label"}>
                                        {p.name}
                                    </label></div>
                                )
                            })}

                        </div>
                    </div>
                    <button className=" btn btn-sm btn-primary" type="submit">Submit</button>
                </form>

            </div>
        </Wrapper>
    )
}
