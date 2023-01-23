import uuid

from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, join_room
import eventlet
import pymongo
from decouple import config


app = Flask(__name__)
cors = CORS(app)
socket = SocketIO(app, cors_allowed_origins='*', async_mode='eventlet')

client = pymongo.MongoClient(config('MONGODB'))
database = client['NewHacks']


@socket.on('message')
def print_message(message):
    print(message)
    socket.emit('message', message, room=message.get("roomID"))
    database["messages"].update_one({"id": message.get("roomID")}, {
        "$push": {
            "messages": message
        }
    })


@socket.on('connect')
def connect(token):
    if token is not None:
        userID = token.get("userID")
        friendID = token.get("friendID")
        sessionToken = token.get("token")
        foundSession = database["sessions"].find_one({"sessionToken": sessionToken})
        if userID == foundSession.get("userID"):
            findUserQueryMe = database["users"].find_one({"userID": userID})
            inFriendsList = list(filter(lambda x: (x["userID"] == friendID), findUserQueryMe.get("friends")))
            if len(inFriendsList) > 0 and inFriendsList[0].get("status") == "friends":
                participants = [userID, friendID]
                participants.sort()
                messages = database["messages"].find_one({"participants": participants}, {"_id": False,
                                                                                          "messages": False})
                messagesID = messages.get("id")
                if messagesID is None:
                    messagesID = str(uuid.uuid4())
                    database["messages"].update_one({"participants": participants}, {"$set": {
                        "id": messagesID
                    }})
                join_room(messagesID)


if __name__ == '__main__':
    try:
        socket.run(app, host='0.0.0.0', port=5001)
    except (Exception,):
        socket.run(app, host='0.0.0.0', port=5001, allow_unsafe_werkzeug=True)
