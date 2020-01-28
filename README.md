# symfony/react_project

## Backend

- Symfony 5.0.2
- Doctrine (php library for working with databases)
- NelmioCorsBundle (allows to send Cross-Origin Resource Sharing headers)
- MySQL

## Frontend

- React
- Axios (client http library for Javascript)
- Redux

### Run backend symfony

Install libraries:

- cd backend_symfony
- sudo composer update

Run backend:

- sudo symfony server:start
- http://localhost:8000/


### Stop backend

- sudo symfony server:stop

### Clear cache

 - php bin/console cache:clear

### Run frontend react

- cd frontend_react
- npm install
  (to force NPM to install dependencies use: sudo npm install --unsafe-perm=true --allow-root)
- npm run start
- http://localhost:3000/

### Run phpMyAdmin

- http://localhost/phpmyadmin




## CREAR UNA ENTITY

- php bin/console make:entity

## CREAR LA TABLA

- php bin/console doctrine:schema:update --force

## LIMPIAR CACHÉ

- php bin/console cache:clear


