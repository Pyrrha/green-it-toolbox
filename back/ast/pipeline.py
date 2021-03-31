from typing import *

from ast.node import Node
from ast.group import Group

class Pipeline(Node):
    groups: List[Group] = []

    def add_group(self, group: Group):
        self.groups.append(group)
