# passport_demo

This basic implementation of adding Passport to an existing project was used as a demonstration for CS498 RK1. This code is provided as-is for learning purposes, and is NOT meant to be a 'starter code' for students' final projects. You are free to use it as such if you would like, but you are responsible for installing whatever packages you may want, making sure there are no bugs, and modifying the code as necessary to fit into your projects. 

## Getting started

First, `npm install`.

cd to node_modules and type "sudo npm install cookie-session"

Then make sure you have two terminals open; in one, type `npm start` to run the backend, and in the other, type `npm run dev` to run the frontend. 

Then go to `http://localhost:3000/` to start using the app

Database:     mlab.com
Accountname:498fp
Email:richarlzyao@163.com
Username:498fp
Password:Abc20192019


## DB

GET http://localhost:3000/api/DB/abc    will return wishList and lastCategoryIndex..   "abc" is the email

POST http://localhost:3000/api/DB/abc/12  will post the id to wishList .  "abc" is the email and "12" is the id to push.

DELETE http://localhost:3000/api/DB/abc/12 .  delete the id from wishList . "abc" is email, "12" is the id to delete





