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

   // TODO: fix double click bug (if you edit the same task twice this breaks)
   componentDidUpdate({_id}) { // if a new character is given, change the state
    if (this.props.modalCharacter && (this.props.modalCharacter._id !== this.state._id)) {
      this.setState({task: this.props.modalCharacter.task})
      this.setState({desc: this.props.modalCharacter.desc})
      this.setState({priority: this.props.modalCharacter.priority})
      this.setState({_id: this.props.modalCharacter._id})
    }
   }

   submitForm = () => {
     let nPriority = parseInt(this.state.priority)
     if (nPriority !== NaN && nPriority > 0 && nPriority <= 10) { // Check that the priority is valid
      if (this.props.modalCharacter) {
        var modChar = this.props.modalCharacter
        modChar.task = this.state.task
        modChar.desc = this.state.desc
        modChar.priority = this.state.priority
        this.props.handleModalSubmit(modChar)
        }
        this.setState(this.initialState)
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

        );
    }
}

export default MyModal
