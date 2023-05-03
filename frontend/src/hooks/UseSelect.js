import {useState} from "react";

export default function useSelect(){
    const [checked, setChecked] = useState([]);

    var isChecked = (id) => checked.includes(id)
    const handleCheck = (id) => {
        return () => {
            var updatedList = [...checked];
            if (isChecked(id)) {
                updatedList.splice(checked.indexOf(id), 1);
            } else {
                updatedList = [...checked, id];
            }
            setChecked(updatedList);
        }
    };

    return {handleCheck, isChecked, checked, setChecked}
}