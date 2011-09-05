var canvas_elem1 = "#canv1";
var canv1;
var cntx;
var width1;
var height1;

var gameRunning; // TODO: reset jquery button
var gameloopId; 
var updateInterval;

var tileWidth;
var tileHeght;

// TODO: OOP

/* ******************************
		OBJECTS & RESOURCES
/* ****************************** */

var boat;  // TODO: spritesheet animations http://codeutopia.net/blog/2009/08/21/using-canvas-to-do-bitmap-sprite-animation-in-javascript/
var boatL;
var boatR;
var boatPos = []; // [0]->X [1]->Y

var boatVect = {};
boatVect.X = 0.0;
boatVect.Y = -0.2;



var swimmer; // TODO: spritesheet animations 
var swimmer1;
var swimmer2;
var swimmerPos = []; // [0]->X [1]->Y

var killed; // bool which determines side effects of death (texture, sounds...)

var water;
var blood;
var light;

// Sounds
var engSnd; // TODO: mute sounds option
var screamSnd;

// Input
var keys = new Array();
window.addEventListener('keydown',keyDown,true);
window.addEventListener('keyup',keyUp,true);
function keyDown(evt)
{
 keys[evt.keyCode] = true;
}
function keyUp(evt)
{
 keys[evt.keyCode] = false;
}


// GAME ENGINE

function startCanvas1()
{
	initCanvas1();
	initGameOptions();
	initObjectPositions();
	loadResources(); // TODO: preload?
	toggleGameplay();
	
	//engSnd.loop = true;
	//engSnd.play();
}

function initCanvas1()
{
	// prvi
	canv1 = $(canvas_elem1).get(0);
	cntx = canv1.getContext("2d");
	
	width1 =  $(canvas_elem1).width();
	height1 = $(canvas_elem1).height();
	tileWidth = 64;
	tileHeight = 64;
}

function initGameOptions()
{
	gameRunning = true;
	updateInterval =  25;
	killed = false;
}

function initObjectPositions()
{
	boatPos[0] = width1/2 - 32;
	boatPos[1] = height1;
	
	swimmerPos[0] = width1/2 - 8;
	swimmerPos[1] = height1/2 - tileHeight;
}

function toggleGameplay()
{	
    if(gameRunning)
    {
        clearInterval(gameloopId);
        gameloopId = setInterval(gameLoop, updateInterval);
    }
    else
    {
        clearInterval(gameloopId);
    }
}

function updateLogic()
{	
	// Pomakni brod s posebnom paznjom na to da li je izvan ekrana
	boatPos[0] += boatVect.X;
	boatPos[1] = (boatPos[1] > -tileHeight/2-150) ? boatPos[1]+boatVect.Y : height1+100;	
	
	if( !killed )
	{
		if( boatPos[1] < swimmerPos[1]+15 && boatPos[1] > swimmerPos[1] )
		{
			//screamSnd.play();
			killed = true;
		}			
	}
	
	if ((37 in keys && keys[37]) || (65 in keys && keys[65])){ //left
		boatVect.X -= 0.2;
	}
	if ((39 in keys && keys[39]) || (68 in keys && keys[68])){ //right
		boatVect.X += 0.2;
	}
	if (38 in keys && keys[38]){ //left
		boatVect.Y -= 0.2;
	}
	if (40 in keys && keys[40]){ //right
		boatVect.Y += 0.2;
	}
}

function gameLoop()
{	
	cntx.clearRect(0, 0, width1, height1);
	drawContext();
	updateLogic();
}

// RESOURCES

function loadResources()
{
	loadImages();
	loadSounds();
}

function loadImages()
{
	boatL = new Image();
	boatL.src = "./images/boat_wl.png";
	boatR = new Image();
	boatR.src = "./images/boat_wr.png";	
	boat = boatL;
	
	swimmer1 = new Image();
	swimmer1.src = "./images/swimmer1.png";	
	swimmer2 = new Image();
	swimmer2.src = "./images/swimmer2.png";	
	swimmer = swimmer1;
		
	water = new Image();
	water.src = "./images/water.png";
	
	blood = new Image();
	blood.src = "./images/blood.png";
	
	light = new Image();
	light.src = "./images/light.png";
}

function loadSounds()
{
	engSnd = new Audio("./sounds/engine2.ogg");
	screamSnd = new Audio("./sounds/wilhelm.mp3");
}

// DRAWING

function drawContext()
{
	// da li ova funkcija mora imati precizno poredane objekte da bi ih pravilno iscrtala?
	// zasto sve shto se iscrtava ne strpati u container i sortirati po z-orderu?
	
	drawWater();
	drawSwimmer();
	drawBoat();
	drawText();	
	//drawGrid();
}

function drawGrid()
{
	// vertical lines
	for( var x=0.5; x<=width1; x+=tileWidth )
	{
		cntx.moveTo(x,0)
		cntx.lineTo(x,height1);
	}
	
	// horizontal lines
	for( var y=0.5; y<=height1; y+=tileHeight )
	{
		cntx.moveTo(0, y)
		cntx.lineTo(width1, y);
	}
		
	cntx.strokeStyle = "#BDB";
	cntx.stroke();
}

function drawWater()
{
	for(var j=0; j<=height1; j+=tileHeight)
	{
		for(var i=0; i<=width1; i+=tileWidth ){
			cntx.drawImage(water, i, j); 
		}
	}
}

function drawBoat()
{
	// select animation frame and draw
	if(boat == boatL)
		boat = boatR;
	else
		boat = boatL;

	// light: 480x400, boat: 64x64
	var lightx = (boatPos[0]+tileWidth/2) - (480/2);
	var lighty = (boatPos[1]+tileHeight/2) - (400/2);
	cntx.drawImage(light, lightx, lighty);
	
	cntx.drawImage(boat, boatPos[0], boatPos[1]);
}

function drawSwimmer()
{	
	// Draw blood or animate the swimmer
	if( killed )
		cntx.drawImage(blood, swimmerPos[0], swimmerPos[1]);
	else
	{
		var update = false;
		nxtUpdt = new Date().getTime();
		if(nxtUpdt % 20 == 0)
			swimmer = (swimmer == swimmer1)?swimmer2:swimmer1; // select animation frame
		cntx.drawImage(swimmer, swimmerPos[0], swimmerPos[1]);
	}
}

function drawText()
{	
	
	if( killed )
	{
		cntx.font = "bold 10px sans-serif";
		cntx.textBaseline = "top";
		cntx.fillText( "killed", 5, 10 );;
	}
}

