"use strict";

self.addEventListener("message", (event) => {
  if (event.data == "start") {
    self.postMessage("Web Worker Started to print factorial");
    printFactorial(1);
  }
});

let fact = 1;

function printFactorial(n) {
  fact = fact * n;
  self.postMessage(fact);
  setInterval(() => printFactorial(n + 1), 5000);
}
