import React from 'react';

const SelectForm = ({onIndexChanged, options}) => {
    return (
        <div>
            <select className={"form-select"}
                    onChange={(event) => onIndexChanged(Number(event.target.value))}>
                {options.map((option, optInd) => (
                    <option key={optInd} value={optInd}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectForm;