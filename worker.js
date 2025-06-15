"use strict";

self.addEventListener("message", (event) => {
  if (event.data == "start") {
    self.postMessage({
      id: "start",
      message: "Web Worker Started to print factorial",
    });
    printFactorial(1);
  }
});

function printFactorial(n) {
  let fact = 1;
  for (let i = n; i > 1; i--) {
    fact = fact * i;
  }
  self.postMessage({ id: n, message: fact });
  setTimeout(() => printFactorial(n + 1), 1000);
}
