from viewer.visitor import Visitor

class PrettyPrinter(Visitor):

    def _visitGroup(self, node):
        print('Group')
        for job in node.jobs:
            job.accept(self)
    
    def _visitJob(self, node):
        print('Job')
        for step in node.steps:
            step.accept(self)

    def _visitPipeline(self, node):
        print('Pipeline')
        for group in node.groups:
            group.accept(self)

    def _visitStep(self, node):
        print('Step')
