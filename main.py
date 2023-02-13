from website import create_app

app = create_app()

#Turn off debug
if __name__ == "__main__":
    app.run(host='localhost', port=8000, debug=False)
