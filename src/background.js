self.onmessage = function(event) {
    var messageData = event.data;
    
    console.log('Received message in background script:', messageData);

    self.postMessage('Message received by background script');
};