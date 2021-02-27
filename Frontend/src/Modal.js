import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class MyModal extends Component {

     initialState = {
       task: '',
       desc: '',
       priority: ''
     }
     state = this.initialState


   handleChange = event => {
        const { name, value } = event.target

        this.setState({
               [name]: value,
        })
   }

   componentDidUpdate({_id}) { // if a new character is given, change the state
    if (this.props._id !== this.state._id) {
      this.setState({task: this.props.task})
      this.setState({desc: this.props.desc})
      this.setState({priority: this.props.priority})
      this.setState({_id: this.props._id})
    }
   }

   submitForm = () => {
     let nPriority = parseInt(this.state.priority)
     if (nPriority !== NaN && nPriority > 0 && nPriority <= 10) { // Check that the priority is valid
        this.props.handleModalSubmit({task: this.state.task,
                                      desc: this.state.desc,
                                      priority: this.state.priority,
                                      _id: this.props._id})
        this.setState(this.initialState)
        this.props.closeModal()
     }
     else {
      alert("Priority must be a number from 1 to 10.")
     }
    }

    render = () => {
        // const { task, desc, priority, show } = this.state;

        return (
         <Modal show={this.props.show} onHide={this.props.closeModal}>
         <Modal.Header>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                 <label htmlFor="task">Task</label>
                 <input
                   type="text"
                   name="task"
                   id="task"
                   value={this.state.task}
                   onChange={this.handleChange} />
                 <label htmlFor="desc">Description</label>
                 <input
                   type="text"
                   name="desc"
                   id="desc"
                   value={this.state.desc}
                   onChange={this.handleChange} />
                 <label htmlFor="priority">Priority (Number 1-10)</label>
                 <input
                   type="text"
                   name="priority"
                   id="priority"
                   value={this.state.priority}
                   onChange={this.handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.submitForm}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>

        ); // TODO add a cancel button
    }
}
            //    <modal>
            //      <h2>Hello Modal</h2>
            //      <div className="form-group">
            //        <label>Enter Name:</label>
            //        <input
            //          type="text"
            //          value={this.state.desc}
            //          name="desc"
            //          onChange={e => this.handleChange(e)}
            //          className="form-control"
            //        />
            //      </div>
            //      <div className="form-group">
            //        <button onClick={e => this.submitForm(e)} type="button">
            //          Save
            //        </button>
            //      </div>
            //    </modal>

export default MyModal
