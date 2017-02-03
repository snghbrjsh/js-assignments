var myApp = myApp || {};
(function(){
    function EventManager(){
        this.eventList = {};
    }

    EventManager.prototype.subscribe = function(event, fn){
        console.log(event);
        console.dir(this.eventList);
        this.eventList[event] = this.eventList[event] || [];
        this.eventList[event].push(fn);
    }

    EventManager.prototype.notifySubscribers = function(event, result){
        if(this.eventList[event]) {
            var subscribers = this.eventList[event];

            for(var i=0; i<subscribers.length; i++){
                subscribers[i].call(this, result);
            }
        }
    }
    myApp.EventManager = EventManager;
})();