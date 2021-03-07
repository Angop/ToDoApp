from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
import json
import random
app = Flask(__name__)
CORS(app)

@app.route('/') # Tells flask what url triggers our function
def hello_world():
        return 'Hello, World!'



users = { 
    'users_list' :
[
{ 
'id' : 'xyz789',
'name' : 'Charlie',
'job': 'Janitor',
},
{
'id' : 'abc123', 
'name': 'Mac',
'job': 'Bouncer',
},
{
'id' : 'ppp222', 
'name': 'Mac',
'job': 'Professor',
}, 
{
'id' : 'yat999', 
'name': 'Dee',
'job': 'Aspring actress',
},
{
'id' : 'zap555', 
'name': 'Dennis',
'job': 'Bartender',
}
]
}

@app.route('/users', methods=['GET', 'POST', 'DELETE'])
def get_users():
    if request.method == 'GET':
        subdict = {'users_list' : []}
        search_username = request.args.get('name') # accesses val of parameter name
        if search_username :
            for user in users['users_list']:
                if user['name'] == search_username:
                    subdict['users_list'].append(user)
            return subdict
        search_job = request.args.get('job')
        if search_job:
            for user in users['users_list']:
                if user['job'] == search_job:
                    subdict['users_list'].append(user)
            return subdict
        return users
    elif request.method == 'POST':
        userToAdd = request.get_json()
        userToAdd['id'] = "%s"%(random.randint(0, 999))# generate a id and put it on new user
        users['users_list'].append(userToAdd)
        resp = jsonify(userToAdd)
        resp.status_code = 201
        #resp.status_code = 200 #optionally, you can always set a response code.
        # 200 is the default code for a normal response
        return resp
    elif request.method == 'DELETE':
        userToRemove = request.get_json()
        for user in users['users_list']:
            if userToRemove['id'] == user['id']:
                users['users_list'].remove(user)
                return ({})
        return ({})



@app.route('/users/<id>')
def get_user(id):
    if id:
        for user in users['users_list']:
            if user['id'] == id:
                return user
        return ({})
    return users
