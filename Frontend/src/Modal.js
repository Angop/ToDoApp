import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class MyModal extends Component {

     state = this.setInitialState()


     setInitialState() {
         if (this.props.modalCharacter) {
            return {
                task: this.props.modalCharacter,
                desc: this.props.modalCharacter.desc,
                priority: this.props.modalCharacter.priority,
            }
        }
        else {
            return {
                task: '',
                desc: '',
                priority: '',
            }
        }
     }

   handleChange = event => {
        const { name, value } = event.target

        this.setState({
               [name]: value,
        })
   }

   submitForm = () => {
     let nPriority = parseInt(this.state.priority)
     if (nPriority !== NaN && nPriority > 0 && nPriority <= 10) { // Check that the priority is valid
        this.props.handleModalSubmit(this.state)
        this.setState(this.initialState)
     }
     else {
      alert("Priority must be a number from 1 to 10.")
     }
     this.props.closeModal()
    }

    render() {
         const { task, desc, priority, show } = this.state;

        return (
         <Modal show={this.props.show} onHide={this.props.closeModal()}>
         <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.submitForm}>
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
