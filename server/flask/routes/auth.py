from flask import Blueprint, jsonify, request
from util.database import database
import hashlib
import jwt
import uuid

routes_auth = Blueprint('routes_auth', __name__, url_prefix='/api/auth')


@routes_auth.route('/register', methods=['POST'], strict_slashes=False)
def register():
    try:
        req = request.get_json()
    except Exception as e:
        return jsonify({'Error': 'Invalid JSON', 'Message': str(e)}), 401

    email = req.get('email')
    password = req.get('password')
    confirmPassword = req.get('confirmPassword')
    firstName = req.get('firstName')
    lastName = req.get('lastName')
    typeOf = req.get('type')
    pronouns = req.get('pronouns')

    if email is None or password is None or confirmPassword is None:
        return jsonify({"status": 401}), 401
    if password != confirmPassword:

        return jsonify({"status": 401, "message": "passwords must match"})

    findUserQuery = database["users"].find_one({"email": email})

    if findUserQuery is not None:
        return jsonify({"status": 401, "message": "user already registered"}), 401

    userID = str(uuid.uuid4())

    encryptedPass = hashlib.sha256(password.encode()).hexdigest()

    userObject = {
        "email": email,
        "password": encryptedPass,
        "userID": userID,
        "firstName": firstName,
        "lastName": lastName,
        "type": typeOf,
        "major": "",
        "pronouns": pronouns,
        "about": "",
        "avatar": "",
        "lookingFor": [],
        "gpa": 0,
        "university": ""
    }

    database["users"].insert_one(userObject)

    try:
        sessionToken = jwt.encode({"email": email}, str(uuid.uuid4()), algorithm="HS256").decode('UTF-8')
    except (Exception,):
        sessionToken = jwt.encode({"email": email}, str(uuid.uuid4()), algorithm="HS256")

    database["sessions"].insert_one({"sessionToken": sessionToken, "email": email, "userID": userID})

    return jsonify({"status": 200, "sessionToken": sessionToken, "userID": userID})


@routes_auth.route('/', methods=['GET'], strict_slashes=False)
def getAuth():
    try:
        sessionToken = request.headers.get('Authorization').replace("Token ", "").replace("Bearer ", "")
    except Exception as e:
        return jsonify({'Error': 'No Bearer', 'Message': str(e)}), 401

    session = database["sessions"].find_one({"sessionToken": sessionToken})

    if session is None:
        return jsonify({"status": 401, "message": "session not found"})

    findUserQuery = database["users"].find_one({"userID": session.get("userID")})

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
    friendsList = findUserQuery.get("friends")
    university = findUserQuery.get("university")
    gpa = findUserQuery.get("gpa")
    long = findUserQuery.get("long")
    lat = findUserQuery.get("lat")

    try:
        friends = list(filter(lambda x: (x["status"] == "friends"), friendsList))
    except:
        friends = []
    try:
        pending = list(filter(lambda x: (x["status"] == "pending"), friendsList))
    except:
        pending = []
    friendsString = ','.join(d['userID'] for d in friends)
    friendsArr = friendsString.split(",")
    friendsQuery = database["users"].find({"userID": {"$in": friendsArr}}, {"_id": False, "password": False,
                                                                            "lookingFor": False, "friends": False,
                                                                            "avatar": False, "email": False,
                                                                            "firstName": False, "lastName": False})
    longLat = list(friendsQuery)

    return jsonify({"status": 200, "userID": userID, "email": email, "firstName": firstName,
                    "lastName": lastName, "pronouns": pronouns, "interests": lookingFor,
                    "about": about, "type": typeOf, "major": major, "avatar": avatar,
                    "friends": friends, "pending": pending, "university": university, "gpa": gpa,
                    "long": long, "lat": lat, "longLat": longLat})


@routes_auth.route('/login', methods=['POST'], strict_slashes=False)
def login():
    try:
        req = request.get_json()
    except (Exception,):
        return jsonify({'Error': 'Invalid JSON'}), 401

    email = req.get('email')
    password = req.get('password')

    if email is None or password is None:
        return jsonify({"status": 401}), 401

    findUserQuery = database["users"].find_one({"email": email})

    if findUserQuery is None:
        return jsonify({"status": 401, "message": "invalid login credentials"})

    encryptedPassword = hashlib.sha256(password.encode()).hexdigest()

    if findUserQuery.get("password") == encryptedPassword:
        try:
            sessionToken = jwt.encode({"email": email}, str(uuid.uuid4()), algorithm="HS256").decode('UTF-8')
        except (Exception,):
            sessionToken = jwt.encode({"email": email}, str(uuid.uuid4()), algorithm="HS256")

        database["sessions"].insert_one({"sessionToken": sessionToken, "email": email,
                                         "userID": findUserQuery.get("userID")})

        return jsonify({"status": 200, "sessionToken": sessionToken, "userID": findUserQuery.get("userID")})

    return jsonify({"status": 401, "message": "invalid login credentials"})
