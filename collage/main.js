var ctx; 
var canvas1; 
var stuff = []; 
var thingInMotion; 
var offsetx; 
var offsety; 
var tid; 
var savedgco; 
var images = []; 
var videotext1 = "<video id=\"XXXX\"  preload=\"auto\" loop=\"loop\" muted> <source src=\"XXXX.webm\" type=\'video/webm; codec=\"vp8, vorbis\"\'> "; 
var videotext2="<source src=\"XXXX.mp4\" type=\'video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"\'> <source src=\"XXXX.ogv\" type=\'video/ogg; codecs=\"theora, vorbis\"\'>"
var videotext3="Your browser does not accept the video tag.</video>"; 
var mediainfo=[
    ['heart', 300,40,100,30,'red'],
    ['rect',620,400,100,150,"purple"],
    ['oval',600,50,30,2,1,'green'],
    ['oval',80, 500, 30, 2, 1, 'blue'],
    ['picture',5,150, 150, 200,'img1.jpg'],
    ['picture',500,150,280,210,'img2.jpg']
];
var videocount =0; 
var okaytogo = false; 
var textmsg = "Loading videos "; 


//Header for init
function init() {
    //Set variable to reference to canvas element
	canvas1 = document.getElementById('canvas');
    //Prevents change of cursor to default
    canvas1.onmousedown = function () { return false; };
    //Set handling for double-click
    canvas1.addEventListener('dblclick',makenewitem,false);
    //Set handling for start of dragging
    canvas1.addEventListener('mousedown',startdragging,false);
    //Set variable to hold the context
    ctx = canvas1.getContext("2d");
    //Save initial gco
    savedgco = ctx.globalCompositeOperation;
    //Call createlements, which uses the external file contents
    createelements();
    //Draw all the elements in stuff
    drawstuff();
    //Write the textmsg indicating waiting for videos
    ctx.fillText(textmsg,100,100);
    //Set up handling for timing
    loadid = setInterval(loading,2000);
    //Set border color
    ctx.strokeStyle = "blue";   
} 

//Header for createelements
function createelements() {
    //Will hold name of media
    var name ;
    //Used to manipulate array
    var i;
    //Will hold the type
    var type;
    //Will hold the divelement
    var divelement;
    //Will hold the combined videomarkup template
    var videomarkup;
    //Will hold the ref. to any newly created video element
    var velref;
    //Will hold any newly created videoblock
    var vb;
    //Will hold any newly created image variable
    var imgdummy;
    //Loop through all the content
    for (i=0;i<mediainfo.length;i++) {
         //Removes first element from array
        type = mediainfo[i].shift();
        //Holds the first subarray (minus the original 0th element)
        info = mediainfo[i];
        //Switch on the type
        switch(type) {
            //Video case
            case 'video':
                //Increment this count, to be used for determining if all videos loaded
                videocount++;
                //Base name of the three video files
                name = info[0];
                //Create a div
                divelement= document.createElement("div");
                //Make the template
                videomarkup = videotext1+videotext2+videotext3;
                //Swap in the base name
                videomarkup = videomarkup.replace(/XXXX/g,name);
                //Put the result in the div
                divelement.innerHTML = videomarkup;
                //Add to the body so it is now part of document; Note: it isn’t visible yet
                document.body.appendChild(divelement);
                //Get the reference
                velref = document.getElementById(name);
                //Start the ended event
                velref.addEventListener("ended",restart,false);
                //Start the loadeddata event
                velref.addEventListener("loadeddata",videoloaded,false);
                //Create the videoblock element
                vb = new Videoblock(info[2],info[3],info[4],info[5],info[6],info[7],info[8],velref,info[9],info[1], info[10]);
                //Add to the stuff array
                stuff.push(vb);
                //Exit the switch
                break ;
            //Picture case   
            case 'picture':
                //Create an image variable
                imgdummy = new Image();
                //Set its src
                imgdummy.src = info[4];
                //Add to the array of images
                images.push(imgdummy);
                //Add to the stuff array
                stuff.push(new Picture(info[0],info[1],info[2],info[3],images[images.length-1]));
                //Exit the switch
                break;
            //The heart case    
            case 'heart':
                //Create heart object and add to stuff
                stuff.push(new Heart(info[0],info[1],info[2],info[3],info[4]));
                //Exit the switch
                break ;
            //The oval case    
            case 'oval':
                //Create the oval object and add to stuff
                stuff.push(new Oval(info[0],info[1],info[2],info[3],info[4],info[5]));
                //Exit the switch
                break ;
            //The rect case    
            case 'rect':
                //Create the rect object and add to stuff
                stuff.push(new Rect(info[0],info[1],info[2],info[3],info[4]));
                //Exit the switch
                break;
        //Close the switch       
        }
    //Close the for loop    
    }   
} 

