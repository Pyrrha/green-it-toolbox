from typing import *

from ast.node import Node
from ast.job import Job
from viewer.visitor import Visitor

class Group(Node):
    jobs: List[Job] = []

    def accept(self, visitor: Visitor):
        visitor.visit(self)