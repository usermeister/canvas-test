var canvas_elem1 = "#canv1";
var canv1;
var cntx;
var width1;
var height1;

var gameRunning;
var gameloopId;
var updateInterval;

var tileWidth;
var tileHeght;

var boat;
var boatL;
var boatR;
var boatPos = [];

var swimmer;
var swimmer1;
var swimmer2;
var swimmerPos = [];

var killed;

var water;
var blood;

var engSnd;
var screamSnd;

function startCanvas1()
{
	initCanvas1();
	loadImages();
	toggleGameplay();
	
	engSnd.loop = true;
	engSnd.play();
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
	
	gameRunning = true;
	updateInterval =  25;
	
	boatPos[0] = width1/2 - 32;
	boatPos[1] = height1;
	
	swimmerPos[0] = width1/2 - 8;
	swimmerPos[1] = height1/2 - tileHeight;
	
	killed = false;
	
	engSnd = new Audio("./sounds/engine2.ogg");
	screamSnd = new Audio("./sounds/wilhelm.mp3");
}

function gameLoop()
{
	
	cntx.clearRect(0, 0, width1, height1);
	drawContext();
	updateLogic();
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
}

function drawContext()
{
	//drawGrid();
	drawWater();
	drawSwimmer();
	drawBoat();
	//drawText();
}
function updateLogic()
{	
	// Boat izvan ekrana
	boatPos[1] = (boatPos[1] > -tileHeight) ? boatPos[1]-1: height1;	
	
	if( !killed )
	{
		if( boatPos[1] < swimmerPos[1]+15 && boatPos[1] > swimmerPos[1] )
		{
			screamSnd.play();
			killed = true;
		}			
	}
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
	if(boat == boatL)
		boat = boatR;
	else
		boat = boatL;
		
	cntx.drawImage(boat, boatPos[0], boatPos[1]);
}

function drawSwimmer()
{		
	if( killed )
		cntx.drawImage(blood, swimmerPos[0], swimmerPos[1]);
	else
	{
		var update = false;
		nxtUpdt = new Date().getTime();
		if(nxtUpdt % 20 == 0)
			swimmer = (swimmer == swimmer1)?swimmer2:swimmer1;
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

