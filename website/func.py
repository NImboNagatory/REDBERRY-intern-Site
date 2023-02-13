from requests import post
from flask import Flask

api_url = "https://resume.redberryinternship.ge/api/cvs"


def request_to_api(data):
    to_api = {
        "name": data['name'],
        "surname": data['lastName'],
        "email": data['"email"'],
        "phone_number": data['phone'],
        "experiences": [
            {
                "position": data["job"],
                "employer": data["employer"],
                "start_date": data["job_start"],
                "due_date": data["job_end"],
                "description": data["job_desc"]
            }
        ],
        "educations": [
            {
                "institute": data["school"],
                "degree": data["grade"],
                "due_date": data["edu_end"],
                "description":  data["edu_desc"]
            }
        ],
        "image": data["image"],
        "about_me": data["aboutMe"]
    }
    return post(api_url, json=to_api)


def create_app():
    app = Flask(__name__)
    return app


def security_headers(parent):
    parent.headers["X-Frame-Options"] = "SAMEORIGIN"
    parent.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'
    parent.headers['Content-Security-Policy'] = "default-src 'self'"
    parent.headers['Content-Security-Policy'] = "img-src 'self'"
    parent.headers['Content-Security-Policy'] = "style-src 'self'"
    parent.headers['Content-Security-Policy'] = "connect-src 'self'"
    parent.headers['Content-Security-Policy'] = "object-src 'self'"
    parent.headers['Content-Security-Policy'] = "frame-src 'self'"
    parent.headers['Content-Security-Policy'] = "child-src 'self'"
    parent.headers['Content-Security-Policy'] = "form-action 'self'"
    parent.headers['Content-Security-Policy'] = "frame-ancestors 'none'"
    parent.headers['Content-Security-Policy'] = "base-uri 'self'"
    parent.headers['Content-Security-Policy'] = "worker-src 'none'"
    parent.headers['Content-Security-Policy'] = "manifest-src 'none'"
    parent.headers['Content-Security-Policy'] = "prefetch-src 'none'"
    parent.headers['X-Content-Type-Options'] = 'nosniff'
    parent.headers['X-Frame-Options'] = 'deny'
    parent.headers['X-XSS-Protection'] = " 1; mode=block"
    parent.headers['Referrer-Policy'] = 'origin-when-cross-origin'
    parent.headers['Feature-Policy'] = "microphone 'none'; camera 'none'"
    parent.set_cookie('ants_in_my_eyes', '23', max_age=600, httponly=True)
    parent.set_cookie('username', 'flask', secure=True, httponly=True, samesite='Lax')


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
