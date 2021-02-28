import React from 'react'
import { Dropdown } from 'react-bootstrap'
import Checkbox from '@material-ui/core/Checkbox';

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
              <th></th>
		          <th></th>
              <th></th>
              <th></th>
		        </tr>
		      </thead>
		    )
}

const TableBody = props => {

    const rows = props.characterData.map((row, index) => {  
      let textLine = (row.checked === true ? 'line-through' : 'none')
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
     const { characterData, removeCharacter, editChecked } = props

     return (
            
            <table>
              <TableHeader />
              <TableBody characterData={characterData} removeCharacter={removeCharacter} editChecked={editChecked} />
              
              <TableHeader />
              
            </table>
          )
}

export default Table
