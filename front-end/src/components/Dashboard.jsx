import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from "./../context/globalContext";
import {
    useHistory
} from "react-router-dom";
// import LogoutButton from "./logoutButton";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Basket from './Basket';
import { Prev } from 'react-bootstrap/esm/PageItem';
import { set } from 'mongoose';


function Dashboard() {

    let url = 'http://localhost:5000'
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    const [produt, setProducts] = useState([]);
    const [cartItem, setCartItem] = useState([]);

    const [show, ShowHide] = useState(true);


    let history = useHistory()
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/getProducts',
            withCredentials: true
        }).then((response) => {
            // console.log(response.data.data)
            setProducts(response.data.products)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    console.log(produt)

    function aDD(e, index) {
        console.log('index', index);
        console.log("cart is ", cartItem);
        const exist = cartItem.find((x) => x._id === e._id)
        if (exist) {
            setCartItem(
                cartItem.map((x) =>
                    x._id === e._id ? { ...exist, stock: exist.stock + 1 } : x
                )
            )
            // var prevProducts = [...cartItem];
            // prevProducts[index].stock =  prevProducts[index].stock + 1;
            // setCartItem(prevProducts);


        } else {
            setCartItem([...cartItem, { ...e, stock: 1 }])

        }




    }

    function remove(e, index) {
        const exist = cartItem.find((x) => x._id === e._id);
        if (exist.stock === 1) {
            setCartItem(cartItem.filter((x) => x._id !== e._id));
        }
        else {
            setCartItem(
                cartItem.map((x) =>
                    x._id === e._id ? { ...exist, stock: exist.stock - 1 } : x
                )
            )
        }

    }

    function removeItem(e, index) {
        const remove = cartItem.splice(index)
        setCartItem(
            cartItem.map((x) =>
                x._id === e._id ? { ...remove, stock: remove.stock - 1 } : x
            )
        )
    }

    function changeState() {
        ShowHide(Prev => !Prev)
    }



    return (
        <>

            <a className="btn btn-outline-success" onClick={changeState}
                style={{ float: 'right' }}><i class="fas fa-cart-plus mr-3" /><span>{cartItem.length}</span><span className="sr-only">(current)</span></a>
            <MDBRow>

                {show === true ? <main className="container">
                    <h1 className="text-center mt-1 ">Products</h1>
                    <div className="row">
                        {produt.map((e, index) => (
                            <div className="col-md-3 mt-3" key={e.id}>
                                <div>
                                    <img className="w-100" height="200" src={e.productimages[0]} alt={e.productname} />
                                    <h3>{e.productname}</h3>
                                    <p class="card-text">{e.description}</p>
                                    <div>PKR: {e.price}/- Per kg</div>
                                    <div>
                                        <button className="btn btn-primary" onClick={() => aDD(e, index)}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main> :

                    <Basket cartItem={cartItem} aDD={aDD} remove={remove} removeItem={removeItem} />}
            </MDBRow>
        </>
    )
}

export default Dashboard;