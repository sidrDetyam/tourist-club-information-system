import React from 'react';

const EntityTable = ({head, fields, data, rowComponentFactory}) => {

    return (
        <div>
            <table className={"table"}>
                <thead>
                <tr>
                    {head.map((i, index) => (
                        <th key={index} style={{backgroundColor: "rgb(200,200,200)"}} className={"text-center"}>{i}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((i, indexi) => (
                    <tr key={indexi}>
                        {fields.map((field, indexj) => (
                            <td key={indexj}
                                style={{backgroundColor: (indexi + indexj) % 2 === 0 ? "#f2f2f2" : "rgb(255, 255, 255)"}}>{i[field]}</td>
                        ))}

                        {rowComponentFactory !== undefined && (
                            <td>
                                {rowComponentFactory(indexi)}
                            </td>)
                        }
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EntityTable;