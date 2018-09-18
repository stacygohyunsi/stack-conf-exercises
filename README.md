# stack-conf-exercises

The code is written in ReactJS, NodeJS and Express for STACK Developer Conference 2018.

# Exercise 1
Make a GET call to the `/verifytoken` endpoint.

## Setup
- `git clone` this library
- Restore dependencies with `npm install`
- Run `npm start` 
- The server will be running on `http://localhost:9000/`

# Exercise 2
This repo contains a demo client interface and an authorisation server which generates a JWT token  upon a mocked user sign in. The user then makes an API request to a demo API Service server passing along the JWT with it inside the cookies. 

Sign your own jwt using this library (https://github.com/auth0/node-jsonwebtoken) and use it to make a call to the API Service server at XXXX. 

## Setup
- `git clone` this library
- Restore dependencies with `npm install`
- Run `npm start` to start the authorisation server
- The authorisation server will be running on `http://localhost:9000/`
- Open a new terminal and `cd client`
- Then run `npm start` to run the client interface
- Access the client interface on `http://localhost:3000/` 

## Structure
- `~/client` contains the React app and frontend assets
- `~/server` contains the express server and its apis

## Food for thought - Questions to think about:
1. How do I use a private/public key pair instead of using HMAC? What would have to change?
2. What happens if the expiration time is longer/shorter?
3. What happens if i want to revoke the access?
