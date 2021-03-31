from ast.group import Group
from ast.job import Job
from ast.node import Node
from ast.pipeline import Pipeline
from ast.step import Step

from viewer.visitor import Visitor
from viewer.pretty_printer import PrettyPrinter

if __name__ == '__main__':
    print('Testing file')
    pipeline = Pipeline()
    pipeline.add_group(Group())