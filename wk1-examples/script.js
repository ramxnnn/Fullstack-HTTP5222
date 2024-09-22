//DEMO BLOCKING VS NON-BLOCKING SCRIPT

//Blocking script is another way of saying sequential code.

// The four lines of code are an example of sequential code (blocking code) because each line must complete executing before the next line can run.

//This means that line 6 and 7, for example prevent line 8 from running first. This is why we see the 7 (the sum) priunted correctly in the console.

var x = 3;
var y = 4;
var sum = x + y;

console.log(sum);

console.log("Step one");

var btn = document.getElementById("click");
// The onclick event handler below is an example of non-blocking code because it doesn't block nthe console.log("Step three") from executing.
btn.onclick = function () {
    console.log("Step two");
}

console.log("Step three");