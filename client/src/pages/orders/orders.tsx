import React, {useEffect, useState} from 'react';
import {Wrapper} from "../../components/Wrapper";
import {Paginator} from "../../components/Paginator";
import axios from 'axios';
import {OrderType} from "../../models/OrderType";
import {OrderItemType} from "../../models/OrderItemType";

const hide = {
    maxHeight: 0,
    transition: '1000ms ease-in'
}

const show = {
    maxHeight: '150px',
    transition: '1000ms ease-out'
}

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`orders?page=${page}`);

                setOrders(data.data);
                setLastPage(data.meta.last_page);
            }
        )();
    }, [page]);

    const select = (id: number) => {
        setSelected(selected !== id ? id : 0);
    }

    const handleExport = async () => {
        const {data} = await axios.post('export', {}, {responseType: 'blob'});
        const blob = new Blob([data], {type: 'text/csv'});
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders.csv';
        link.click();
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <a href="#" className="btn btn-sm btn-outline-secondary" onClick={handleExport}>Export</a>
            </div>

            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((o: OrderType) => {
                        return (
                            <>
                                <tr key={o.id}>
                                    <td>{o.id}</td>
                                    <td>{o.name}</td>
                                    <td>{o.email}</td>
                                    <td>{o.total}</td>
                                    <td>
                                        <a href="#" className="btn btn-sm btn-outline-secondary"
                                           onClick={() => select(o.id)}
                                        >View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5}>
                                        <div className="overflow-hidden" style={selected === o.id ? show : hide}>
                                            <table className="table table-sm">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product Title</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {o.order_items.map((i: OrderItemType) => {
                                                    return (
                                                        <tr>
                                                            <td>{i.id}</td>
                                                            <td>{i.product_title}</td>
                                                            <td>{i.quantity}</td>
                                                            <td>{i.price}</td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/>
        </Wrapper>
    );
};

