const express = require("express");
const path = require("path"); // the path module contains useful methods for manipulating/defining file paths
const { MongoClient, ObjectId } = require('mongodb'); // get the MongoClient class from mongodb

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
app.get("/", async (request, response) => {
    let links = await getLinks();
    console.log(links);
    response.render("index", { title: "Home", menu: links }); // renders /templates/layout.pug
}); 

// Added async to about route as await is used
app.get("/about", async (request, response) => {
    let links = await getLinks();
    response.render("about", { title: "About", menu: links });
});

// Admin Page Paths
app.get("/admin/menu", async (request, response) => {
    let links = await getLinks();
    response.render("menu-list", { title: "Administer menu", menu: links });
})

app.get("/admin/menu/add", async (request, response) => {
    let links = await getLinks();
    response.render("menu-add", { title: "Add menu link", menu: links })
})

app.post("/admin/menu/add/submit", async (request, response) => {
    let newLink = {
        weight: parseInt(request.body.weight),
        path: request.body.path,
        name: request.body.name
    };

    // Add the new link to the database
    await addLink(newLink);

    // Redirect to admin menu list or show a success message
    response.redirect("/admin/menu");
});

// EDIT FUNCTIONALITY
app.get("/admin/menu/edit", async (request, response) => {
    if (request.query.linkId) {
        let linkToEdit = await getSingleLink(request.query.linkId);
        let links = await getLinks();
        response.render("menu-edit", { title: "Edit Menu Link", menu: links, editLink: linkToEdit });
    } else {
        response.redirect("/admin/menu");
    }
});

app.post("/admin/menu/edit/:id/submit", async (request, response) => {
    const idFilter = { _id: new ObjectId(request.body.linkId) };
    const link = {
        weight: parseInt(request.body.weight),
        path: request.body.path,
        name: request.body.name
    };
    await editLink(idFilter, link);
    response.redirect("/admin/menu");
});

// DELETE FUNCTIONALITY
app.get("/admin/menu/delete", async (request, response) => {
    let id = request.query.linkId; // get the ID from the query parameter
    await deleteLink(id); // call the delete function
    response.redirect("/admin/menu"); // redirect back to the menu list
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
    return await results.toArray(); // return the array of data
}

async function getSingleLink(id) {
    db = await connection();
    return await db.collection("menuLinks").findOne({ _id: new ObjectId(id) }); // return single link
}

async function addLink(linkToAdd) {
    db = await connection();
    await db.collection("menuLinks").insertOne(linkToAdd);
    console.log(`Added ${linkToAdd} to menuLinks`)
}

// EDIT LINK FUNCTION
async function editLink(filter, link) {
    db = await connection();
    await db.collection("menuLinks").updateOne(filter, { $set: link });
    console.log(`Updated link with id ${filter._id}`);
}

// DELETE LINK FUNCTION
async function deleteLink(id) {
    db = await connection(); // ensure the client connects
    let filter = { _id: new ObjectId(id) }; // convert string ID to ObjectId
    await db.collection("menuLinks").deleteOne(filter); // delete the link from the database
    console.log(`Deleted link with id ${id}`);
}
