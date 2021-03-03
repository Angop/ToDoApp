# ToDoApp

About this project:



UI Prototype: https://www.figma.com/file/YEuM5o1MzTNUlDhU2L3GSa/To-Do-App?node-id=0%3A1


Development environment set up:
Install MonogoDB from https://docs.mongodb.com/manual/administration/install-community/ .
Follow the instructions at https://www.python.org/downloads/release/python-392/ to install Python
and https://flask.palletsprojects.com/en/1.1.x/installation/ to install Flask.
Go to https://nodejs.org/en/download/ to install node.js.

Pull from the main github branch then go into the Frontend folder in a command prompt. Install npm with the line "npm install". 
You may need to add package.json and package-lock.json first. Next run the following lines to install necessary libraries:
  npm install flask_cors
  npm install react-bootstrap bootstrap
  npm install @material-ui/core

To start up the app:
Boot up mongo.exe -> use users

Open command prompt -> navigate to ToDo/Backend -> run cmds:
    set FLASK_APP=flask_backend.py
    set FLASK_ENV=development
    
Open another command prompt -> navigate to ToDo/Frontend -> npm start


Diagrams:


Style guides:
  for python https://www.python.org/dev/peps/pep-0008/
  for javascript https://google.github.io/styleguide/jsguide.html
