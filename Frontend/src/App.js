import React, { Component } from 'react'
import axios from 'axios'
import Table from './Table'
import Form from './Form'


class App extends Component {
	  state = {
        characters: []
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
      console.log(character);

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
      return axios.delete('http://localhost:5000/users', { data: { id: character.id } })
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
               <Table characterData={characters} removeCharacter={this.removeCharacter} />
               <Form handleSubmit={this.handleSubmit} />
             </div>
             )
   }

}


export default App
