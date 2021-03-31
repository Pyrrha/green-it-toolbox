from abc import ABC, abstractmethod

from ast.node import Node

class Visitor(ABC):
    @abstractmethod
    def visit(node: Node):
        pass
