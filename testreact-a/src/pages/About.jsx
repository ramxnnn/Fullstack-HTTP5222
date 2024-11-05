import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About | Trivia Game";
  }, []);

  return (
    <main className="about-page">
      <h1>About this site</h1>
      <p>This is a Trivia Game.</p>
      <Link to="/">Go back to the home page</Link>
    </main>
  );
}