//Function header for drawstuff
function drawstuff() {
    //Clear (erase) canvas
	ctx.clearRect (0,0,800,600);
    //Set color for frame
    ctx.strokeStyle = "black";
    //Set lineWidth
    ctx.lineWidth = 2;
    //Draw frame
    ctx.strokeRect(0,0,800,600);
    //Iterate through the stuff array
    for (var i=0;i<stuff.length;i++) {
        //Invoke the draw method for each member of the array
        stuff[i].draw();
    }
} 

//Restarting video clip
function restart(ev) {
    //The video that just ended
    var v = ev.target ;
    //Set current time back to 0
    v.currentTime=0;
    //Play the video
    v.play();
}

//Header for videoloaded function; handler for event of data being loaded for a video
function videoloaded(ev) {
	//Put message onscreen (will not remain on canvas for long)
    ctx.fillText(ev.target.id+" loaded.",400,100*videocount);
    //Start playing the video
    ev.target.play();
    //Decrement the count of videos still to be loaded
    videocount--;
    //When no more ...
    if (videocount==0) {
        //Set okaytogo to true
        okaytogo = true;
    }
} 


//Header for loading
function loading() {
	//If all video(s) loaded
    if (okaytogo) {
        //Stop the timing
        clearInterval(loadid);
        //Start new timing event, to draw every 40 millisec
        tid = setInterval(drawstuff,40);
        //Close if okaytogo
    }
    //Else
    else {
        //Add a dot to the message
        textmsg+=".";
        //Write out the message
        ctx.fillText(textmsg,100,100);
        //close the else
    }
} 


// /Function header for distsq. Takes two points (2x2 values) as parameters
function distsq (x1,y1,x2,y2) {
	//done to avoid taking square roots
    //Set difference in x
    var xd = x1 - x2;
    //Set difference in y
    var yd = y1 - y2;
    //Returns sum of squares; this is the square of the distance between the two points
    return ((xd*xd) + (yd*yd) );
} 

//Header for videoblock
function Videoblock(sx,sy,x,y,w,h,scale,videoel,volume,angle,alpha) {
	this.sx = sx;
    this.sy = sy;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.videoelement = videoel;
    this.volume = volume;
    this.draw = drawvideo ;
    this.overcheck = overvideo;
    this.angle = angle;
    this.cosine = Math.cos(angle);
    this.sine = Math.sin(angle);
    this.scale = scale;
    this.alpha = alpha;
    videoel.volume = 0;
}

//Header for overvideo
function overvideo (mx,my) {
	omx = mx;
    omy = my;
    //Is angle not 0...need to do more complex checking
    if (this.angle!=0) {
        //Calculate horizontal distance
        omx = omx-this.x ;
        //Calculate vertical difference
        omy = omy - this.y;
        //Multi-steps for adjustment for angle
        mx = omx*this.cosine + omy*this.sine;
        
        my = -omx*this.sine + omy*this.cosine;
        mx = this.x +mx;
        my = this.y + my;
    }
    //Now do adjustment for scaling         
    if (this.scale!=1) {
       
       alert("prescaling mx is "+mx+" prescaling my is "+my);
       mx = mx/this.scale;
       my = my/this.scale;
    }
    //Can now do standard rectangle checking
    return( (mx>=this.x)&&(mx<=(this.x+this.w))&&(my>=this.y)&&(my<=(this.y+this.h))) ;  
}  

