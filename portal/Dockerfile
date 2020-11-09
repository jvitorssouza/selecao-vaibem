# Set the base image to node:12-alpine
FROM node:12-alpine as build

# Specify where our app will live in the container
WORKDIR /app

# Copy the React App to the container
COPY . /app/
COPY .env /app/.env


# Prepare the container for building React
RUN yarn
RUN yarn add global react-scripts

# We want the production version
RUN yarn build

# Prepare nginx
FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

# Fire up nginx
EXPOSE 3333
CMD ["nginx", "-g", "daemon off;"]
