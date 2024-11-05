import {useState} from "react"
import Movie from "../Movie"
import "./movieList.css"

//hard-coded array of movies (can later change this to get data from an API if you want)
var moviesArray = [
  {
    title: "The King's Man",
    year: "2021"
  },
  {
    title: "The Dark Knight",
    year: "2008"
  }
];

export default function MovieList() {
  const [listOfMovies, setListOfMovies] = useState(moviesArray);

  function handleForm(e) {
    e.preventDefault(); //prevent page reload
    //console.log(e.target.title.value);
    let newMovie = {
      title: e.target.title.value,
      year: e.target.year.value
    };
    //listOfMovies.push(newMovie); //BAD: a mutable change because we're directly trying to modify listOfMovies
    //[ { ...}, {...}, { ... }]
    setListOfMovies(
      [
        ...listOfMovies,
        newMovie
      ]
    );
  }

  return(
    <section>
      <h2>My movies</h2>
      <form onSubmit={handleForm}>
        <label htmlFor="title">Movie title:</label>
        <input type="text" id="title" name="title" placeholder="e.g. Turning Red" />
        <label htmlFor="year">Release year:</label>
        <input type="text" id="year" name="year" placeholder="e.g. 2022" />
        <button type="submit">Add movie</button>
      </form>
      {
        listOfMovies.map((m) => (
          <Movie 
            key={m.title + m.year}
            title={m.title}
            year={m.year}
          />
        ))
      }
    </section>
  )
}