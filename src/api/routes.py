"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token


api = Blueprint('api', __name__)


@api.route("/signup", methods=["POST"])
def sign_up():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User(email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User created"}), 200


@api.route('/login', methods=['POST'])
def login():
    # Obtener los datos del usuario desde el cliente
    body = request.get_json()
    email = body['email']
    password = body['password']

    # Existe el usuario en la base de datos?
    user = User.query.filter_by(email=email, password=password).first()

    # si no existe, devuelve un mensaje de error y el código 401
    if user == None:
        return jsonify({"msg": "User or password, Not exist!"}), 401

    # Flask crea un nuevo token JWT. Se lo guarda en su base de datos y lo asocia al usuario que hemos recuperado de la base de datos
    access_token = create_access_token(identity=user.serialize())

    # Devolvemos el token (string) al cliente para que en futuras peticiones a nuestros endpoints protegidos se pueda autentificar
    # (cebolla_patata_queso)
    response_body = {
        "msg": "Token create successfully",
        "token": access_token
    }

    return jsonify(response_body), 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
