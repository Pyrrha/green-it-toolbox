from flask import Flask, Blueprint, jsonify

configs_bp = Blueprint('configs', __name__)

@configs_bp.route('/configs', methods=['GET'])
def get_filters():
    return {
        "items": [{
            "title": "Language",
            "choices": {
                "py": {
                    "label": "Python"
                },
                "js": {
                    "label": "Javascript"
                },
                "php": {
                    "label": "PHP"
                }
            },
            "text": "Which language do you use?"
        },
        {
            "title": "Tools used",
            "options": {
                "git": {
                  "label": "Git",
                  "default": True,
                },
                "github": {
                  "label": "Github Actions"
                },
                "gitlab": {
                  "label": "Gitlab CI"
                },
                "docker": {
                  "label": "Docker"
                },
                "github-flow": {
                  "label": "Using Github git flow",
                  "default": True 
                },
            },
            "text": "Choose your tool."

        },
        {
            "title": "Mode",
            "choices": {
                "permissive": {
                    "label": "Permissive",
                },
                "strict": {
                    "label": "Strict"
                }
            },
            "text": "Select if tests can block a release."
        }]
    }

@configs_bp.route('/configs', methods=['POST'])
def submit_form():
    return {
        "items": [{
            "title": "Dockerfile",
            "content": "from nginx:latest...",
            "modal": "Texte in modal view to explain how to install it."
        }]
    }