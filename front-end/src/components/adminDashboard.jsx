import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { Button } from 'react-bootstrap';

let url = 'http://localhost:5000'

function AdminDashboard() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: url + '/getorder',
            withCredentials: true
        }).then((response) => {
            // console.log(response.data.data)
            setData(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    // console.log('which come from server', data)


    function updateStatus(id) {
        axios({
            method: 'post',
            url: url + '/updateStatus',
            data: {
                id: id,
                status: "Order confirmed"
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data.message)
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <>
            <MDBContainer>
                <MDBRow>
                    <h1 style={{ textAlign: 'center' }}>My Orders</h1>
                    < MDBTable striped >
                        <MDBTableHead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Orders</th>
                                <th>Total Price</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {data.map((e) => (
                                <tr>
                                    <th key={e._id}>{e._id}</th>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.phonenumber}</td>
                                    <td>{e.address}</td>
                                    <td>{e.status}</td>
                                    <td>{e.orders.length}</td>
                                    <td>{e.totalPrice}</td>
                                    <td><Button onClick={() => {
                                        updateStatus(e._id)
                                    }}>Confirm Order</Button></td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>


                </MDBRow>
            </MDBContainer>
        </>
    )




}

export default AdminDashboard;