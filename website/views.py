from flask import Blueprint, render_template, jsonify, request
from .func import list_degrees, security_headers

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
    form_data = request.form
    # Log the form data
    print(form_data)

    # Return a JSON response
    return jsonify({
        "message": "Form submitted successfully!",
        "form_data": form_data
    })


@views.route("/api/test", methods=['GET'])
def api_test():
    form_data = request.form
    return jsonify({
        "message": "Form submitted successfully!",
        "form_data": form_data
    })


@views.errorhandler(404)
def page_not_found(inputted):
    return render_template('404.html'), 404


@views.after_request
def apply_caching(response):
    security_headers(response)
    return response
