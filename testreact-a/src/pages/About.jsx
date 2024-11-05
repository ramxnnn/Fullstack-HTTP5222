import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About | Trivia Game";
  }, []);

  return (
    <main>
      <h1>About this site</h1>
      <p>This is just a site to test out React.</p>
      <Link to="/">Go back to the home page</Link>
    </main>
  );
}
