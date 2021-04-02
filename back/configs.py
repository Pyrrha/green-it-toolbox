import json
from flask import Flask, Blueprint, jsonify, request

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
                },
                "docker": {
                  "label": "Docker"
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

@configs_bp.route('/configs', methods=['POST'])
def submit_form():
    request_json = request.get_json()

    # {"y": "js", "tools_used[options]": ["git", "github-flow"], "environments[options]": "prod"}
    # {"language[choice]": "js", "tools_used[options]": ["git", "github-flow"], "environments[options]": "prod"}
    # {"language[choice]": "py", "tools_used[options]": ["git", "github-flow"], "environments[options]": ["prod", "staging"]}

    language = request_json.get('language[choice]')
    tools_used = request_json.get('tools_used[options]')
    environments = request_json.get('environments[options]')

    print('Request!!')
    jscfgtbrfe = request.get_json()
    print(jscfgtbrfe)
    print(f'Request form: {request.form}')

    return {
        "items": [{
            "title": "Dockerfile",
            "content": """FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD [ "python", "./app.py" ]
""",
            "modal": "Texte in modal view to explain how to install it.",
            "lang": "docker"
        },
        {
            "title": "Dockerfile",
            "content": """FROM node:10-alpine as builder

# Copy the package.json to install dependencies
COPY package.json ./

# Install the dependencies and make the folder
RUN yarn install && mkdir /front && mv ./node_modules ./front

WORKDIR /front

COPY . .

# Build the project and copy the files
RUN yarn run build


FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /front/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
""",
            "modal": "Just place it in a node-derivated project root folder. You'll be able to create docker images using docker build .",
            "lang": "docker"
        },
        {
            "title": "Github Action",
            "content": f"""name: CD

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Deployment
        uses: easingthemes/ssh-deploy@v2.1.4
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          REMOTE_PORT: ${{ secrets.REMOTE_PORT }}
          TARGET: ${{ secrets.REMOTE_TARGET }}
          SOURCE: "src/"

      - name: Restart server
        uses: garygrossgarten/github-action-ssh@release
        with:
          command: sudo systemctl restart back.service
          host: ${{ secrets.REMOTE_HOST }}
          username: ${{ secrets.REMOTE_USER }}
          privateKey: ${{ secrets.SERVER_SSH_KEY }}""",
            "modal": "Create a YAML file under .github/workflows/ at the root of your Git repository. Name it as you want, but the extension must be yml or yaml. You'll need to create secrets variables as indicated in the file to provide information needed for the good execution of this CI.",
            "lang": "yaml"
        }]
    }