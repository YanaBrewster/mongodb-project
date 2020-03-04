# MongoDB project

## To run this project you need nodejs installed

1. git clone https://github.com/YanaBrewster/mongodb-project.git
2. cd into MongoDB-project in the terminal
3. enter in: npm i
4. type the following in the terminal: nodemon -L index.js
6. access the project via your localhost (example; localhost:3000) or get data using the Postman app

Using the Postman app, append the a link (see below) to access data from MongoDB:

POST '/registerUser'
GET '/allUsers'
POST '/loginUser'


Select 'Body' > 'raw' and 'JSON' in the Postman app
Input the data parameters stated below and send.

example:

{
"username" : "Yoobee",
"email" : "yoobee@colleges.com",
"password" : "password"
}
