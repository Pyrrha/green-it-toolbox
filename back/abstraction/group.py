from typing import *

from abstraction.node import Node
from abstraction.job import Job
from viewer.visitor import Visitor

class Group(Node):
    jobs: List[Job] = []
