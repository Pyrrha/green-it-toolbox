from typing import *

from abstraction.node import Node
from abstraction.group import Group

class Pipeline(Node):
    groups: List[Group] = []

    def add_group(self, group: Group):
        self.groups.append(group)
