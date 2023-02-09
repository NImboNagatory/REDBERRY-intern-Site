from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = "a65sd4a32xc1a65f4a6x2c16a5f4SDSDWd6a2xsc1a5dA"
    from .views import views
    app.register_blueprint(views, url_prefix='/')
    return app
