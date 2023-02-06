from requests import post

api_url = "https://resume.redberryinternship.ge/api/cvs"


def request(data):
    return post(api_url, json=data)
