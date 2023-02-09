from flask import Flask, render_template, redirect, flash, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from func import request_to_api

db = SQLAlchemy()

app = Flask(__name__)


@app.route("/", methods=["GET"])
def index():
    return render_template("main.html"), 200


@app.route("/api/degrees")
def degrees():
    list_degrees = [
        {
            "id": 1,
            "title": "საშუალო სკოლის დიპლომი"
        },
        {
            "id": 2,
            "title": "ზოგადსაგანმანათლებლო დიპლომი"
        },
        {
            "id": 3,
            "title": "ბაკალავრი"
        },
        {
            "id": 4,
            "title": "მაგისტრი"
        },
        {
            "id": 5,
            "title": "დოქტორი"
        },
        {
            "id": 6,
            "title": "ასოცირებული ხარისხი"
        },
        {
            "id": 7,
            "title": "სტუდენტი"
        },
        {
            "id": 8,
            "title": "კოლეჯი(ხარისიხს გარეშე)"
        },
        {
            "id": 9,
            "title": "სხვა"
        }
    ]
    return jsonify(list_degrees), 204


@app.route("/resume/page/1")
def resume():
    return render_template("form.html"), 200


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.after_request
def apply_caching(response):
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    response.headers['Content-Security-Policy'] = "img-src 'self'"
    response.headers['Content-Security-Policy'] = "script-src 'self'"
    response.headers['Content-Security-Policy'] = "style-src 'self'"
    response.headers['Content-Security-Policy'] = "connect-src 'self'"
    response.headers['Content-Security-Policy'] = "object-src 'self'"
    response.headers['Content-Security-Policy'] = "frame-src 'self'"
    response.headers['Content-Security-Policy'] = "child-src 'self'"
    response.headers['Content-Security-Policy'] = "form-action 'self'"
    response.headers['Content-Security-Policy'] = "frame-ancestors 'none'"
    response.headers['Content-Security-Policy'] = "base-uri 'self'"
    response.headers['Content-Security-Policy'] = "worker-src 'none'"
    response.headers['Content-Security-Policy'] = "manifest-src 'none'"
    response.headers['Content-Security-Policy'] = "prefetch-src 'none'"
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.set_cookie('snakes', '3', max_age=600)
    response.set_cookie('username', 'flask', secure=True, httponly=True, samesite='Lax')
    return response


if __name__ == "__main__":
    app.run(host='localhost', port=8000, debug=True)
