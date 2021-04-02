from flask import Flask
from flask_cors import CORS

from configs import configs_bp

from abstraction.group import Group
from abstraction.job import Job
from abstraction.node import Node
from abstraction.pipeline import Pipeline
from abstraction.step import Step

from viewer.pretty_printer import PrettyPrinter
from viewer.github_action_viewer import GithubAction
from viewer.gitlab_ci_viewer import GitlabCI

from parser import Parser

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.register_blueprint(configs_bp)

    CORS(app)
    
    parser = Parser('configs/py.json')
    pip = parser.parse()
    print(pip.accept(GitlabCI()))
    # print(GitlabCI().get_language())

    app.run(host='0.0.0.0')
