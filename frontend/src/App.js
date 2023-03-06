import './App.css';
import {Button} from 'react-bootstrap'
import {useCallback} from "react";
import {login} from "./services/AuthService";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {

    // const onClick = useCallback((event) => {
    //     const response = login("Alex", "y");
    //     console.log(response);
    // }, [])
    //
    // onClick(null)

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
