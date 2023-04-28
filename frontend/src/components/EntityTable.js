import React from 'react';

const EntityTable = ({head, fields, data}) => {

    return (
        <div>
            <table className={"table"}>
                <thead>
                <tr>
                    {head.map((i, index) => (
                        <th key={index}>{i}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((i, indexi) => (
                    <tr key={indexi}>
                        {fields.map((field, indexj) => (
                            <td key={indexj}>{i[field]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EntityTable;