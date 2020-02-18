# symfony/react_project

# Functionality

- Restaurants list
- Restaurants details
- Login
- Register
- User favorites restaurants

## Backend

- Symfony 5.0.2
- Doctrine (php library for working with databases)
- NelmioCorsBundle (allows to send Cross-Origin Resource Sharing headers)
- MySQL
- Twig

## Frontend_react

- React
- Axios (client http library for Javascript)
- Redux

## Frontend_conduit

- React
- Redux

### Run backend symfony

Install libraries:

- cd backend_symfony
- sudo composer update

- sudo composer require symfony/http-client
- sudo composer require symfony/filesystem

Run backend:

- sudo symfony server:start
- http://localhost:8000/


### Stop backend

- sudo symfony server:stop

### Clear cache

 - php bin/console cache:clear

### Run frontend react

- install react router
  sudo npm install react-router-dom

- cd frontend_react
- npm install
  (to force NPM to install dependencies use: sudo npm install --unsafe-perm=true --allow-root)
- npm run start
- http://localhost:3000/

### Run frontend conduit

- cd frontend_conduit
- sudo npm install
- sudo npm start
- http://localhost:3001/

### Run phpMyAdmin

- http://localhost/phpmyadmin


## CREAR UNA ENTITY

- php bin/console make:entity

## CREAR LA TABLA

- php bin/console doctrine:schema:update --force

## LIMPIAR CACHÉ

- php bin/console cache:clear

### VER LAS RUTAS QUE TENEMOS

- bin/console debug:router

### CREAR NUEVO CONTROLADOR

- php bin/console make:entity