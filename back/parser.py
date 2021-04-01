import json

from abstraction.group import Group
from abstraction.job import Job
from abstraction.node import Node
from abstraction.pipeline import Pipeline
from abstraction.step import Step

class Parser:

    def __init__(self, file: str):
        self._file = file

    def parse(self):
        with open(self._file) as file:
            model = json.loads(file.read())
            pipeline = Pipeline(model.get("name"))
            for json_group in model.get('groups', []):
                group = Group(json_group.get('name'))
                for json_job in json_group.get('jobs'):
                    job = Job(json_job.get('name'))
                    for json_step in json_job.get('steps'):
                        job.add_step(Step(json_step.get('name'), json_step.get('command')))
                    group.add_job(job)
                pipeline.add_group(group)

            return pipeline