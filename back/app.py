from flask import Flask

from configs import configs_bp

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.register_blueprint(configs_bp)

    app.run(host='0.0.0.0')