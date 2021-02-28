import React from 'react'
import { Dropdown } from 'react-bootstrap'
import Checkbox from '@material-ui/core/Checkbox';
import ProgressBar from 'react-bootstrap/ProgressBar'

const Checkboxes = ({checked, cbOnChange})=> {
  const handleChange = (event) => {
      cbOnChange(event.target.checked);
  };

  return (
    <div>
      <Checkbox
        onChange={handleChange}
        checked={checked}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      </div>
  );
}

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
        var minutes = date.getMinutes()
        var minuteString = minutes.toString()
        if (minutes < 10){
          const zero = '0'
          minuteString = zero.concat(minuteString)
        }
        var hour = date.getHours()
        var formattedHour = null
        if (hour > 11){
          hour = hour - 12
          if (hour == 0){
            hour = 12
          }
          formattedHour = hour.toString().concat(':',minuteString,' PM')
        }
        else{
          if (hour == 0){
            hour = 12
          }
          formattedHour = hour.toString().concat(':',minuteString,' AM')
        }
        formattedDate = dayName.concat(monthName,date.getDate(),', ',date.getFullYear(),' at ', formattedHour)//date.getHours(),":",date.getMinutes())
      }
      let textLine = (row.checked === true ? 'line-through' : 'none')
      let priBar = parseInt(row.priority) * 10
      let priVar = (priBar > 66 ? "danger" : (priBar > 33 ? "warning" : "success"))
		      return (
               <tr key={index}>
                 <td>
                    <Checkboxes cbOnChange={(checked)=> props.editChecked(index)} />
                 </td>
                 
                 <td>
                  <div style={{textDecorationLine: textLine}}>
                    {row.task}
                  </div>
                 </td>

                 <td>
                  <div style={{textDecorationLine: textLine}}>
                    {row.desc}
                  </div>
                </td>

                <td>
                  <div style={{textDecorationLine: textLine}}>
                    {row.type}
                  </div>
                </td>
                <td>{formattedDate}</td>
                 <td><ProgressBar striped variant={priVar} now={priBar} /></td>
                 <td>
                  <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Edit
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => props.removeCharacter(index)}>Delete</Dropdown.Item>
                        <Dropdown.Item onClick={() => props.openModal(index)}>Edit Task</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                 </td>
               </tr>
			          )
		    })
	  return <tbody>{rows}</tbody>
}

const Table = props => {
     const { characterData, removeCharacter, openModal, editChecked} = props

     return (
            <table style={{width: '100%'}}>
              <TableHeader />
              <TableBody characterData={characterData} removeCharacter={removeCharacter} openModal={openModal} editChecked={editChecked}/>
            </table>
          )
}

export default Table
