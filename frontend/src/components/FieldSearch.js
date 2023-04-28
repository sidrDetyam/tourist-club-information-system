import React from 'react';
import {Button} from "react-bootstrap";
import SearchIcon from "./icons/SearchIcon";

const FieldSearch = ({filters, onSearchClick}) => {
    return (
        <div className={"container-fluid"}>
            <div className={"input-group"}>
                {filters.map((filter, index) => {
                    if (filter.type === "input") {
                        return (
                            <label key={index} className={"text-center"}>
                                {filter.label}
                                <input key={index} className={"form-control"} type={filter.variant}
                                       onChange={(event) => filter.onChange(event.target.value)}>
                                </input>
                            </label>
                        )
                    }

                    return (
                        <label key={index} className={"text-center"}>
                            {filter.label}
                            <select key={index} className={"form-select"}
                                    onChange={(event) => filter.onIndexChanged(Number(event.target.value))}>
                                {filter.options.map((option, optInd) => (
                                    <option key={optInd} value={optInd}>{option}</option>
                                ))}
                            </select>
                        </label>
                    )
                })}

                <label>
                    <Button className={"m-sm-4"} onClick={onSearchClick}>
                        <SearchIcon size={22}/>
                    </Button>
                </label>
            </div>
        </div>
    );
};

export default FieldSearch;