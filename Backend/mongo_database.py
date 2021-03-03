import pymongo
from bson import ObjectId

class Model(dict):
    """
    A simple model that wraps mongodb document
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    def save(self):
        if not self._id:
            # creates a new user
            self.collection.insert(self)
        else:
            # updates an existing user
            self.collection.update(
                { "_id": ObjectId(self._id) }, {"task": self.task, "desc": self.desc, "priority": self.priority, "type": self.type, "checked": self.checked, "date": self.date})
        self._id = str(self._id)

    def edit(self):
        if self._id:
            self.collection.update(
                { "_id": ObjectId(self._id) }, self)
            self._id = str(self._id)

    def reload(self):
        if self._id:
            result = self.collection.find_one({"_id": ObjectId(self._id)})
            if result :
                self.update(result)
                self._id = str(self._id)
                return True
        return False

    def remove(self):
        if self._id:
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp

class User(Model):
    db_client = pymongo.MongoClient('localhost', 27017)  #change if your db is in another host and port
    collection = db_client["users"]["users_list"]  #db name is 'users' and collection name is 'users_list'

    def find_all(self):
        users = list(self.collection.find())
        for user in users:
            user["_id"] = str(user["_id"])
        return users