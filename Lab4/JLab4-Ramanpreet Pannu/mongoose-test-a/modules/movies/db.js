const mongoose = require("mongoose");

// Use the MongoDB connection string with environment variables
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// Set up the Movie Schema and model
const MovieSchema = new mongoose.Schema(
  {
    title: String,
    year: Number,
    rating: String
  },
  { collection: "movie" } // Ensure it matches your "movie" collection name
);

// Create the Movie model associated with the "movie" collection
const Movie = mongoose.model("Movie", MovieSchema);

// MONGODB FUNCTIONS

// Connect to MongoDB
async function connect() {
  await mongoose.connect(dbUrl); // Connect to MongoDB using the connection string
}

// Function to add some initial movies to the DB.
async function initializeMovies() {
  const movieList = [
    {
      title: "The GodFather",
      year: 1972,
      rating: "PG-13"
    },
    {
      title: "The Dark Knight",
      year: 2008,
      rating: "PG-13"
    }
  ];
  await Movie.insertMany(movieList); // Insert multiple movies into the collection
}

// Get all movies from the "movie" collection, sorted by year
async function getMovies() {
  await connect();
  return await Movie.find({}).sort({ year: 1 }); // Return all movies sorted by release year
}

// Function to update a movie's rating by title
async function updateMovieRating(title, newRating) {
  await connect();
  await Movie.updateOne(
    { title: title }, // Filter by title
    { rating: newRating } // Update the rating
  );
}

// Function to delete movies by rating
async function deleteMoviesByRating(rating) {
  await connect();
  await Movie.deleteMany({ rating: rating }); // Delete all movies with the specified rating
}

// Export the functions for use in other files
module.exports = {
  initializeMovies,
  getMovies,
  updateMovieRating,
  deleteMoviesByRating
};
