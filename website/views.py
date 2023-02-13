
from flask import Blueprint, render_template, jsonify, request
from .func import list_degrees, security_headers, request_to_api
from os import environ
from github import Github
from ast import literal_eval

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
    github = Github(environ.get('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'))
    repository = github.get_user().get_repo('harokufiles')
    f = repository.create_file(f"{form_data['name']}.txt", "create_file via PyGithub", str(form_data))
    request_to_api(form_data)
    return "200"


@views.route('/resume/final/<name>')
def final_form(name):
    github = Github(environ.get('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'))
    repository = github.get_user().get_repo('harokufiles')
    # path in the repository
    file = repository.get_contents(f"{name}.txt")
    return render_template("final_form.html", data=literal_eval(file.decoded_content.decode('UTF-8'))), 200


@views.errorhandler(404)
def page_not_found(inputted):
    return render_template('404.html'), 404


@views.after_request
def apply_caching(response):
    security_headers(response)
    return response
