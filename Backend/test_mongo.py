import pytest
import mongo_database
from pymongo import MongoClient
import json
from bson import ObjectId


@pytest.fixture
def clear_db():
    # removes everything in the db for a fresh start each test
    mongo_client = MongoClient('localhost', 27017)  #change if your db is in another host and port
    col = mongo_client["users"]["users_list"]
    col.delete_many({}) # maybe works? dd

def test_find_all_empty(clear_db):
    assert mongo_database.User().find_all() == []

def test_save_new_task(clear_db):
    given_task = json.dumps({'task': 'task1', 'desc': 'desc1', 'priority': '10', 'checked': True, 'type': 'Other', 'date': '2021-03-18'})
    newUser = mongo_database.User(json.loads(given_task))
    newUser.save()
    tasks = mongo_database.User().find_all()
    assert len(tasks) == 1
    assert tasks[0]['task'] == 'task1'
    assert tasks[0]['desc'] == 'desc1'
    assert tasks[0]['priority'] == '10'
    assert tasks[0]['checked']
    assert tasks[0]['type'] == 'Other'
    assert tasks[0]['date'] == '2021-03-18'

def test_save_update_task(clear_db):
    #TODO
    given_task = json.dumps({'task': 'task1', 'desc': 'desc1', 'priority': '10', 'checked': True, 'type': 'Other', 'date': '2021-03-18'})
    newUser = mongo_database.User(json.loads(given_task))
    newUser.save()
    orig_tasks = mongo_database.User().find_all()
    print(orig_tasks)

    update_task = json.dumps({'_id': orig_tasks[0]['_id'], 'task': 'UPDATED', 'desc': 'desc1', 'priority': '10', 'checked': True, 'type': 'Other', 'date': '2021-03-18'})
    updatedUser = mongo_database.User(json.loads(update_task))
    updatedUser.save()
    tasks = mongo_database.User().find_all()
    print(tasks)
    assert len(tasks) == 1
    assert tasks[0]['task'] == 'UPDATED'

    
def test_remove(clear_db):
    given_task = json.dumps({'task': 'task1', 'desc': 'desc1', 'priority': '10', 'checked': True, 'type': 'Other', 'date': '2021-03-18'})
    newUser = mongo_database.User(json.loads(given_task))
    newUser.save()
    tasks = mongo_database.User().find_all()
    assert len(tasks) == 1
    newUser.remove()
    tasks = mongo_database.User().find_all()
    assert len(tasks) == 0
