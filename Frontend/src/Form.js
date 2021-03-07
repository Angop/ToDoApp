import React, { Component } from 'react'

class Form extends Component {
     initialState = {
            task: '',
            desc: '',
            date: "", 
            checked: false,
            type: '',
            priority: '',
          }

     state = this.initialState

   handleChange = event => {
        const { name, value } = event.target

        this.setState({
               [name]: value,
             })
   } 

    submitForm = () => {
      let nPriority = parseInt(this.state.priority)
      if (nPriority !== NaN && nPriority > 0 && nPriority <= 10) { // Check that the priority is valid
     }
     else {
         alert("Priority must be a number from 1 to 10.")
     }
     var date = new Date(this.state.date)
     let year = date.getFullYear()
     if (year !== NaN && ((year % 1000) < 10) && year >= 2021){
       this.props.handleSubmit(this.state)
       this.setState(this.initialState)
     }
     else {
       alert("Year must be a valid 4-digit date in the future.")
     }
   }

   render() {
        const { task, desc, priority, date } = this.state;

        return (
               <form>
                 <label htmlFor="task">Task</label>
                 <input
                   type="text"
                   name="task"
                   id="task"
                   value={task}
                   onChange={this.handleChange} />

                 <label htmlFor="desc">Description</label>
                 <input
                   type="text"
                   name="desc"
                   id="desc"
                   value={desc}
                   onChange={this.handleChange} />

		             <label htmlFor="date">Due Date (optional)</label>
                 <input
                   type = "date"
                   name = "date"
                   id = "date"
                   value={date}
                   onChange={this.handleChange} />
            
                 <label htmlFor="type">Type</label>
                 <select name="type" onChange={this.handleChange}>
                   <option selected disabled>Please choose...</option>  <option name="type" id="type" value="School">School</option>
                   <option name="type" id="type" value="Work">Work</option>
                   <option name="type" id="type" value="Errand">Errand</option>
                   <option name="type" id="type" value="House Work">House Work</option>
                   <option name="type" id="type" value="Other">Other</option>
                 </select> 

                 <label htmlFor="priority">Priority (Number 1-10)</label>
                 <input
                   type="text"
                   name="priority"
                   id="priority"
                   value={priority}
                   onChange={this.handleChange} />
                  <input type="button" value="Submit" onClick={this.submitForm} />
               </form>
             );
   }

}

export default Form
