import React from 'react';
import {Row} from "react-bootstrap";

const defaultWidth = 300
const defaultMargin = 3
const defaultVariant = "text"

const InputTemplate = ({inputs, setInputs, ph, field, maxWidth, margin, variant, other}) => {
    const bruh = other?? {}
    return (
        <Row className={`mt-${margin?? defaultMargin}`}>
            <div style={{maxWidth: maxWidth?? defaultWidth}}>
                <input {...bruh} value={inputs[field] === null ? "" : inputs[field]}
                       onChange={e => {
                           const obj = {...inputs}
                           obj[field] = e.target.value
                           setInputs(obj)
                       }
                       }
                       className={"form-control"}
                       placeholder={ph}
                       type={variant?? defaultVariant}
                />
            </div>
        </Row>
    );
};

export default InputTemplate;