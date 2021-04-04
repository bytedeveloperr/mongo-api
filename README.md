# Mongo API

Mongo API is a REST API layer built over MongoDB.

## About
Mongo API is a MongoDB REST API based tool that abstract away MongoDB from your code and presents to you and API layer which you can interact with your database through.
The API is language, framework/library and environment agnostic as interactions are made through API calls. It is useful for rapid-prototyping and handy in small projects.

## Installation
If you are connecting to a remote database, you do not have to go through any installation process before you can start using Mongo API. Infact you can use it with any REST API client like Postman or Insomnia. But If you wish to use it locally, you can do that by clone this repository and then install the required packages.
```
git clone https://github.com/devYusuf/mongo-api.git
cd mongo-api
npm install
```
and then you can start the server with `npm start` which will open the server on port 3002

## How to?
Now let's see how to connect to a MongoDB server and fetch the list of all the databases in it.

To connect to a MongoDB server, you need to specify a `mongo` field in your request header and set the value to your MongoDB connection string. An example with curl is shown below:

```
curl -H "mongo: mongodb+srv://username:password@domain" http://mongo.intercord.co/databases | json_pp
```
![Example 1](https://user-images.githubusercontent.com/48928718/113517393-8fbb5d80-9577-11eb-8623-3badae6fe64f.png)
When testing the above, remember to replace the connection string `mongodb+srv://username:password@domain` with your own.
