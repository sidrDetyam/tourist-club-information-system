import {useState} from "react";

export default function useRadioSelect(){
    const [checked, setChecked] = useState(null);

    const isChecked = (ind) => {
        return checked === ind;
    }

    const handleCheck = (ind) => () => {
        if (isChecked(ind)) {
            setChecked(null)
        } else {
            setChecked(ind)
        }
    }

    return {handleCheck, isChecked, checked, setChecked}
}