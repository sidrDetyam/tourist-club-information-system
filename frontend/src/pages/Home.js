import React from 'react';
import api from "../http/Api";
import {useDispatch} from "react-redux";
import {setIsAuthAction} from "../store/UserReducer";

const Home = () => {

    const hello = async () => {
        console.log(await api.get("/hello"))
    }

    const helloAdmin = async () => {
        console.log(await api.get("/hello/admin"))
    }

    const dispatch = useDispatch()

    return (
        <>
            <div>
                Home
            </div>
            <button onClick={hello}> press </button>
            <button onClick={() => dispatch(setIsAuthAction(false))}> To false </button>
            <button onClick={helloAdmin}> admin </button>
        </>
    );
}

export default Home;