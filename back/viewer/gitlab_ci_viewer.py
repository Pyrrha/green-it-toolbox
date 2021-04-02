from viewer.visitor import Visitor

class GitlabCI(Visitor):

    def __init__(self):
        super().__init__('yaml')

    def _visitGroup(self, node):
        group = ''
        for job in node.jobs:
            group += f'{job.get_name():}\n  stage: {node.get_name()}\n'
            group += job.accept(self)
        return group
    
    def _visitJob(self, node):
        job = '  script:\n'
        for step in node.steps:
            job += step.accept(self)
        return job

    def _visitPipeline(self, node):
        workflow = 'stages:\n'
        for group in node.groups:
            workflow += f'  - {group.get_name()}'
        workflow += '\n\n'

        for group in node.groups:
            workflow += group.accept(self)

        return workflow

    def _visitStep(self, node):
        return f'    - {node.get_command()}\n'