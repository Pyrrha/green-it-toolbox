from abc import ABC, abstractmethod

from viewer.visitor import Visitor

class Node(ABC):
    name = ""

    def get_name(self):
        return self.name
    
    def accept(self, viewer):
        viewer.visit(self)
