import Question from "../components/Question";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Home | Trivia Game";
  }, []);

  return (
    <main className="home-container">
      <h1>Welcome to Trivia</h1>
      <p>Here's your random question.</p>
      <Question />
    </main>
  );
}
