import React, { Component } from 'react'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Task</th>
        <th>Task description</th>
        <th>Date Due</th>
        <th>Priority</th>
      </tr>
    </thead>
  )
}

const TableBody = props => {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.task}</td>
        <td>{row.desc}</td>
        <td>{row.date}</td>
        <td>{row.priority}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}



const Table = props => {
     const { characterData, removeCharacter } = props

     return (
            <table>
              <TableHeader />
              <TableBody characterData={characterData} removeCharacter={removeCharacter} />
            </table>
          )
}

export default Table
