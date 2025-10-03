//  PARTICLE SIMULATOR 
//  Taylor Raines
//  20 Sept 2025



// Get window and canvas settings

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "rgba(30, 35, 37, 1)"

/* ------------- MOUSE SETTINGS ------------- */

// Get mouse position
let mouse = {
    xpos: null,
    ypos: null,
    radius: (canvas.height/80) * (canvas.width/80)
}
window.addEventListener('mousemove',
    function(event) {
        mouse.xpos = event.x;
        mouse.ypos = event.y;
    }
);

// Listen for mouse clicks and determine if left mouse button is active or not
let clickActive = 0;
canvas.addEventListener("mousedown", function(event){
    clickActive = 1;
});
canvas.addEventListener("mouseup", function(event){
    clickActive = 0;
});
/*
canvas.addEventListener("touchstart", function(event){
    clickActive = 1;
});
canvas.addEventListener("touchend", function(event){
    clickActive = 0;
});
*/
// Mouse wheel controls
canvas.addEventListener("wheel", function(event){
    if (event.deltaY < 0){
        console.log("scroll up");
    }
    if (event.deltaY > 0){
        console.log("scroll down");
    }
})

/* **** How to draw shapes ****
// Draw Rectangles
context.fillStyle = "#059"
context.fillRect(20, 20, 50, 50)

context.fillStyle = "#f00"
context.fillRect(200, 30, 50, 50)
context.strokeStyle = "#fff"
context.fillText("wut",200,30);

// Draw Circles
context.strokeStyle = "#f0f"
context.fillStyle = "#0ff"
context.lineWidth = 5
context.beginPath();
context.arc(100,100,30,0,Math.PI*2,false);
context.fill()
context.stroke();
context.closePath();
context.strokeStyle = "#3f5"
context.fillStyle = "rgba(0, 255, 0, 0.25)"
context.lineWidth = 5;
context.beginPath();
context.arc(0,0,70,0,Math.PI*2,false);
context.fill()
context.stroke();
context.closePath();
*/

class Circle{
    constructor(xpos, ypos, speed, radius, color){
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.speed = speed;

        this.dx = (Math.random()*2-1)*this.speed*5;
        this.dy = (Math.random()*2-1)*this.speed*5;
    }

    draw(context){
        context.strokeStyle = this.color
        context.fillStyle = "#ffffff22" 
        context.lineWidth = 2;
        context.beginPath();
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI*2, false);
        context.stroke();
        context.fill();
        context.closePath();
        /*
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "15px Ariel";
        context.fillStyle = "#ff8800";
        context.fillText("Oh my...",this.xpos,this.ypos);
        */
        context.font = "14px Ariel";
        if (this.dx>0){
            context.fillStyle = "#00ffff";
        }
        else{
            context.fillStyle = "#ff00ff";
        }
        context.fillText("x: " + Math.round(this.dx*100)/100,this.xpos+30,this.ypos+30);
        if (this.dy>0){
            context.fillStyle = "#00ffff";
        }
        else{
            context.fillStyle = "#ff00ff";
        }
        context.fillText("y: " + Math.round(this.dy*100)/100,this.xpos+30,this.ypos+45);
    }
    update(){

        this.draw(context);
        
        if ( (this.xpos + this.radius) > window_width){
            this.dx = -this.dx;
        }
        if ( (this.xpos - this.radius) < 0){
            this.dx = -this.dx;
        }
        if ( (this.ypos + this.radius) > window_height){
            this.dy = -this.dy;
        }
        if ( (this.ypos - this.radius) < 0){
            this.dy = -this.dy;
        }

        this.xpos += this.dx;
        this.ypos += this.dy;
    }
}

let my_circle1 = new Circle(Math.random()*(window_width-50)+25, Math.random()*(window_height-50)+25, Math.random(), 25, "#ff0");
my_circle1.draw(context);
let my_circle2 = new Circle(Math.random()*(window_width-50)+25, Math.random()*(window_height-50)+25, Math.random(), 25, "#f00");
my_circle2.draw(context);

let ball_counter = 1;

/* --------------- FUNCTIONS --------------- */

// Populate canvas with particles
let n_balls = Math.round(window_height*window_width/20000);     // Total number of particles
let myballs = [];       // Initialize Array of particles

// Populate array of particles
function init(){
    for (var i = 0; i < n_balls; i++){
        let x_rand = Math.random()*(window_width-50)+25;
        let y_rand = Math.random()*(window_height-50)+25;
        let my_circle = new Circle(x_rand,y_rand, Math.random(), Math.random()*(8-3)+3, "#0ff");
        myballs.push(my_circle);
        
        ball_counter++;
    }
    console.log(ball_counter)
}

// Get distance between two points with the xpos & ypos attributes
function getDist(my_circle1,my_circle2){
    let x1 = my_circle1.xpos;
    let y1 = my_circle1.ypos;
    let x2 = my_circle2.xpos;
    let y2 = my_circle2.ypos;
    var result = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
    return result;
}

// Get angle between two points with the xpos & ypos attributes
function getAngle(point1,point2){
    let dx = point2.xpos - point1.xpos;
    let dy = point2.ypos - point1.ypos;
    let angle = Math.atan2(dy, dx);
    return angle;
}

// Draw a line between two points with the xpos & ypos attributes
function distLine(my_circle1,my_circle2,color){
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(my_circle1.xpos,my_circle1.ypos);
    context.lineTo(my_circle2.xpos,my_circle2.ypos);
    context.stroke();
}



// Animate motion of objects in canvas
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0, 0, window_width, window_height)
    my_circle1.update();
    my_circle2.update();
    myballs.forEach(element => {
        element.update();
    })

    // Particle Line connectors
    // Connector length limits
    let d1 = 100;
    let d2 = 200;
    for (var i = 0; i < n_balls; i++){
        let ball1 = myballs[i];
        for (var j = 0; j < n_balls; j++){
            let ball2 = myballs[j];
            if (i!=j & getDist(ball1,ball2)<d2){
                distLine(ball1,ball2,"rgba(0,255," + 255*(d2-getDist(ball1,ball2))/d1 + "," + (d2-getDist(ball1,ball2))/d1 + ")");
            }
        }
        if (clickActive == 1){
            distLine(ball1,mouse,"rgba(255, 0, 0," + (window_width-getDist(ball1,mouse))/d1 + ")");
            let ax = (5/getDist(ball1,mouse)) * Math.cos(getAngle(ball1,mouse));
            let ay = (5/getDist(ball1,mouse)) * Math.sin(getAngle(ball1,mouse));
            ball1.dx -= ax;
            ball1.dy -= ay;
        }
    }
    
    // Draw a line between two hard-coded circles
    if (getDist(my_circle1,my_circle2)<my_circle1.radius*10){
        my_circle1.color = "#00ff00";
        distLine(my_circle1,my_circle2,"#00ff00")
    }else{
        my_circle1.color = "#ffff00";
    }

    
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.font = "15px Ariel";
    context.fillStyle = "#00ff15ff";
    context.fillText("Particles: " + ball_counter, window_width-20,10);
    context.fillText("Window Size: " + window_width + " x " + window_height, window_width-20,30);
}

/* *** RUN TOP-LEVEL FUNCTIONS *** */
init();
animate();
