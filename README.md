# stack-conf-exercises
The code is written in ReactJS, NodeJS and Express. 

# Usage
1. `npm install --save`
2. `node index.js` to start the backend server
3. Open a new terminal and `cd client`. Then run `npm start` to run the front end application.

# Exercise
Sign your own jwt using this library (https://github.com/auth0/node-jsonwebtoken) and use it to make a call to the verifying server. 

# Food for thought - Questions to think about:
1. How do I use a private/public key pair instead of using HMAC? What would have to change?
2. What happens if the expiration time is longer/shorter
3. What happens if i want to revoke the access?
