from flask import Flask, request, jsonify
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# Connect to SQLite database
db_path = "database.db"
conn = sqlite3.connect(db_path, check_same_thread=False)
cursor = conn.cursor()

# Create a table for users if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )
''')
conn.commit()

# Handle user registration
@app.route('/makeNewUser', methods=['POST'])
def make_new_user():
    data = request.get_json()
    username = data.get('username')
    password = generate_password_hash(data.get('password'))

    try:
        existing_user = find_user(username)

        if not existing_user:
            cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
            conn.commit()
            return jsonify(message='Registration successful'), 200
        else:
            return jsonify(error='Username already in use'), 409
    except Exception as e:
        print(e)
        return jsonify(error='An error occurred during registration'), 500

# Handle getUser
@app.route('/getUser/<string:username>/<string:password>', methods=['GET'])
def get_user(username, password):
    try:
        cursor.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))
        user = cursor.fetchone()

        if user:
            return jsonify(user=dict(id=user[0], username=user[1])), 200
        else:
            return jsonify(error='User not found'), 404
    except Exception as e:
        print(e)
        return jsonify(error='An error occurred'), 500

# Handle findUser
@app.route('/findUser/<string:username>', methods=['GET'])
def find_user_route(username):
    try:
        user = find_user(username)

        if user:
            return jsonify(user=dict(id=user[0], username=user[1])), 200
        else:
            return jsonify(error='User not found'), 404
    except Exception as e:
        print(e)
        return jsonify(error='An error occurred'), 500

# Helper function to find a user by username
def find_user(username):
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    return cursor.fetchone()

# Start the server
if __name__ == '__main__':
    app.run(debug=True)

