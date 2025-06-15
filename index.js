(function () {
  "use strict";
  const list = document.getElementById("list");
  const button = document.getElementById("button");
  const message = document.getElementById("message");
  list.style.fontSize = "12px";
  let worker;

  document.addEventListener("DOMContentLoaded", addListener);

  function addListener() {
    button.innerHTML = "Start Worker";
    button.addEventListener("click", startWorker);
  }

  function stopWorker() {
    worker.terminate();
    button.removeEventListener("click", stopWorker);
    addListener();
    message.innerHTML = "Worker Stopped";
    message.style.color = "red";
  }

  function startWorker() {
    button.innerHTML = "Stop Worker";
    button.removeEventListener("click", startWorker);
    button.addEventListener("click", stopWorker);
    list.innerHTML = "";
    createWorker();
  }

  function createWorker() {
    worker = new Worker("worker.js");
    worker.postMessage("start");
    worker.addEventListener("message", (event) => {
      if (event.data.id == "start") {
        message.innerHTML = event.data.message;
        message.style.color = "green";
      } else {
        const p = document.createElement("p");
        p.innerHTML = `${event.data.id}:${event.data.message}`;
        list.appendChild(p);
      }
    });
  }
})();
