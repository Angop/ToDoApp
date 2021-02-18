import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import Checkbox from './Checkbox'
import ProgressBar from 'react-bootstrap/ProgressBar'

const TableHeader = () => {
	  return (
		      <thead>
		        <tr>
              <th></th>
		          <th>Task</th>
              <th></th>
              <th style={{width: '10%'}}></th>
              <th></th>
		        </tr>
		      </thead>
		    ) // style width ensures the priority bar displays correctly
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
                 <td><ProgressBar striped now={parseInt(String(row.priority)) * 10} /></td>
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
