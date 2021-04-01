from abc import ABC, abstractmethod

from abstraction.group import Group
from abstraction.job import Job
from abstraction.node import Node
from abstraction.pipeline import Pipeline
from abstraction.step import Step

class Visitor(ABC):
    def visit(self, node: Node):
        if (isinstance(node, Group)):
            self.__visitGroup(node)
        elif (isinstance(node, Job)):
            self.__visitJob(node)
        elif (isinstance(node, Pipeline)):
            self.__visitPipeline(node)
        elif (isinstance(node, Step)):
            self.__visitStep(node)
        # TODO else case
            

    @abstractmethod
    def __visitGroup(group):
        pass

    @abstractmethod
    def __visitJob(job):
        pass

    @abstractmethod
    def __visitPipeline(pipeline):
        pass

    @abstractmethod
    def __visitStep(step):
        pass