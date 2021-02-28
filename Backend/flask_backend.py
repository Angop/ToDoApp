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
      search_username = request.args.get('name')
      search_job = request.args.get('job')
      users = []

      if search_username:
         users.extend(User().find_by_name(search_username))
      if search_job:
         users.extend(User().find_by_job(search_job))
      # remove duplicate users (matched user and job)?? dd
      if not search_username and not search_job:
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

   #elif request.method == 'PUT':
   #   userToPut = request.get_json()
    #  putUser = User(userToPut)  
     # putUser.edit() # db request to update user
      #resp = jsonify(putUser), 201
      #return resp
      
@app.route('/users/<id>', methods=['GET'])

def get_user(id):
   if request.method == 'GET':
      user = User({"_id":id})
      if user.reload() :
         return user
      else :
         return jsonify({"error": "User not found"}), 404
      
def find_users_by_name_job(name,job):
   subdict = {'users_list' : []}
   for user in users['users_list']:
      if user['name'] == name and user['job'] == job:
         subdict['users_list'].append(user)
   return subdict 

def find_users_by_job(job):
   subdict = {'users_list' : []}
   for user in users['users_list']:
      if user['job'] == job:
         subdict['users_list'].append(user)
   return subdict 
