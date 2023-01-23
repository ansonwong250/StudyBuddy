from flask import Flask
from flask_cors import CORS
from routes.auth import routes_auth
from routes.profile import routes_profile
from routes.messages import routes_messages
from routes.match import routes_match
from routes.friends import routes_friends

app = Flask(__name__)
CORS(app)

app.register_blueprint(routes_auth)
app.register_blueprint(routes_profile)
app.register_blueprint(routes_messages)
app.register_blueprint(routes_match)
app.register_blueprint(routes_friends)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
