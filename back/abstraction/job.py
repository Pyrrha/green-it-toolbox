from typing import *

from abstraction.node import Node
from abstraction.step import Step

class Job(Node):
    steps: List[Step] = []

    def add_step(self, step: Step):
        self.steps.append(step)
