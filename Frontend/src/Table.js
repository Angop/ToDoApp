import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import Checkbox from './Checkbox'
import ProgressBar from 'react-bootstrap/ProgressBar'

const TableHeader = () => {
	  return (
		      <thead>
		        <tr>
              <th>Select</th>
	      <th>Tasks</th>
              <th>Description</th>
              <th>Type</th>
              <th style={{width: '10%'}}>Priority</th>
              <th></th>
		        </tr>
		      </thead>
		    ) // style width ensures the priority bar displays correctly
}

const TableBody = props => {
	  const rows = props.characterData.map((row, index) => {
      let priBar = parseInt(row.priority) * 10
      let priVar = (priBar > 66 ? "danger" : (priBar > 33 ? "warning" : "success"))
		      return (
               <tr key={index}>
                 <td>
                   <Checkbox />
                 </td>
                 <td>{row.task}</td>
                 <td>{row.desc}</td>
                 <td>{row.type}</td>
                 <td><ProgressBar striped variant={priVar} now={priBar} /></td>
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
            <table style={{width: '100%'}}>
              <TableHeader />
              <TableBody characterData={characterData} removeCharacter={removeCharacter} />
            </table>
          )
}

export default Table
