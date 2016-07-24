# Eve Statis Data Translator

Translates basic static eve api data to json and places it in a mongo database.

Intended use it to maintain old and new items for the EOS app

###Tech Stack###
- Express
- Nodejs
- MongoDb (with Mongoose)

###TO RUN###

*Assuming you have node and mongo installed*

Travel to the base directory of this project where you saved it.
####Setup####

This steps will download the required dependencies to run the app.

- 1: run 'npm install' 

####Running####
- 2: run 'mongod'  in a new console to start up your mongo database
- Finally: run 'node server' in a new console to start up the application

Now the server should be running on localhost:12345 :+1:
