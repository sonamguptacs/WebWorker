(function () {
  "use strict";
  const rootElement = document.getElementById("root");
  const list = document.createElement("div");
  rootElement.appendChild(list);
  const button = document.getElementById("button");
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
    const p = document.createElement("p");
    p.innerHTML = "Worker Stopped";
    list.appendChild(p);
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
      const p = document.createElement("p");
      p.innerHTML = event.data;
      list.appendChild(p);
    });
  }
})();
