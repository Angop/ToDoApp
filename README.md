# ToDoApp

About this project: This repository contains a simple To-Do App. It uses MongoDB, Flask, and React to produce a working application. Its features include adding tasks to a list (or table) of tasks, a checkbox to mark them as complete, and options to delete and edit tasks. All tasks have a name, a description, a due date, a type, and a priority, all of which are optional in the form to add tasks. When a task is added to the list, it is automatically sorted into the table in ascending order by date, and then in descending order by priority. Prioirty is represented in the table by a color-changing prioirty bar which is completely filled at the highest priority (10) and empty at the lowest priority (0). Tasks also contain value for whether it has been completed marked as complete via the checkbox (tasks are incomplete by default). When the checkbox is marked, the task is "crossed out" and the priority bar automatically goes to 0.

- UI Prototype: https://www.figma.com/file/YEuM5o1MzTNUlDhU2L3GSa/To-Do-App?node-id=0%3A1
- Class Diagram: https://github.com/Angop/ToDoApp/wiki/Class-Diagram
- Use-Case Diagram: https://github.com/Angop/ToDoApp/wiki/Use-Case-Diagram

Development environment set up:
1. Install MonogoDB from https://docs.mongodb.com/manual/administration/install-community/ .
2. Follow the instructions at https://www.python.org/downloads/release/python-392/ to install Python
and https://flask.palletsprojects.com/en/1.1.x/installation/ to install Flask.
3. Go to https://nodejs.org/en/download/ to install node.js.

Pull from the main github branch then go into the Frontend folder in a command prompt. Install npm with the line "npm install". 
You may need to add package.json and package-lock.json first. Next run the following lines to install necessary libraries:

  `npm install flask_cors`
  
  `npm install react-bootstrap bootstrap`
  
  `npm install @material-ui/core`
  

1. To start up the app:
    - Boot up mongo.exe -> use users

2. Open command prompt -> navigate to ToDo/Backend -> run cmds:
3. 
    `set FLASK_APP=flask_backend.py`
    
    `set FLASK_ENV=development`
    
3. Open another command prompt -> navigate to ToDo/Frontend -> npm start


Style guides:
  - Python: https://www.python.org/dev/peps/pep-0008/
  - javascript: https://google.github.io/styleguide/jsguide.html
