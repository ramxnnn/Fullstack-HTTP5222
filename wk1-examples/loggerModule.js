//MODULE EXAMPLE
//The logger is for logging messages to the console.
// This is the Modern Module Syntax
var privateMsg = "My private message";
export function getMessage() {
    console.log(privateMsg);
}

export function setMessage(newMsg) {
    privateMsg = newMsg;
}