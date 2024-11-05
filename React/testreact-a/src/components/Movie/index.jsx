export default function Movie(props) {
  /* Expecting the following props:
   * - title (movie title)
   * - year (movie year)
   */
  return(
    <>
      <h3>{props.title}</h3>
      <p>Year released: {props.year}</p>
    </>
  )
}