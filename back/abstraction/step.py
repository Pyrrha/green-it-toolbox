from abstraction.node import Node

class Step(Node):

    def __init__(self, name: str, command: str):
        super.__init__(name)
        self._command = command

    def get_command(self):
        return self._command
