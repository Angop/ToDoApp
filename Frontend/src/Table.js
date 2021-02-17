import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import Checkbox from './Checkbox'

const TableHeader = () => {
	  return (
		      <thead>
		        <tr>
              <th></th>
		          <th>Task</th>
              <th></th>
              <th></th>
		        </tr>
		      </thead>
		    )
}

const TableBody = props => {
	  const rows = props.characterData.map((row, index) => {
		      return (
               <tr key={index}>
                 <td>
                   <Checkbox />
                 </td>
                 <td>{row.task}</td>
                 <td>{row.desc}</td>
                 <td>
                  <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Edit
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => props.removeCharacter(index)}>Delete</Dropdown.Item>
                        <Dropdown.Item href="something">Edit Task</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
