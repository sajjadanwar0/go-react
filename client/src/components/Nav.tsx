import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {UserType} from "../models/userType";


export const Nav = () => {
    const [user, setUser] = useState<UserType>({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
    })

    useEffect(() => {
        (async () => {
            const {data} = await axios.get('user')
            setUser(data)

        })();
    }, [])


    const logout = async () => {
        await axios.post('logout', {})
    }

    const getUser = () => {
        return user?.first_name + ' ' + user?.last_name
    }
    return (
        <nav className="navbar navbar-dark stick-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Navbar</a>
            <ul className="my-2 my-md-0 mr-md-3">
                <Link to={'/profile'}
                      className="p-2  text-white text-decoration-none">{getUser()}</Link>

                <Link to={'/login'} className="p-2 text-white p-2 text-white text-decoration-none"
                      onClick={logout}
                >Signout</Link>
            </ul>
        </nav>
    )
}
