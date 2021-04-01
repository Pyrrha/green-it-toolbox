from abc import ABC, abstractmethod

class Node(ABC):
    name = ""

    def get_name(self):
        return self.name
    
    def accept(self, viewer):
        viewer.visit(self)
