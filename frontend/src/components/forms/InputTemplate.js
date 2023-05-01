import React from 'react';
import {Row} from "react-bootstrap";

const defaultWidth = 300
const defaultMargin = 3

const InputTemplate = ({inputs, setInputs, ph, field, maxWidth, margin}) => {
    return (
        <Row className={`mt-${margin?? defaultMargin}`}>
            <div style={{maxWidth: maxWidth?? defaultWidth}}>
                <input value={inputs[field] === null ? "" : inputs[field]}
                       onChange={e => {
                           const obj = {...inputs}
                           obj[field] = e.target.value
                           setInputs(obj)
                       }
                       }
                       className={"form-control"}
                       placeholder={ph}
                />
            </div>
        </Row>
    );
};

export default InputTemplate;