from requests import post
from flask import Flask, render_template, redirect, flash, url_for, request, jsonify

api_url = "https://resume.redberryinternship.ge/api/cvs"


def request_to_api(data):
    return post(api_url, json=data)
