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

const days = [
  'Sunday ',
  'Monday ',
  'Tuesday ',
  'Wednesday ',
  'Thursday ',
  'Friday ',
  'Saturday '
]

const months = [
  'January ',
  'February ',
  'March ',
  'April ',
  'May ',
  'June ',
  'July ',
  'August ',
  'September ',
  'October ',
  'November ',
  'December '
]

const TableBody = props => {
	  const rows = props.characterData.map((row, index) => {
      var formattedDate = null
      if (row.date.length && row.date.length > 0){
        const date = new Date(row.date)
        const dayName = days[date.getDay()]
        const monthName = months[date.getMonth()]
        var hour = date.getHours()
        var formattedHour = null
        if (hour > 11){
          hour = hour - 12
          if (hour == 0){
            hour = 12
          }
          formattedHour = hour.toString().concat(':',date.getMinutes(),' PM')
        }
        else{
          if (hour == 0){
            hour = 12
          }
          formattedHour = hour.toString().concat(':',date.getMinutes(),' AM')
        }
        formattedDate = dayName.concat(monthName,date.getDate(),', ',date.getFullYear(),' at ', formattedHour)//date.getHours(),":",date.getMinutes())
      }
		      return (
               <tr key={index}>
                 <td>
                   <Checkbox />
                 </td>
                 <td>{row.task}</td>
                 <td>{row.desc}</td>
                 <td>{formattedDate}</td>
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
