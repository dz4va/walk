//this is a simple drawing simulation as i can say
//i'm new at this for this time.
//I'm first year student and I learned all by myself so I hope every bad thing will turn to good and improve
var c = document.getElementById('canv'); //get the element
c.width = $(window).width(); //inner width and 
c.height = $(window).height(); //inner height to display it fullscreen inside our body
var ctx = c.getContext("2d"); //context
var note = []; //notes array
/*var w = 5; //width of the rectangle
var h = 5; //height of the rectangle*/
var r = 0; //radius of the circle
var x,y,intr = 1500,intrs = 100; //{x;y} coordinates
var color; // color of my squares
var intrvl; //intrvlthat's going to be cleared
var clicked = false;

function initAudio() { //initialize the audio when it all starts
	for (var i = 0; i < 17; i++) {
		var temp = i.toString() + '.ogg';
		note[i] = new Audio('Audio/' + temp);
		note[i].load();
	}
	console.log("Loaded!");
}

function playNote() { //play those notes for me or die xd
    var i = Math.floor(Math.random()*16);
	note[i].play();
	console.log("# of Track: " + i);	
}

function drwCirc(x,y,color,r) { //drawing the square
	ctx.lineTo(x,y);
	ctx.stroke();
	ctx.fillStyle = "#" + color;
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fill();
	ctx.lineWidth = 0.5;
	ctx.moveTo(x,y);
	ctx.strokeStyle = "#292929";
}

function colorGen() { //generate those colors for me ^_^
	color = "";
	var temp;
	for (var i = 1; i <= 6; i++){
		temp = Math.floor(Math.random()*7);
		if (i == 1 && temp == 0){
			temp = Math.floor(Math.random()*7);
		}
		color += temp.toString(); 
	}
	return color;
}

function clr(x,y,w,h) { //clearing the canvas
	ctx.clearRect(x,y,w,h);
}

function clrStart() { //this needs modifying ^ ^ to work on Mouse X and Mouse Y
	setInterval(function(){
		var x = Math.floor(Math.random()*c.width);
		var y =	Math.floor(Math.random()*c.height);
		console.log("Clearing at [" + x + "] [" + y + "] | speed = " + intrs);
		clr(x,y,3,3);
	}, intrs);
}

function writ() { //mousie gets mouse
	clr(0,0,c.width,c.height);
	var x,y;
	x = c.width/2;
	y = c.height/2;
	colorGen();
	ctx.fillStyle = '#' + color;
	ctx.font = '100px Garamond';
	ctx.fillText("Walk?",x-100,y);
	checkIf();
	console.log(x,y,">>");
}

c.addEventListener('click',function(){//triggers
	clicked = true;
});

function checkIf(){ //checksIf mouse event happened and begins the path
	if (clicked == true){
		clearInterval(intrvl);
		clr(0,0,c.width,c.height);
		strtDrawing();
		console.log("Drawing");
		clicked = false;
	}
	return 0;
}

function strt() { //start
	initAudio(); //initialize all audio to play
	intrvl = setInterval(writ,1000); //set the interval
}

function strtDrawing() { //start drawing squares and then auto remove them with clearRect() method
	setInterval(function () { //main drawing interval
		x = Math.floor(Math.random()*c.width);
		y =	Math.floor(Math.random()*c.height);
		r = Math.floor(Math.random()*12);
		if (intr > 50) {
			intr -= r;
		}
		if (intr > 200 && < 220) {
			clrStart();
		}
		console.log("Generating at [" + x + "] [" + y + "] | speed = " + intr + " | Color = " + "#" + color);
		drwCirc(x,y,colorGen(),r); //draw squares
		playNote(); //call note
	}, intr);
}

