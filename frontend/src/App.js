import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useDispatch} from "react-redux";
import {setIsAuthAction} from "./store/UserReducer";
import {ACCESS_TOKEN_LS} from "./Consts";
import {BruhNavBar} from "./components/BruhNavBar";
import {useEffect, useState} from "react";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import FullPageLoading from "./components/FullPageLoading";

function App() {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            dispatch(setIsAuthAction(localStorage.getItem(ACCESS_TOKEN_LS) != null))
            setLoading(false)
        }, 3000)

    }, [dispatch])

    if (loading) {
        return (<FullPageLoading loadingText={"Loading"}/>)
    }

    return (
        <BrowserRouter>
            <BruhNavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
