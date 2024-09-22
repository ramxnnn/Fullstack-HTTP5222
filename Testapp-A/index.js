const express = require("express");
const path = require("path"); // the path module contains useful methods for manipulating/defining file paths
const { MongoClient } = require('mongodb'); // get the MongoClient class from mongodb

// MONGODB CLIENT SETUP
const dbUrl = "mongodb://127.0.0.1:27017/"; // connection string for MongoDB (use 127.0.0.1:27017 instead of "localhost" for mac users)
const client = new MongoClient(dbUrl); // create a new client by passing in the connection string

// SET UP EXPRESS APP

const app = express(); // create express application
const port = process.env.PORT || "8888"; // set up a port number to run the application from.

// Set Up Express
app.set("views", path.join(__dirname, "templates")); // set the "views" Express setting to the path to the folder containing the template files (conventionally, we name this "views" but you can name it whatever you want --for example, "templates")
app.set("view engine", "pug"); // set Express to use "pug" as the template engine (setting: "view engine")

// SET UP THE FOLDER PATH FOR STATIC FILES (e.g. CSS, client-side jS, image files)

app.use(express.static(path.join(__dirname, "public")));

// Convert URLENCODED FORMAT (FOR GET/POST REQUEST) TO JSON
// Urlencoded format is query starting string format (eg. parameter1=value1&parameter2=value2)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // use JSON

// PAGE ROUTES
// if you want to use an asynchronous function in your callback function(see below), you need to also make your callback function asynchronous
app.get("/", async (request, response) => {
    let links = await getLinks();
    console.log(links);
    // response.status(200).send("Hello");
    // let test = {
    //     message: "Hello!"
    // };
    // response.json(test);
    response.render("index", { title: "Home", menu: links }); // renders /templates/layout.pug
}); // at the root of my application if i make a get request there then my callback function will send a server code 200 and also send his text "hello"

// Added async to about route as await is used
app.get("/about", async (request, response) => {
    let links = await getLinks();
    response.render("about", { title: "About", menu: links });
});

// Admin Page Paths (fixed syntax error in route definition)
app.get("/admin/menu", async (request, response) => {
    let links = await getLinks();
    response.render("menu-list", { title: "Administer menu", menu: links });
})

app.get("/admin/menu/add", async (request, response) => {
    let links = await getLinks();
    response.render("menu-add", { title: "Add menu link", menu: links })
})

app.post("/admin/menu/add/submit", async (request, response) => {
    // get data from form (data will be in request)
    // POST form: get data from request.body
    // GET form: get data from request.query
    // console.log(request.body)
    let newLink = {
        weight: parseInt(request.body.weight),
        path: request.body.path,
        name: request.body.name
    };

    // Add the new link to the database
    await addLink(newLink);

    // Redirect to admin menu list or show a success message
    response.redirect("/admin/menu");
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})

// MONGODB FUNCTIONS
async function connection() {
    await client.connect(); // ensure the client connects
    db = client.db("testdb"); // select the "testdb" database
    return db; // return the testdb so other code/functions can use it
}

async function getLinks() {
    db = await connection(); // use await because connection() is asynchronous
    let results = db.collection("menuLinks").find({}); // find all so no query({})
    // find() returns an object of type FindCursor, so we need to run toArray() to convert to a JSON array we can use
    return await results.toArray(); // return the array of data
}

async function addLink(linkToAdd) {
    db = await connection();
    await db.collection("menuLinks").insertOne(linkToAdd);
    console.log(`Added ${linkToAdd} to menuLinks`)
}

