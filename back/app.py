from flask import Flask
from flask_cors import CORS

from configs import configs_bp

from abstraction.group import Group
from abstraction.job import Job
from abstraction.node import Node
from abstraction.pipeline import Pipeline
from abstraction.step import Step

from viewer.pretty_printer import PrettyPrinter

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.register_blueprint(configs_bp)

    CORS(app)

    pipeline = Pipeline('Pipe')
    group = Group('Dat grp!')
    job = Job('Docker')

    job.add_step(Step('Install', 'apt-get install docker-ce'))
    group.add_job(job)
    pipeline.add_group(group)

    pipeline.accept(PrettyPrinter())

    app.run(host='0.0.0.0')
