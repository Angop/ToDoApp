import React, { Component } from "react";
import axios from "axios";
import Table from "./Table";
import MyModal from "./Modal";
import logo from "./logo.jpg";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    characters: [],
    completed: [],
    showModal: false,
    modalCharacter: null,
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        const characters = res.data.users_list;
        this.setState({ characters });
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  removeCharacter = (index) => {
    const { characters } = this.state;
    let character = characters[index];

    if (this.makeDeleteCall(character)) {
      this.setState({
        characters: characters.filter((character, i) => {
          return i !== index;
        }),
      });
    }
  };

  openModal = (index) => {
    if (index >= 0) {
      const { characters } = this.state;
      this.setState({ modalCharacter: characters[index] });
      this.setState({ showModal: true });
    }
  };

  newCharacter = () => {
    // opens modal for a new character
    this.setState({ modalCharacter: null });
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ modalCharacter: null });
    this.setState({ showModal: false });
  };

  handleModalSubmit = (character) => {
    // this.handleSubmit(character);
    console.log(character);
    if (this.state.modalCharacter) {
      // updating existing character
      this.updateCharacter(character);
    } else {
      // creating a new character
      this.makePostCall(character).then((callResult) => {
        if (callResult.status === 201) {
          character = callResult.data;
          console.log(character);
          this.setState({ characters: [...this.state.characters, character] });
        }
      });
    }
    this.closeModal();
  };

  updateCharacter = (character) => {
    const { characters } = this.state;

    if (this.makePutCall(character)) {
      var updatedCharacters = [];
      for (let i = 0; i < characters.length; i++) {
        // get an updated character list
        if (character._id === characters[i]._id) {
          updatedCharacters.push(character);
        } else {
          updatedCharacters.push(characters[i]);
        }
      }
      console.log(characters);
      console.log(updatedCharacters);
      this.setState({
        characters: updatedCharacters,
      });
    }
  };

  makePutCall(character) {
    return axios
      .put("http://localhost:5000/users", character)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });
  }

  makeDeleteCall(character) {
    console.log(character);
    console.log({ data: { _id: character._id } });
    return axios
      .delete("http://localhost:5000/users", { data: { _id: character._id } })
      .then(function (response) {
        console.log(response);
        return response === 200;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  }

  handleSubmit = (character) => {
    console.log(character);
    this.makePostCall(character).then((callResult) => {
      if (callResult.status === 201) {
        character = callResult.data;
        console.log(character);
        this.setState({ characters: [...this.state.characters, character] });
      }
    });
  };


  editChecked = (index) => {
    const { characters } = this.state;
    let character = characters[index];
    character.checked = !character.checked;

    console.log(character);

    if (this.makePostCall(character)) {
      characters[index] = character;
      this.setState({
        characters,
      });
    }
  };

  handlePatch = (character) => {
    this.makePatchCall(character).then((callResult) => {
      if (callResult.status === 201) {
        character = callResult.data;
        console.log(character);
        this.setState({ characters: [...this.state.characters, character] });
      }
    });
  };

  handleCompletedSubmit = (complete) => {
    this.setState({ completed: [...this.state.completed, complete] });
  };

  makePostCall(character) {
    return axios
      .post("http://localhost:5000/users", character)
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
    const { characters, showModal, modalCharacter } = this.state;

    let mChar = {};
    if (modalCharacter === null) {
      mChar = {
        task: "",
        desc: "",
        priority: "0",
        date: "",
        checked: false,
        type: "",
      };
    }
    return (
      <div className="all">
        <div className="header">
          <img className="photo" src={logo} />
          <h1 className="text"> TO-DO APP </h1>
        </div>

        <div className="container">
          <input
            type="button"
            value="Add Task"
            onClick={this.newCharacter}
          />
          <Table
            characterData={characters}
            removeCharacter={this.removeCharacter}
            updateCharacter={this.updateCharacter}
            openModal={this.openModal}
            editChecked={this.editChecked}
          />
          <MyModal
            show={showModal}
            handleModalSubmit={this.handleModalSubmit}
            closeModal={this.closeModal}
            modalCharacter={modalCharacter ? modalCharacter : mChar}
          />
        </div>
      </div>
    );
  }
}

export default App;
// <Form handleSubmit={this.handleSubmit} />
