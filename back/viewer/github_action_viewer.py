from viewer.visitor import Visitor

class GithubAction(Visitor):

    def __init__(self):
        super().__init__('yaml')

    def _visitGroup(self, node):
        group = ''
        for job in node.jobs:
            group += job.accept(self)
        return group
    
    def _visitJob(self, node):
        job = f'  {node.get_name()}:\n    runs-on: ubuntu-latest\n\n    steps:\n'
        for step in node.steps:
            job += step.accept(self)
        return job

    def _visitPipeline(self, node):
        workflow = f'name: {node.get_name()}\n\n'
        workflow += '# Triggers action\non:\n  push:\n    branches: [ main ]\n\n  workflow_dispatch:\n\n'
        workflow += 'jobs:\n'
        for group in node.groups:
            workflow += group.accept(self)
        return workflow

    def _visitStep(self, node):
        return f'    - name: {node.get_name()}\n      run: {node.get_command()}\n\n'
