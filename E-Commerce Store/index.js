const express = require("express");
const path = require("path"); //the path module contains useful methods for manipulting/defining file paths

//SET UP EXPRESS APP

const app = express(); //create express application
const port = process.env.PORT || "8888"; //set up a port number to run the application from.

//Set Up Express
app.set("views", path.join(__dirname, "templates")); //set the "views" Express setting to the path to the folder containing the template files (conventionally, we name this "views" but you can name it whatever you want --for example, "templates")
app.set("view engine", "pug"); //set Express to use "pug" as the template engine (setting: "view engine")

//SET UP THE FOLDER PATH FOR STATIC FILES (e.g. CSS, client-side jS, image files)

app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", (request, response) => {
    //response.status(200).send("Hello");
    // let test = {
    //     message: "Hello!"
    // };
    // response.json(test);
    response.render("index", { title: "Home"}); //renders /templates/layout.pug
}); // at the root of my application if i make a get request there then my callback function will send a server code 200 and also send his text "hello"

app.get("/about", (request, response) => {
    response.render("about", { title: "About" });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})