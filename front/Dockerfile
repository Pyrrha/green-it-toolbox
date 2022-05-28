FROM node:10-alpine as builder

# Copy the package.json to install dependencies
COPY package.json ./

# Install the dependencies and make the folder
RUN yarn install && mkdir /front && mv ./node_modules ./front

WORKDIR /front

COPY . .

# Build the project and copy the files
RUN yarn run build


FROM nginx:1.22.0-alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /front/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
