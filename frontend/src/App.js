import './App.css';
import {Button} from 'react-bootstrap'
import {useCallback} from "react";
import {login} from "./services/AuthService";

function App() {

    const onClick = useCallback((event) => {
        const response = login("Alex", "y");
        console.log(response);
    }, [])

    onClick(null)

    return (
        <div className="App">
            <Button onClick={onClick}>
                login
            </Button>
        </div>
    );
}

export default App;
