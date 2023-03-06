import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useDispatch} from "react-redux";
import {setIsAuthAction} from "./store/UserReducer";
import {ACCESS_TOKEN_LS} from "./Consts";
import {BruhNavBar} from "./components/BruhNavBar";

function App() {

    ///TODO
    const dispatch = useDispatch()
    dispatch(setIsAuthAction(localStorage.getItem(ACCESS_TOKEN_LS) != null))

    return (
        <BrowserRouter>
            <BruhNavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
