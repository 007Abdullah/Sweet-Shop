import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState, useGlobalStateUpdate } from "./../context/globalContext";
import {
    useHistory
} from "react-router-dom";
import data from "./products/productsitem";
import Main from "./Cart/Main";
import LogoutButton from "./logoutButton";

function Dashboard() {

    let url = 'http://localhost:5000'
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();

    let history = useHistory()
    const { products } = data

    const onAdd = (product) => {

    }

    return (
        <>
            <LogoutButton />            <h1>Dashboard</h1>
            <div className="row1">
                <Main products={products} onAdd={onAdd} />
            </div>
            {globalState.user ?
                <div>
                    <h2>{globalState.user.name}</h2>
                </div> : null}


            {'===>' + JSON.stringify(globalState)}

        </>
    )
}

export default Dashboard;