//Header for drawvideo
function drawvideo() {
	//Save current globalAlpha
    var savedalpha = ctx.globalAlpha;
    //Set how to combine
    ctx.globalCompositeOperation = "lighter";
    //Set new alpha
    ctx .globalAlpha = this.alpha;
    //If angle not = zero...
    if (this.angle!=0) {
        //Save current coordinate state
        ctx.save();
        //Translate to position of video
        ctx.translate(this.x,this.y);
        //Rotate angle
        ctx.rotate(this.angle);
        //Translate back
        ctx.translate(-this.x,-this.y)
        //If scaling..
        if (this.scale!=1) {
            //Do the scaling
            ctx.scale(this.scale,this.scale); 
        }
        //Draw from the video
        ctx.drawImage(this.videoelement,this.sx,this.sy,this.w,this.h,this.x,this.y, this.w, this.h);
        //Restore previous coordinate state
        ctx .restore();
        //Close if angle
    }
    //Else
    else {
        //If scaling
        if (this.scale!=1) {
            //Save coordinate state
            ctx.save();
            //Do the scaling
            ctx.scale(this.scale,this.scale);
            //Draw from the video
            ctx.drawImage(this.videoelement,this.sx,this.sy,this.w,this.h,this.x,this.y, this.w, this.h);
            //Restore coordinate state
            ctx.restore();
            //Close if scaling
        }
        //Else
        else {
            //Draw from the video
            ctx .drawImage(this.videoelement,this.sx,this.sy,this.w,this.h,this.x,this.y, this.w, this.h);
            //Close else
        }
    //Close the else
    }
    //Restore the globalAlpha
    ctx.globalAlpha = savedalpha;
    //Set the savedgco
    ctx.globalCompositeOperation = savedgco;
} 

//Function header for Picture constructor, positioned at x,y, with width w and height h, and the imagename Image object
function Picture(x,y,w,h,imagename) {
	this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imagename = imagename;
    this.draw = drawpic;
    this.overcheck = overrect;
} 

//Function header for Heart constructor, located with the cleavage at x, y, distance from x, y to lower tip h, radius drx, and color
function Heart(x,y,h,drx,color) {
	this.x = x;
    this.y = y;
    this.h = h;
    this.drx = drx;
    this.radsq = drx*drx;
    this.color = color;
    this.draw = drawheart ;
    this.overcheck = overheart;
    this.ang = .25*Math.PI;
} 

//Function header for drawheart
function drawheart() {
    //Calculate and set variable to be x coordinate of center of left curve
	var leftctrx = this.x-this.drx;
    //Calculate and set variable to be x coordinate of center of right curve
    var rightctrx = this.x+this.drx;
    //Calculate and set variable to be x coordinate of point where curve on the right changes to straight line
    var cx = rightctrx+this.drx*Math.cos(this.ang);
    //Calculate and set variable to be y coordinate of point where curve on the right changes to straight line
    var cy = this.y + this.drx*Math.sin(this.ang);
    //Set fillStyle
    ctx.fillStyle = this.color ;
    //Begin path
    ctx.beginPath();
    //Move to cleft of heart
    ctx.moveTo(this.x,this.y);
    //Draw left curve
    ctx.arc(leftctrx,this.y,this.drx,0,Math.PI-this.ang,true);
    //Move to bottom point
    ctx.lineTo(this.x,this.y+this.h);
    //Move to point where straight line meets curve
    ctx.lineTo(cx,cy);
    //Draw right curve
    ctx.arc(rightctrx,this.y,this.drx,this.ang,Math.PI,true);
    //Close path
    ctx.closePath();
    //Fill in path
    ctx.fill();
} 

