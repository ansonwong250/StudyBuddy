from flask import Blueprint, jsonify, request
from util.database import database

routes_friends = Blueprint('routes_friends', __name__, url_prefix='/api/friends')


@routes_friends.route('/add', methods=['POST'], strict_slashes=False)
def add_friend():
    try:
        req = request.get_json()
    except (Exception,):
        return jsonify({'Error': 'Invalid JSON'}), 401

    friendID = req.get('friendID')

    try:
        sessionToken = request.headers.get('Authorization').replace("Token ", "").replace("Bearer ", "")
    except Exception as e:
        return jsonify({'Error': 'No Bearer', 'Message': str(e)}), 401

    session = database["sessions"].find_one({"sessionToken": sessionToken})

    findUserQuery = database["users"].find_one({"userID": session.get("userID")})

    if session is None:
        return jsonify({"status": 401, "message": "session not found"})

    database["users"].update_one({"userID": friendID}, {
        "$push": {
            "friends": {
                "firstName": findUserQuery.get("firstName"),
                "lastName": findUserQuery.get("lastName"),
                "email": findUserQuery.get("email"),
                "status": "pending",
                "userID": findUserQuery.get("userID")
            }
        }
    })
    return jsonify({
        "status": 200
    })


@routes_friends.route('/accept', methods=['POST'], strict_slashes=False)
def accept_friend():
    try:
        req = request.get_json()
    except (Exception,):
        return jsonify({'Error': 'Invalid JSON'}), 401

    friendID = req.get('friendID')

    try:
        sessionToken = request.headers.get('Authorization').replace("Token ", "").replace("Bearer ", "")
    except Exception as e:
        return jsonify({'Error': 'No Bearer', 'Message': str(e)}), 401

    session = database["sessions"].find_one({"sessionToken": sessionToken})

    findUserQueryMe = database["users"].find_one({"userID": session.get("userID")})
    findUserQuery = database["users"].find_one({"userID": friendID})

    if session is None:
        return jsonify({"status": 401, "message": "session not found"})

    database["users"].update_one({
        "userID": session.get("userID"),
        "friends.userID": friendID
    }, {"$set": {"friends.$.status": "friends"}})

    inFriendsList = list(filter(lambda x: (x["userID"] == friendID), findUserQuery.get("friends")))
    if len(inFriendsList) == 0:
        database["users"].update_one({"userID": friendID}, {
            "$push": {
                "friends": {
                    "firstName": findUserQueryMe.get("firstName"),
                    "lastName": findUserQueryMe.get("lastName"),
                    "email": findUserQueryMe.get("email"),
                    "status": "friends",
                    "userID": findUserQueryMe.get("userID")
                }
            }
        })

    newFriendsList = database["users"].find_one({"userID": session.get("userID")}).get("friends")
    friends = list(filter(lambda x: (x["status"] == "friends"), newFriendsList))
    pending = list(filter(lambda x: (x["status"] == "pending"), newFriendsList))

    return jsonify({
        "status": 200,
        "friends": friends,
        "pending": pending
    })
