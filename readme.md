# Web Worker Example

Created a simple html page to demonstrate web worker usage.

I've used web worker to keep printing factorial till n numbers until stopped.

Please stop it soon 😉

# What is a web worker ?

A web worker is a feature that runs on a separate thread than your application's main thread.

It can be used to run processes which require heavy and time consuming computation without blocking your main thread.

A web worker can't manipulate your DOM.

# Usage

Create a web worker object as shown below

***index.js***
``` 
const worker = new Worker('worker.js')
```

and that's all 😇

- `worker.js` is the file where logic for calculating factorials is kept

### But How will factorial calculation start !?

to invoke factorial calculation , `worker` object can be used to send some message using `postMessage` to `worker.js` where it will listen the message and call factorial function.

***index.js***
```
worker.postMessage('start');
```

***worker.js***

```
self.addEventListener('message' , (event) => {
    //do something
})
```

### Great , but wait , worker can't manipulate DOM , then how it prints factorial on screen ?

like your `main thread` send message to `worker.js` ,` worker.js` can also send message to main thread using the `self` object which will exactly point to the `worker` object decalred in your `index.js` . So you can receive factorial in your main js file and do DOM manipulations there.

***worker.js***
```
self.postMessage(//send factorial//);
```

***index.js***

```
worker.addEventListener('message' , (event) => {
    //do something
})
```

### Okay . Now we should stop worker . right ?? 😀

Just call

***index.js***
```
worker.terminate();
```