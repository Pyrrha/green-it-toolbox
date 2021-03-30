from flask import Flask, Blueprint, jsonify

configs_bp = Blueprint('configs', __name__)

@configs_bp.route('/configs', methods=['GET'])
def get_filters():
    return {
        "items": [{
            "title": "Language",
            "choices": {
                "py": "Python",
                "js": "Javascript",
                "php": "PHP",
            },
            "text": "Which language do you use?"
        },
        {
            "title": "Tools used",
            "options": {
                "git": "Git",
                "github": "Github Actions",
                "gitlab": "Gitlab CI",
                "docker": "Docker",
                "github-flow": "Using Github git flow"
            },
            "text": "Choose your tool."

        },
        {
            "title": "Mode",
            "choices": {
                "permissive": "Permissive",
                "strict": "Strict"
            },
            "text": "Select if tests can block a release."
        }]
    }

@configs_bp.route('/configs', methods=['POST'])
def submit_form():
    return {}