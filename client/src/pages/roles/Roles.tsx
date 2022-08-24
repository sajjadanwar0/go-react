import React, {useEffect, useState} from 'react';
import {Wrapper} from "../../components/Wrapper";
import axios from "axios";
import {Link} from "react-router-dom";
import {RoleType} from "../../models/roleType";

export const Roles=()=> {
    const [roles, setRoles] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`roles?page=${page}`)
                setRoles(data?.data)
                setLastPage(data?.meta?.last_page)
            }
        )()
    }, [page])


    const next = () => {
        if (page < lastPage) {
            setPage(page + 1)
        }
    }
    const previous = () => {
        if (page >= 1) {
            setPage(page - 1)
        }
    }

    const del = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this record ?")) {
            await axios.delete(`roles/${id}`)
            setRoles(roles.filter((u: RoleType) => u.id !== id))
        }
    }
    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={"/roles/create"} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <h5>Roles</h5>
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {roles?.map((role: RoleType) => {
                        return (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>
                                    <div className="btn-group  mr-2">
                                        <Link to={`/roles/${role?.id}/edit`}
                                              className="btn btn-sm  btn-outline-secondary">
                                            Update
                                        </Link>
                                        <a href="#" className="btn btn-sm  btn-outline-secondary"
                                           onClick={() => del(Number(role.id))}>Delete
                                        </a>

                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <nav>
                <ul className={"pagination"}>
                    <li className="page-item" onClick={previous}>
                        <a href="#" className="page-link">Previous</a>
                    </li>
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={next}>Next</a>
                    </li>
                </ul>
            </nav>

        </Wrapper>
    )
}
