# symfony/react_project

Restaurants project made with a Symfony backend and 2 frontends (React and Vue).

***

# Functionality

- Restaurants list (react and vue)
- Restaurant details (react and vue)
- Login (react)
- Register (react)
- User favorites restaurants (react)
- Update user data (react)

***

## Backend

- Symfony 5.0.2
- Doctrine (php library for working with databases)
- NelmioCorsBundle (allows to send Cross-Origin Resource Sharing headers)
- MySQL
- Twig

***

## Frontend_react (testing)

- React
- Axios (client http library for Javascript)
- Redux


***

## Frontend_conduit

- React
- Redux

***

## Frontend_vue

- Vue 2.6.10

***

### Run backend symfony

Install libraries:

- cd backend_symfony
- sudo composer update

- sudo composer require symfony/http-client
- sudo composer require symfony/filesystem

Run backend:

- sudo symfony server:start
- http://localhost:8000/

***

### Development

## Create Entity

- php bin/console make:entity

## Create table

- php bin/console doctrine:schema:update --force

## Clean cache

- php bin/console cache:clear

### See existing routes

- bin/console debug:router

### Create controller

- php bin/console make:entity

### Stop backend

- sudo symfony server:stop

***

### Run frontend react

- install react router
  sudo npm install react-router-dom

- cd frontend_react
- npm install
  (to force NPM to install dependencies use: sudo npm install --unsafe-perm=true --allow-root)
- npm run start
- http://localhost:3000/

***

### Run frontend conduit

- cd frontend_conduit
- sudo npm install
- sudo npm start
- http://localhost:3001/


***

### Run frontend vue

- cd frontend_vue
- sudo npm install
- sudo npm run lint --fix
- sudo npm run serve -- --port 3003 --host 0.0.0.0 --public 0.0.0.0:3003
- http://localhost:3003/

***

### Run phpMyAdmin

- http://localhost/phpmyadmin

***

### Docker-compose

Build container:

- sudo docker-compose build

Run:

- sudo docker-compose up

### Portainer

- http://localhost:9000/#/home
