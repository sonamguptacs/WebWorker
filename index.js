(function () {
  "use strict";
  const list = document.getElementById("list");
  const button = document.getElementById("button");
  const message = document.getElementById("message");
  const internetStatus = document.getElementById("internet_status");
  list.style.fontSize = "12px";
  let worker;
  let isConnected = "onLine" in navigator ? true : false;

  document.addEventListener("DOMContentLoaded", onLoad);

  function onLoad() {
    addListener();
    setStatus();
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);
  }

  function handleOnlineStatus() {
    isConnected = true;
    setStatus();
  }

  function handleOfflineStatus() {
    isConnected = false;
    setStatus();
  }

  function setStatus() {
    if (!isConnected) {
      internetStatus.innerHTML = "Off";
      internetStatus.style.color = "red";
    } else {
      internetStatus.innerHTML = "On";
      internetStatus.style.color = "green";
    }
  }

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
