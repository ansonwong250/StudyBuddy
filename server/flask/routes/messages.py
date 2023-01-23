import uuid

from flask import Blueprint, jsonify, request
from util.database import database

routes_messages = Blueprint('routes_messages', __name__, url_prefix='/api/messages')


@routes_messages.route('/get/<userID>/<theirUserID>', methods=['GET'], strict_slashes=False)
def get_messages(userID, theirUserID):
    try:
        sessionToken = request.headers.get('Authorization').replace("Token ", "").replace("Bearer ", "")
    except Exception as e:
        return jsonify({'Error': 'No Bearer', 'Message': str(e)}), 401

    session = database["sessions"].find_one({"sessionToken": sessionToken})

    if session is None:
        return jsonify({"status": 401, "message": "session not found"})

    participants = [userID, theirUserID]
    participants.sort()

    messages = database["messages"].find_one({"participants": participants}, {"_id": False})

    if messages is None:
        id = str(uuid.uuid4())
        messages = {
            "participants": participants,
            "messages": [],
            "id": id
        }
        database["messages"].insert_one(messages)
        del messages["_id"]

    return jsonify(messages)
