var azure = require('azure');

//call POST https://<service-name>.azure-mobile.net/api/<endpoint name> with the tag you want in the query parameter

exports.post = function(request, response) {
    
    
    var hub = azure.createNotificationHubService("crossplatpushdemohub", "Endpoint=sb://crossplatpushdemohub-ns.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=AGeyP6352Hg585VK88XkjrXwKy37st/dp4xVGrpdyO4=");
    
    var sendMessage = function(tag, message){
        
        //note that even though the Hub will take care of talking to each service
        //you must provide a platform-specific formatted message
        
        //send to tagged ios devices
        hub.apns.send(request.query.tag, {alert:message}, function(error){
        
            if(error){
                console.error(error);
            }

    
        });
        
        //send to tagged andriod devices
        hub.gcm.send(request.query.tag, {data:{ message: message }}, function(error){
            if(error){
                console.error(error);
            }
        });
        
        
        response.send(statusCodes.OK, { message : 'Sent Notification!' });
    }
    
    sendMessage(request.query.tags, request.query.message);
    
    
    
    
    
};
