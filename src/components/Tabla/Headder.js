import React from 'react';


export default function Headder(props) {
  if (props.columnas.length === 0) return false;

  return (
    <thead className="thead-dark">
      <tr>
        <th scope="col">#</th>
        {
          props.columnas.map((columna) =>
            (<th scope="col">{columna}</th>))
        }
        <th scope="col"></th>
      </tr>
    </thead>
  )
}
