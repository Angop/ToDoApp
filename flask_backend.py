from flask import Flask
from flask import request
from flask import jsonify
import json
# for linking frontend-backend
from flask_cors import CORS

# for random ids 
# import random 
# import string

# for mongo db
from model_mongodb import User


app = Flask(__name__)
#CORS stands for Cross Origin Requests.
#Here we'll allow requests coming from any domain. Not recommended for production environment.
CORS(app) 

users = { 
   'users_list' : []
}


@app.route('/')

def hello_world():
    return 'Hello, World!'
    
# def gen_random_id():
#   random_id = ''.join([random.choice(string.ascii_letters 
#            + string.digits) for n in range(6)]) 
#   print (random_id)
#   return random_id


@app.route('/users', methods=['GET', 'POST','DELETE'])
def get_users():
   if request.method == 'GET':
      search_username = request.args.get('name')
      search_job = request.args.get('job')
      if search_username and search_job :
         return find_users_by_name_job(search_username, search_job) 
      elif search_username  :
         users = User().find_by_name(search_username)
      elif search_job  :
         return find_users_by_job(search_job) 
      else:
         users = User().find_all()
      return {"users_list": users}
   elif request.method == 'POST':
      userToAdd = request.get_json()
      # userToAdd['id'] = gen_random_id() # check for duplicate before appending.. todo
      # users['users_list'].append(userToAdd)

      # make DB request to add user
      newUser = User(userToAdd)
      newUser.save()
      resp = jsonify(newUser), 201
      return resp
   elif request.method == 'DELETE':
      userToDelete = request.get_json()
      users['users_list'].remove(userToDelete)
      resp = jsonify(success=True)
      resp.status_code = 200
      # 200 is the default code for a normal response
      return resp
      
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
