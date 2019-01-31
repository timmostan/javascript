var event = require("events");
// emitter class
class myEvent extends event {}
// creating object of class myEvent
var myEventObject = new myEvent();
// object of emitter class exposes 'on' method to attach listeners to named Event.
// Attaching listener function to 'namedEvent'
myEventObject.on("namedEvent", function() {
  console.log("Called namedEvent in myEventObject's attached listner");
});
myEventObject.emit("namedEvent");
/**
 * called namedEvent for myEventObject, all the listners
 * listening to "namedEvent" will be callled syncronously
 */