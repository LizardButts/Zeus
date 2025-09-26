let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d");


var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "rgba(30, 35, 37, 1)"

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
context.lineWidth = 5;
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

class Circle{
    constructor(xpos, ypos, speed, radius, color){
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.speed = speed;

        this.dx = Math.random()*this.speed*(-1)^(Math.floor(Math.random()*10));
        this.dy = Math.random()*this.speed*(-1)^(Math.floor(Math.random()*10));
    }

    draw(context){
        context.strokeStyle = this.color
        context.fillStyle = "#ffffff22" 
        context.lineWidth = 5;
        context.beginPath();
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI*2, false);
        context.stroke();
        context.fill();
        context.closePath();

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Ariel";
        context.fillStyle = "#ff8800";
        context.fillText("Oh my...",this.xpos,this.ypos);
    }
    update(){
        context.clearRect(0, 0, window_width, window_height)

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

let my_circle = new Circle(Math.random()*(window_width-50)+25, Math.random()*(window_height-50)+25, Math.random(), 25, "#ff0");
my_circle.draw(context);

class particle{
    constructor(x_pos, y_pos, x_vel, y_vel, x_accel, y_accel, size, color, text){
        this.x = x_pos;
        this.y = y_pos;
        this.vx = x_vel;
        this.vy = y_vel;
        this.ax = x_accel;
        this.ay = y_accel;
        this.size = size;
        this.color = color;
        this.text = text;
    }
    draw(context){
        context.strokeStyle = this.color;
        context.fillStyle = "rgba(0, 255, 0, 0.25)"
        context.lineWidth = 2;
        context.beginPath();
        context.arc(this.x,this.y,this.size/2,0,Math.PI*2,false);
        context.fill()
        context.stroke();
        context.closePath();
        //context.textAlign = "center";
        //context.textBaseline = "middle";
        context.font = "10px Ariel";
        context.fillStyle = "#fff";
        context.fillText(this.text,this.x-10,this.y-10);
        //context.strokeStyle = "#fff";
        //context.strokeText(this.text,this.x-10,this.y-10);
    }
    update(context){
        this.draw(context);
        this.x += this.vx;
        this.y += this.vy;
    }
}
let ball_counter = 1;

function makeballs(ball){
    ball.draw(context);
}

function init(){
    let myballs = [];
    for (var numbers = 0; numbers < 10; numbers++){
        let x_rand = Math.random()*window_width;
        let y_rand = Math.random()*window_height;
        let size_min = 2;
        let size_max = 5;
        let d_size = size_max-size_min;
        let size_rand = Math.random()*d_size+size_min;
        let myball = new particle(x_rand,y_rand,1,1,0,0,Math.random()*10,'#fff',ball_counter)
        myballs.push(myball);
        makeballs(myballs[numbers]);
        ball_counter++;
    }
}
function animate(){
    requestAnimationFrame(animate);
    for (var numbers = 0; numbers < 10; numbers++){
        myballs[numbers].update();
    }
    my_circle.update();
}

let updateCircle = function(){
    requestAnimationFrame(updateCircle);
    my_circle.update();
}

//init();
//animate();
updateCircle();