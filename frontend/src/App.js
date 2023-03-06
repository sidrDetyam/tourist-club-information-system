import './App.css';
import {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useDispatch} from "react-redux";
import {setIsAuthAction} from "./store/UserReducer";
import {ACCESS_TOKEN_LS} from "./Consts";

function App() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setIsAuthAction(localStorage.getItem(ACCESS_TOKEN_LS) != null))
    }, [dispatch])

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