//header for overheart function
function overheart(mx,my) {
	//Set variable to be x coordinate of center of right curve
    var leftctrx = this.x-this.drx;
    var rightctrx = this.x+this.drx;
    //Calculate and set variable to be x coordinate of left of bounding rectangle
    var qx = this.x-2*this.drx;
    //Calculate and set variable to be y coordinate of top of bounding rectangle
    var qy = this.y-this.drx;
    //Calculate and set variable to be width of bounding rectangle
    var qwidth = 4*this.drx ;
    // Calculate and set variable to be height of bounding rectangle
    var qheight = this.drx+this.h;
    //Quick test if it is in bounding rectangle
    if (outside(qx,qy,qwidth,qheight,mx,my)) {
        return false;
    }
    //Check if inside left curve
    if (distsq(mx,my,leftctrx,this.y)<this.radsq) 
        return true;
    //or right curve
    if (distsq(mx,my,rightctrx,this.y)<this.radsq) 
        return true;
    //Return false if above y on screen (and not previously determined to be within curves)
    if (my<=this.y) 
        return false;
    // Start calculations to compare my to slopes. Set x2 and
    var x2 = this.x
    // set y2 to have x2, y2 point on each sloping line
    var y2 = this.y + this.h ;
    //calculate slope of left line
    var m = (this.h)/(2*this.drx);
    //If mx is on the left side...
    if (mx<=this.x) {
        //compare my to the y value corresponding to mx. If my is above (on the screen),
        if (my < (m*(mx-x2)+y2)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        //Change sign of slope to be slope of the right line
        m = -m;
        //Compare my to the value corresponding to mx on the right line and if less than (farther up on the screen) return true
        if (my < (m*(mx-x2)+y2)) {
            return true;
        }
        else 
            return false;
    }  
 } 

//Header for outside
function outside(x,y,w,h,mx,my) {
	//Return based on calculation with x,y and width and height
    return ((mx<x) || (mx > (x+w)) || (my < y) || (my > (y+h)));
} 

//Header drawpic
function drawpic() {
    //Set alpha
    ctx.globalAlpha = 1.0;
    //Draw the image
    ctx.drawImage(this.imagename,this.x,this.y,this.w,this.h);  
} 

//Function header for Oval constructor, position x, y, horizontal scaling hor, vertical scaling ver, color c
function Oval(x,y,r,hor,ver,c) {
	this.x = x;
    this.y = y;
    this.r = r;
    this.radsq = r*r;
    this.hor = hor;
    this.ver = ver;
    this.draw = drawoval;
    this.color = c;
    this.overcheck = overoval;
} 

//Function header for drawoval
function drawoval() {
    //Save current coordinate state
    ctx .save();
    //Move to center
    ctx.translate(this.x,this.y);
    //Scale as indicated by attributes
    ctx.scale(this.hor,this.ver);
    //Set color
    ctx.fillStyle = this.color;
    //Start path
    ctx.beginPath();
    //Draw arc (complete circle)
    ctx.arc(0,0,this.r,0,2*Math.PI,true);
    //Close path
    ctx.closePath();
    //Fill in
    ctx.fill();
    //Restore original coordinate state
    ctx.restore();
} 

//Function header Rect constructor: position x,y, width w and height h, color c
function Rect(x,y,w,h,c) {
	this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.draw = drawrect;
    this.color = c;
    this.overcheck = overrect;
} 

//Function header for overoval
function overoval(mx,my) {
    //Compute positions in the translated and scaled coordinate system
    //Set variable to be used in call to distsq; this represents x coordinate of point at center of oval
    var x1 = 0;
    //Set variable to be used in call to distsq; this represents y coordinate of point at center of oval
    var y1 = 0;
    //Calculate the x2 using input and scaling factor
    var x2 = (mx-this.x)/this.hor;
    //Calculate the y2 using input and scaling factor
    var y2 = (my-this.y)/this.ver;
    //If distance squares is less than stored radius squared....
    if (distsq(x1,y1,x2,y2)<=(this.radsq) ){
        return true;
    }
    else {
        return false;
    }
} 

//Header for overrect
function overrect (mx,my) {
	//Standard calculation for rectangles
    return ( (mx>=this.x)&&(mx<=(this.x+this.w))&&(my>=this.y)&&(my<=(this.y+this.h))) ;
} 

//Function header for makenewitem; has as a parameter and event ev set by JavaScript
function makenewitem(ev) {
	//Variable will hold x coordinate of mouse
    var mx;
    //Variable will hold y coordinate of mouse
    var my;
    //Does this browser use layer...
    if ( ev.layerX ||  ev.layerX == 0) { // Firefox, ???
        //... set mx
        mx= ev.layerX;
        //... set my
        my = ev.layerY;
        
    }
    //Does browser use offset... 
    else if (ev.offsetX || ev.offsetX == 0) { // Opera, ???
        //... set mx
        mx = ev.offsetX;
        //... set my
        my = ev.offsetY;
    }
    //Store index of last item in stuff array
    var endpt = stuff.length-1;
    //Will hold the new item
    var item ;
    for (var i=endpt;i>=0;i--) { //reverse order
        //Start search from the end
        //Is the mouse over this member of stuff
        if (stuff[i].overcheck(mx,my)) {
            //Clone (make copy of)
            item = clone(stuff[i]);
            //Move over slightly horizontally
            item.x +=20;
            //and vertically
            item.y += 20;
            //Add newly created item to stuff array
            stuff.push(item);
            break;
        }
    }
} 

//Function header for clone
function clone(obj) {
	//Create an Object
    var item = new Object();
    //Loop over all attributes of the obj passed as parameter
    for (var info in obj) {
        //Set an attribute by that name to the attribute value
        item[info] = obj[info];
    }    
    //Return the newly created object
    return item; 
} 

//Function header for startdragging; has as a parameter an event ev set by JavaScript
function startdragging(ev) {
	//Variable will hold x coordinate of mouse
    var mx;
    //Variable will hold y coordinate of mouse
    var my;
    //Does this browser use layer...
    if ( ev.layerX ||  ev.layerX == 0) { // Firefox, ???
        //... set mx
        mx= ev.layerX;
        //... set my
        my = ev.layerY ;
    } 
    //Does browser use offset...
    else if (ev.offsetX || ev.offsetX == 0) { // Opera, ???
        //... set mx
        mx = ev.offsetX;
        //... set my
        my = ev.offsetY;
        
    }
    //Store index of last item in stuff array
    var endpt = stuff.length-1;
    //Start search from the end
    for (var i=endpt;i>=0;i--) {  //reverse order
        //Is the mouse over this member of stuff
        if (stuff[i].overcheck(mx,my)) {
            //Calculate how far the mx was from the x of this object
            offsetx = mx-stuff[i].x;  
            //Calculate how far the my was from the y of this object
            offsety = my-stuff[i].y;
            //Will now move this item to the end of the array; set item
            var item = stuff[i];
            //Set global variable to be used in the dragging
            thingInMotion = stuff.length-1;
            //Remove this item from its original location
            stuff.splice(i,1);
            //Add item to the end
            stuff.push(item);
            //Change cursor to finger when dragging
            canvas1.style.cursor = "pointer";
            //Set up event handling for moving the mouse
            canvas1.addEventListener('mousemove',moveit,false);
            //Set up event handling for releasing mouse button
            canvas1.addEventListener('mouseup',dropit,false);
            //Leave the for loop
            break;
        }
    }
} 

//Function header for dropit; has as a parameter and event ev set by JavaScript
function dropit(ev) {
	//Remove (stop) event handling for moving the mouse
    canvas1.removeEventListener('mousemove',moveit,false);
    //Remove (stop) event handling for releasing the mouse button
    canvas1.removeEventListener('mouseup',dropit,false);
    //Change cursor back to crosshair
    canvas1 .style.cursor = "crosshair";
} 

//Function header for moveit; has as a parameter and event ev set by JavaScript
function moveit(ev) {
    //Variable will hold x coordinate of mouse
	var mx;
    //Variable will hold y coordinate of mouse
    var my;
    //Does this browser use layer...
    if ( ev.layerX ||  ev.layerX == 0) { // Firefox, ???
        //... set mx
        mx= ev.layerX;
        //... set my
        my = ev.layerY ;
    
    } 
    //Does browser use offset..
    else if (ev.offsetX || ev.offsetX == 0) { // Opera, ???
        //... set mx
        mx = ev.offsetX;
        //... set my
        my = ev.offsetY;
    }
    //Set x for the thingInMotion, adjust for flypaper dragging
    stuff[thingInMotion].x = mx-offsetx; //adjust for flypaper dragging
    //Set y for the thingInMotion, adjust for flypaper dragging
    stuff[thingInMotion].y = my-offsety ;
} 


// Function header drawrect
function drawrect() {
	ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
} 

//Function header for saveasimage
function saveasimage() {
    //Start try clause
    try {
        //Create the image data and use it as contents of new window
        window.open(canvas1.toDataURL("image/png"));
    }
    //If that didn’t work, that is, threw an error
    catch(err) {
        //Display alert message
        alert("You need to change browsers AND/OR upload the file to a server.");
    }
} 

//Function header for removeobj
function removeobj() {
    //Remove the last member of the stuff array
    stuff.pop();
    //Draw everything
    drawstuff();
} 