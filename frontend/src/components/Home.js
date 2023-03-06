import React from 'react';
import api, {API_BASE_URL} from "../http/Api";
import axios from "axios";

const Home = () => {

    const config = {
        headers: {
            //Authorization: "21131",
        }
    }

    const hello = async () => {
        console.log(await api.post("/auth/login", {username: "Alex", password: "y"}))
        console.log(await api.get("/hello"))
    }


    return (
        <>
            <div>
                Home
            </div>
            <button onClick={hello}> press </button>
        </>
    );
}

export default Home;