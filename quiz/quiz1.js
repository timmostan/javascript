for (var i=0; i<3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
//The setTimeout function callback isn’t triggered until the for loop execution has completed. When the for loop has finished executing the value of i is 3. 
//Now when the setTimeout call begins to execute it uses the last set value of i which is 3. Hence 3 is printed in all the setTimeout callbacks.
//fix1: - use IIFE
/* for(var i = 0; i < 3; i++){
    (function(i){
        setTimeout(function(){
            console.log(i);
        }, 1000);
    })(i);
}  */
//fix2: - use let i = 0;  The let keyword creates a separate scope for each iteration making it possible to print the consecutive variable value
/* for (let i=0; i<3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
} */