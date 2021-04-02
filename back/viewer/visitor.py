from abc import ABC, abstractmethod

from abstraction.group import Group
from abstraction.job import Job
from abstraction.node import Node
from abstraction.pipeline import Pipeline
from abstraction.step import Step

class Visitor(ABC):
    def __init__(self, language: str):
        self.language = language

    def get_language(self):
        return self.language

    def visit(self, node: Node):
        if (isinstance(node, Group)):
            return self._visitGroup(node)
        elif (isinstance(node, Job)):
            return self._visitJob(node)
        elif (isinstance(node, Pipeline)):
            return self._visitPipeline(node)
        elif (isinstance(node, Step)):
            return self._visitStep(node)
        # TODO else case

    @abstractmethod
    def _visitGroup(group):
        raise NotImplemented

    @abstractmethod
    def _visitJob(job):
        raise NotImplemented

    @abstractmethod
    def _visitPipeline(pipeline):
        raise NotImplemented

    @abstractmethod
    def _visitStep(step):
        raise NotImplemented