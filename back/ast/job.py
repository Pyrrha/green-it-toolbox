from typing import *

from ast.node import Node
from ast.step import Step

class Job(Node):
    jobs: List[Step] = []
