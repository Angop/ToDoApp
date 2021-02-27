import React, { Component } from 'react'
import axios from 'axios'
import Table from './Table'
import Form from './Form'
import myModal from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {
	  state = {
        characters: [],
        completed:[],
        showModal: true,
        modalCharacter: null
     }


   componentDidMount() {
      axios.get('http://localhost:5000/users')
         .then(res => {
            const characters = res.data.users_list;
            this.setState({ characters });
         })
         .catch(function (error) {
            //Not handling the error. Just logging into the console.
            console.log(error);
         });
   }

   removeCharacter = index => {
      const { characters } = this.state
      let character = characters[index];

      if(this.makeDeleteCall(character)){
          this.setState({
              characters: characters.filter((character, i) => {
                  return i !== index
              }),
          })
      }
   }

   openModal = index => {
      this.setState({ showModal: true }, {modalCharacter: this.state.characters[index]});
   }

   closeModal() {
      this.setState({ showModal: false }, {modalCharacter: null});
   }

   handleModalSubmit = character => {
      this.handleSubmit(character);
      this.closeModal()
   }

   updateCharacter = index => {
      const { characters } = this.state
      let character = characters[index];

      console.log("update character")
      if(this.makePutCall(character)){
         characters[index] = character
         this.setState({
            characters // no idea if this is right
         })
      }
   }

   makePutCall(character){
      return axios.put('http://localhost:5000/users', character)
         .then(function (response) {
            console.log(response);
            return response;
         })
         .catch(function (error) {
            console.log(error);
            return null;
         });
   }

   makeDeleteCall(character){
      console.log(character);
      console.log({ data: { _id: character._id } });
      return axios.delete('http://localhost:5000/users', { data: { _id: character._id } })
         .then(function (response) {
            console.log(response);
            return response === 200;
         })
         .catch(function (error) {
            console.log(error);
            return false;
         });
   }

   handleSubmit = character => {
      this.makePostCall(character).then( callResult => {
         if (callResult.status === 201) {
            character = callResult.data;
            console.log(character);
            this.setState({ characters: [...this.state.characters, character] });
         }
      });
   }

   handleCompletedSubmit = complete => {
      this.setState({ completed: [...this.state.completed, complete]});
   }


   makePostCall(character){
      return axios.post('http://localhost:5000/users', character)
         .then(function (response) {
            console.log(response);
            return response;
         })
         .catch(function (error) {
            console.log(error);
            return null;
         });
   }

   render() {
        const { characters, showModal, modalCharacter } = this.state

        return (
             <div className="container">
               <Table characterData={characters} removeCharacter={this.removeCharacter} updateCharacter={this.updateCharacter}  openModal={this.openModal} />
               <Form handleSubmit={this.handleSubmit} />
               <myModal show={showModal} handleModalSubmit={this.handleModalSubmit} closeModal={this.closeModal} modalCharacter={modalCharacter} />
             </div>
             )
   }

}


export default App
