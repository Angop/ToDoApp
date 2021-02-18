import React, { Component } from 'react'

class Form extends Component {
     initialState = {
            task: '',
            desc: '',
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
     if (nPriority != NaN && nPriority > 0 && nPriority <= 10) { // Check that the priority is valid
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
     }
     else {
      alert("Priority must be a number from 1 to 10.")
     }
   }


   render() {
        const { task, desc, priority } = this.state;

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
