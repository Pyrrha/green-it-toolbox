from abc import ABC, abstractmethod

class Node(ABC):

    def __init__(self, name: str):
        self._name = name

    def get_name(self):
        return self._name
    
    def accept(self, viewer):
        return viewer.visit(self)
