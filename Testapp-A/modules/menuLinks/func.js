const { MongoClient, ObjectId } = require("mongodb"); //get the MongoClient class from mongodb

//MONGODB CLIENT SETUP
const dbUrl = "mongodb://127.0.0.1:27017/"; //connection string for MongoDB (use 127.0.0.1 instead of "localhost" especially for Mac)
const client = new MongoClient(dbUrl); //create a new client by passing in the connection string

//MONGODB FUNCTIONS
async function connection() {
  db = client.db("testdb"); //select the "testdb" database
  return db; //return testdb so other code/functions can use it
}
async function getLinks() {
  db = await connection(); //use await because connection() is asynchronous
  let results = db.collection("menuLinks").find({}).sort({ weight: 1 }); //find all so no query ({})
  //find() returns an object of type FindCursor, so we need to run .toArray() to convert to a JSON array we can use
  return await results.toArray(); //return the array of data
}
async function addLink(linkToAdd){
  db = await connection();
  await db.collection("menuLinks").insertOne(linkToAdd);
  console.log(`Added ${linkToAdd} to menuLinks`);
}
async function deleteLink(id) {
  db = await connection();
  let filter = { _id: new ObjectId(id) }; //id is a string, so we need to convert to an ObjectId type
  let result = await db.collection("menuLinks").deleteOne(filter);
  //deleteOne() returns an object with a deletedCount property (if successful, this should equal 1)
  if (result.deletedCount == 1)
    console.log("Link successfully deleted");
}

module.exports = {
  getLinks,
  addLink,
  deleteLink
};