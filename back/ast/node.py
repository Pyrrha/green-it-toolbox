from abc import ABC, abstractmethod

from viewer.visitor import Visitor

class Node(ABC):
    name = ""

    def get_name(self):
        return name
    
    @abstractmethod
    def accept(viewer: Visitor):
        pass