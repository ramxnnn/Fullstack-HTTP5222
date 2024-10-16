const express = require("express");
const path = require("path"); //the path module contains useful methods for manipulating/defining file paths
const router = require("./modules/menuLinks/router");


//SET UP EXPRESS APP
const app = express(); //create an Express application
const port = process.env.PORT || "8888"; //set up a port number to run the application from

//SET UP EXPRESS APP TO USE PUG AS A TEMPLATE ENGINE
app.set("views", path.join(__dirname, "templates")); //set the "views" Express setting to the path to the folder containing the template files (conventionally, we name this "views" but you can name it whatever you want--for example, "templates")
app.set("view engine", "pug"); //set Express to use "pug" as the template engine (setting: "view engine")

//SET UP THE FOLDER PATH FOR STATIC FILES (e.g. CSS, client-side JS, image files)
app.use(express.static(path.join(__dirname, "public")));

//SET UP ROUTER TO USE FOR PAGE PATHS
app.use("/", pageRouter);
app.use("/admin/menu", adminRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})

