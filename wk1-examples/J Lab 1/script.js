import { addItem, getItemCount } from "./itemCollection.js";

console.log("Initial item count:", getItemCount());

addItem("apple");
addItem("oranges");
addItem("cherries");

console.log("Updated item count:", getItemCount());
