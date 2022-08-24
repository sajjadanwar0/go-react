import React, {useEffect, useState} from "react";
import {Nav} from "./Nav";
import {Menu} from "./Menu";
import axios from "axios";
import {Navigate} from "react-router-dom";


export const Wrapper = (props: any) => {
    const [redirectUser, setRedirectUser] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                return await axios.get('user')
            } catch (e: any) {
                setRedirectUser(true)

            }

        })();

    }, [])
    useEffect(() => {

        return () => {
            setRedirectUser(false)
        }
    }, [redirectUser])

    if (redirectUser) {
        return <Navigate to="/login"/>
    }

    return (
        <>
            <Nav/>

            <div className="container-fluid">
                <div className="row">
                    <Menu/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    )
}
