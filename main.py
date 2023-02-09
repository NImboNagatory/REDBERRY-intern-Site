from flask import Flask, render_template, redirect, flash, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from func import request_to_api, list_degrees, security_headers

db = SQLAlchemy()

app = Flask(__name__)


@app.route('/', methods=["GET"])
def index():
    return render_template("main.html"), 200


@app.route('/api/degrees')
def degrees():
    return jsonify(list_degrees), 204


@app.route('/resume/')
def resume():
    return render_template("form.html"), 200


@app.errorhandler(404)
def page_not_found(inputted):
    return render_template('404.html'), 404


@app.after_request
def apply_caching(response):
    security_headers(response)
    return response


if __name__ == "__main__":
    app.run(host='localhost', port=8000, debug=True)
