const worker = new Worker('../src/background.js');

const messageToSend = { 
    type: 'hello', 
    content: 'This is a message from the main thread' 
};

worker.postMessage(messageToSend);

worker.onmessage = function(event) {
    console.log('Received message from background script:', event.data);
};