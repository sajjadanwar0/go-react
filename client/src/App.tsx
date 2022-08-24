import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./pages/Dashboard";
import {Users} from "./pages/users/Users";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import {CreateUser} from "./pages/users/CreateUser";
import {UpdateUser} from "./pages/users/UpdateUser";
import {Roles} from "./pages/roles/Roles";
import {CreateRole} from "./pages/roles/CreateRole";
import {UpdateRole} from "./pages/roles/UpdateRole";
import {Products} from "./pages/products/Products";
import {CreateProduct} from "./pages/products/CreateProduct";
import {UpdateProduct} from "./pages/products/UpdateProduct";
import {Orders} from "./pages/orders/orders";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Dashboard/>}/>
                    <Route path={'/users'} element={<Users/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/users/create'} element={<CreateUser/>}/>
                    <Route path={'/users/:id/edit'} element={<UpdateUser/>}/>
                    <Route path={'/roles'} element={<Roles/>}/>
                    <Route path={'/roles/create'} element={<CreateRole/>}/>
                    <Route path={'/roles/:id/edit'} element={<UpdateRole/>}/>
                    <Route path={'/products'} element={<Products/>}/>
                    <Route path={'/products/create'} element={<CreateProduct/>}/>
                    <Route path={'/products/:id/edit'} element={<UpdateProduct/>}/>
                    <Route path={'/orders'} element={<Orders/>}/>
                </Routes>
            </BrowserRouter>

        </div>


    );
}

export default App;
