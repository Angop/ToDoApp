from flask import Flask
from flask import request
from flask import jsonify
import json
# for linking frontend-backend
from flask_cors import CORS

# for mongo db
from mongo_database import User


app = Flask(__name__)
#CORS stands for Cross Origin Requests.
#Here we'll allow requests coming from any domain. Not recommended for production environment.
CORS(app) 


@app.route('/')

def hello_world():
    return 'Hello, World!'

@app.route('/users', methods=['GET', 'POST','DELETE', 'PUT'])

def get_users():
   if request.method == 'GET':
      users = User().find_all()
      return {"users_list": users}

   elif request.method == 'POST':
      userToAdd = request.get_json()
      newUser = User(userToAdd)
      newUser.save()
      resp = jsonify(newUser), 201
      return resp

   elif request.method == 'DELETE':
      userToDelete = request.get_json()
      remUser = User(userToDelete)
      resp = remUser.remove() # db request to remove user
      resp = jsonify(remUser), 200
      # 200 is the default code for a normal response
      return resp

   elif request.method == 'PUT':
      userToPut = request.get_json()
      # make DB request to add user
      updatedUser= User(userToPut)
      updatedUser.save()
      resp = jsonify(updatedUser), 204
      return resp
