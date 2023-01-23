from flask import Blueprint, jsonify, request
from util.database import database

routes_profile = Blueprint('routes_profile', __name__, url_prefix='/api/profile')


@routes_profile.route('/update', methods=['POST'], strict_slashes=False)
def update_profile():
    try:
        req = request.get_json()
    except (Exception,):
        return jsonify({'Error': 'Invalid JSON'}), 401

    major = req.get('major')
    interests = req.get('interests')
    about = req.get('about')
    long = req.get('long')
    lat = req.get('lat')
    avatar = req.get('avatar')
    university = req.get('university')
    gpa = req.get('gpa')

    try:
        sessionToken = request.headers.get('Authorization').replace("Token ", "").replace("Bearer ", "")
    except Exception as e:
        return jsonify({'Error': 'No Bearer', 'Message': str(e)}), 401

    session = database["sessions"].find_one({"sessionToken": sessionToken})

    if session is None:
        return jsonify({"status": 401, "message": "session not found"})

    updateObject = {
        "major": major,
        "lookingFor": interests,
        "about": about,
        "long": long,
        "lat": lat,
        "university": university,
        "gpa": float(gpa)
    }

    if avatar:
        updateObject["avatar"] = avatar

    database["users"].update_one({"userID": session.get("userID")}, {"$set": updateObject})

    return jsonify({
        "status": 200
    })


@routes_profile.route('/get/<userID>', methods=['GET'], strict_slashes=False)
def get_profiles(userID):
    try:
        sessionToken = request.headers.get('Authorization').replace("Token ", "").replace("Bearer ", "")
    except Exception as e:
        return jsonify({'Error': 'No Bearer', 'Message': str(e)}), 401

    session = database["sessions"].find_one({"sessionToken": sessionToken})

    if session is None:
        return jsonify({"status": 401, "message": "session not found"})

    findUserQueryMe = database["users"].find_one({"userID": session.get("userID")})

    findUserQuery = database["users"].find_one({"userID": userID})
    userID = findUserQuery.get("userID")
    email = findUserQuery.get("email")
    firstName = findUserQuery.get("firstName")
    lastName = findUserQuery.get("lastName")
    pronouns = findUserQuery.get("pronouns")
    lookingFor = findUserQuery.get("lookingFor")
    about = findUserQuery.get("about")
    typeOf = findUserQuery.get("type")
    major = findUserQuery.get("major")
    avatar = findUserQuery.get("avatar")

    return jsonify({"status": 200, "userID": userID, "email": email, "firstName": firstName,
                    "lastName": lastName, "pronouns": pronouns, "interests": lookingFor,
                    "about": about, "type": typeOf, "major": major, "avatar": avatar,
                    "myUserID": session.get("userID"), "myAvatar": findUserQueryMe.get("avatar")})
