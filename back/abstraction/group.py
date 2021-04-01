from typing import *

from abstraction.node import Node
from abstraction.job import Job

class Group(Node):
    jobs: List[Job] = []

    def add_job(self, job: Job):
        self.jobs.append(job)
