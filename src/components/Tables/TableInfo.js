import React from 'react';
import './TableInfo.css';

function TableInfo({countries}) {
    return (
       <div className='tableinfo-container'>
            <div className='tableinfo-title'><strong>Live Cases By Country</strong></div>
        <div className='tableinfo'>
            {countries.map((country,cases)=>(
                <tr>
                    <td>{country.country}</td>
                    <td>{country.cases}</td>
                </tr>
            ))}
        </div>
       </div>
    )
}

export default TableInfo;
