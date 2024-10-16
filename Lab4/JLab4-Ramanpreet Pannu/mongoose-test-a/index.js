const express = require("express");
const path = require("path"); //needed when setting up static/file paths
const dotenv = require("dotenv");

// Load the environment variables from .env
dotenv.config();

const db = require("./modules/movies/db"); // Load the `movies.js` module

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

/// USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (request, response) => {
  let movieList = await db.getMovies(); // Get all movies from the database
  // If there are no movies in the collection, initialize with some content, then get the movies again
  if (!movieList.length) {
    await db.initializeMovies();
    movieList = await db.getMovies();
  }
  response.render("index", { movies: movieList }); // Pass the movies list to the view
});

app.get("/update", async (request, response) => {
  // Update a movie's rating (hardcoded for demo)
  await db.updateMovieRating("The GodFather", "R");
  response.redirect("/");
});

app.get("/delete", async (request, response) => {
  // Delete movies with the rating "R" (hardcoded for demo)
  await db.deleteMoviesByRating("R");
  response.redirect("/");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 

