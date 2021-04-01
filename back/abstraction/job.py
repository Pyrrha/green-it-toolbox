from typing import *

from abstraction.node import Node
from abstraction.step import Step

class Job(Node):
    jobs: List[Step] = []
