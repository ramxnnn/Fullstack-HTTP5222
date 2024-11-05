import {useState} from "react"
export default function Counter() {
  const [count, setCount] = useState(0); //0 is the default value for "count"
  function setCountValue(newVal) {
    setCount(newVal);
  }

  return(
    <div>
      <button onClick={() => setCountValue(0)}>Reset to 0</button>
      <button onClick={() => setCountValue(5)}>Set to 5</button>
      <p>{count}</p>
    </div>
  )
}