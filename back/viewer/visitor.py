from abc import ABC, abstractmethod

from abstraction.group import Group
from abstraction.job import Job
from abstraction.node import Node
from abstraction.pipeline import Pipeline
from abstraction.step import Step

class Visitor(ABC):
    def visit(self, node: Node):
        if (isinstance(node, Group)):
            self._visitGroup(node)
        elif (isinstance(node, Job)):
            self._visitJob(node)
        elif (isinstance(node, Pipeline)):
            self._visitPipeline(node)
        elif (isinstance(node, Step)):
            self._visitStep(node)
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
