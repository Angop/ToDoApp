import React from 'react'
import { Dropdown } from 'react-bootstrap'
import Checkbox from '@material-ui/core/Checkbox';
import ProgressBar from 'react-bootstrap/ProgressBar'

const Checkboxes = ({checked, cbOnChange })=> {
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
              <th>Complete?</th>
	            <th>Task Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Type</th>
              <th>Date</th>
              <th style={{width: '10%'}}>Priority</th>
		        </tr>
		      </thead>
		    ) // style width ensures the priority bar displays correctly
}

const TableBody = props => {
	  const rows = props.characterData.map((row, index) => {
      var formattedDate = null
      if (row.date.length && row.date.length > 0){
        const date = new Date(row.date)
        const month = date.getMonth() + 1

        formattedDate = month.toString().concat('/',date.getDate(),'/',date.getFullYear())
      }
      let textLine = (row.checked === true ? 'line-through' : 'none')
      let priBar = parseInt(row.priority) * 10
      let priVar = (priBar > 66 ? "danger" : (priBar > 33 ? "warning" : "success"))
		      return (
               <tr key={index}>
                 <td>
                    <Checkboxes 
                      checked={row.checked} 
                      cbOnChange={()=> props.editChecked(index)} 
                    />
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
                <td>{formattedDate}</td>
                <td>
                  <div style={{textDecorationLine: textLine}}>
                    {row.type}
                  </div>
                </td>
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
