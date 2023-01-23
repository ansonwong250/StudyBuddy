from flask import Blueprint, jsonify, request
from util.database import database
from util.match_friend import FriendsCircle

routes_match = Blueprint('routes_match', __name__, url_prefix='/api/match')


@routes_match.route('/', methods=['GET'], strict_slashes=False)
def get_messages():
    try:
        sessionToken = request.headers.get('Authorization').replace("Token ", "").replace("Bearer ", "")
    except Exception as e:
        return jsonify({'Error': 'No Bearer', 'Message': str(e)}), 401

    session = database["sessions"].find_one({"sessionToken": sessionToken})

    if session is None:
        return jsonify({"status": 401, "message": "session not found"})

    findUsers = list(database["users"].find({}, {"_id": False, "avatar": False, "email": False,
                                                 "password": False, "about": False}))

    friends_circle = FriendsCircle(findUsers)
    nearest_users = friends_circle.get_nearest_users(session.get("userID"), 50)

    findUserQuery = database["users"].find_one({"userID": session.get("userID")})
    friendsList = findUserQuery.get("friends")

    if friendsList:
        for index, user in enumerate(nearest_users):
            inFriendsList = list(filter(lambda x: (x["userID"] == user), friendsList))
            if len(inFriendsList) != 0:
                del nearest_users[index]

    return jsonify({
        "matches": nearest_users
    })
