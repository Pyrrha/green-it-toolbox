from viewer.visitor import Visitor

class PrettyPrinter(Visitor):

    def _visitGroup(self, node):
        print(f'Group {node.get_name()}')
        for job in node.jobs:
            job.accept(self)
    
    def _visitJob(self, node):
        print(f'Job {node.get_name()}')
        for step in node.steps:
            step.accept(self)

    def _visitPipeline(self, node):
        print(f'Pipeline {node.get_name()}')
        for group in node.groups:
            group.accept(self)

    def _visitStep(self, node):
        print(f'Step {node.get_name()}: {node.get_command()}')
