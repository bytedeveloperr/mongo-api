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
curl -H "mongo: mongodb+srv://username:password@hostname" http://mongo.intercord.co/databases | json_pp
```
![List Databases Example](https://user-images.githubusercontent.com/48928718/113518170-7a94fd80-957c-11eb-8dec-ddb54608820e.jpg)

...and, that'a it!. 

Note: When testing the above, remember to replace the connection string `mongodb+srv://username:password@hostname` with your own.

## API endpoints
Note: All API endpoints have an optional query parameter called options.

| Description | Endpoint | Method | Body |
|------|----------|--------|------|
|Get all databases|/databases|GET|
|Create database. database name and a collection is required|/databases|POST|{"database": "db name", "collection": "coll name"}
|Get a single database with the database name|/database/:name|GET
|Get all collections in the database|/collections|GET
|Get a single database with the collection name|/collections/:name|GET
|Create a collection|/collections|POST|{ "name": "name" }
|Rename a collection|/collections/:name|PUT|{ "from": "old collection name", "to":"new collection name"}
|Delete a collection|/collections/:name|DELETE|
|Insert a document in a collection|/collections/:name/insert-one|POST|{/*...key: value*/}
|Insert many documents in a collection|/collections/:name/insert-many|POST|[{/*...key: value*/}]
|Find documents in a collection|/collections/:name/find|GET|
|Find one document in a collection|/collections/:name/find-one|GET|
|Find Distincts Docs in a collection|/collections/:name/distinct|GET|
|Run aggregration pipelines on documents in a collection|/collections/:name/aggregate|GET|
|Update a document in a collection|/collections/:name/update-one|PUT|{/*...key: value*/}
|Update many documents in a collection|/collections/:name/update-many|PUT|[{/*...key: value*/}]
|Delete a document in a collection|/collections/:name/delete-one|DELETE|
|Delete many documents in a collection|/collections/:name/delete-many|DELETE|
|Get all indexes in a collection|/collections/:name/indexes|GET|
|Create index(es) in a collection|/collections/:name/create-index|POST|[{/* indexes */}]
|Drop an index in a collection|/collections/:name/drop-index|DELETE|
|Drop all indexes in a collection|/collections/:name/drop-indexes|DELETE|
|Get information about all indexes in a collection|/collections/:name/index-information|GET|

