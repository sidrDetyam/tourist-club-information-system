import {Button} from "react-bootstrap";
import CheckIcon from "../components/icons/CheckIcon";
import PlusIcon from "../components/icons/PlusIcon";

const selectorComponentFactory = (selector) => {
    return (index) => {
        const flag = selector.isChecked(index)
        return (<Button variant={flag ? "secondary" : "outline-secondary"}
                        onClick={selector.handleCheck(index)}>
            {flag? <CheckIcon size={20}/> : <PlusIcon size={20}/>}
        </Button>)
    }
}

export default selectorComponentFactory;