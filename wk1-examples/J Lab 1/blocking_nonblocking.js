// Blocking code example
console.log("1. Start");
console.log("2. Running blocking operation");
console.log("3. End");

// Non-blocking code example
console.log("4. Start");
setTimeout(() => {
  console.log("6. Delayed operation");
}, 0);
console.log("5. End");
