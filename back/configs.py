import json
from flask import Flask, Blueprint, request

from viewer.github_action_viewer import GithubAction
from viewer.gitlab_ci_viewer import GitlabCI

from parser import Parser

configs_bp = Blueprint('configs', __name__)


def create_configuration(workflow, tool: str) -> dict:
    print(f'Tool: {tool}')
    
    toolInstance = None
    if tool == "github":
        toolInstance = GithubAction()
    elif tool == "gitlab":
        toolInstance = GitlabCI()
    else:
        return None
    
    content = workflow.accept(toolInstance)

    return {
        "title": "À remplir",
        "content": content,
        "modal": "Toto",
        "lang": toolInstance.get_language()
    }

@configs_bp.route('/configs', methods=['GET'])
def get_filters():
    return {
        "items": [{
            "title": "Language",
            "choices": {
                "py": {
                    "label": "Python"
                }
            },
            "text": "Which language do you use?"
        },
        {
            "title": "Tools used",
            "options": {
                "github-flow": {
                  "label": "Using Github git flow",
                  "default": True 
                },
                "github": {
                  "label": "Github Actions"
                },
                "gitlab": {
                  "label": "Gitlab CI"
                }
            },
            "text": "Choose your tool."
        },
        {
            "title": "Environments",
            "options": {
                "staging": {
                    "label": "Staging"
                },
                "prod": {
                    "label": "Production",
                    "default": True
                }
            },
            "text": "Select desired environments."
        }]
    }

def make_list(thing) -> list:
    result = []

    if isinstance(thing, str):
        result.append(thing)
    elif isinstance(thing, list):
        result.extend(thing)

    return result

@configs_bp.route('/configs', methods=['POST'])
def submit_form():
    # Retrieve request data
    request_json = request.get_json()

    # {"language[choice]": "py", "tools_used[options]": ["git", "github-flow"], "environments[options]": ["prod", "staging"]}

    request_langage = request_json.get('language[choice]', [])
    print(f'Request L: {request_langage}')
    languages = make_list(request_langage)
    print(f'List L: {languages}')

    request_tools = request_json.get('tools_used[options]', [])
    print(f'Request T: {request_tools}')
    tools_used = make_list(request_tools)
    print(f'List T: {tools_used}')

    request_environments = request_json.get('environments[options]')
    print(f'Request E: {request_environments}')
    environments = make_list(request_environments)
    print(f'List E: {environments}')

    configurations = {
        "items": []
    }

    for language in languages:
        parser = Parser(f'configs/{language}.json') # TODO secure that
        workflow = parser.parse()
        for tool in tools_used:
            configuration = create_configuration(workflow, tool)
            configurations["items"].append(configurations)

    return configurations
