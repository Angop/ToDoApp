import React, { Component } from 'react'
import axios from 'axios'
import Table from './Table'
import Form from './Form'
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {
	  state = {
        characters: [],
        completed:[]
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
      console.log(character)
      this.makePostCall(character).then( callResult => {
         if (callResult.status === 201) {
            character = callResult.data;
            console.log(character);
            this.setState({ characters: [...this.state.characters, character] });
         }
      });
   }

   editChecked = index => {
      const { characters } = this.state
      let character = characters[index]; 
      character.checked = !character.checked

      console.log(character)
      
      if(this.makePostCall(character)){
         characters[index] = character
         this.setState({
            characters 
         })
      }
   }

   handlePatch = character => {
      this.makePatchCall(character).then( callResult => {
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
        const { characters } = this.state

        return (
             <div className="container">
               <Table characterData={characters} removeCharacter={this.removeCharacter} editChecked={this.editChecked} />
               <Form handleSubmit={this.handleSubmit} />
             </div>
             )
   }

}

export default App
