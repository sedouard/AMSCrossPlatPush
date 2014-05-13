var azure = require('azure');

//call POST https://<service-name>.azure-mobile.net/api/<endpoint name> with the tag you want in the query parameter

exports.post = function(request, response) {
    
    
    var hub = azure.createNotificationHubService("<Your service bus name>", "<Your full permission connection string>");
    
    hub.apns.send(request.query.tag, {alert:"Breaking News!"}, function(error){
        
        if(!error){
            response.send(statusCodes.OK, { message : 'Sucessfully sent notification!' });
        }
        else{
            response.send(500, { message : error });
        }
    
    });
    
    
    
};
