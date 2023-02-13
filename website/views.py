
from flask import Blueprint, render_template, jsonify, request
from .func import list_degrees, security_headers
from json import dumps, loads
views = Blueprint('views', __name__)


@views.route('/')
def index():
    return render_template("main.html"), 200


@views.route('/api/degrees')
def degrees():
    return jsonify(list_degrees), 200


# @app.route('/api/push')
# def api_talk():
#     request_to_api()


@views.route('/resume/', methods=['GET', 'POST'])
def resume():
    return render_template("form.html"), 200


@views.route("/form_submission", methods=['POST', 'GET'])
def call_api():
    form_data = request.form.to_dict()
    with open(f"./text/{form_data['name']}.txt", 'w') as file:
        file.write(dumps(form_data))
    return "200"


@views.route('/resume/final/<name>')
def final_form(name):
    with open(f"./text/{name}.txt") as data:
        js = loads(data.read())
        return render_template("final_form.html", data=js), 200


@views.errorhandler(404)
def page_not_found(inputted):
    return render_template('404.html'), 404


@views.after_request
def apply_caching(response):
    security_headers(response)
    return response
