var canvas_elem1 = "#canv1";
var canv1;
var cntx;
var width1;
var height1;

var simRunning; // TODO: reset jquery button
var simloopId; 
var updateInterval;

var tileWidth;
var tileHeight;

var fieldElems = [];
var numFieldRows = 8;
var numFieldColumns = 8;


// Input
var keys = [];
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


// SIM ENGINE

function startProtoled()
{
	initProtoled();
	initSimOptions();
	initObjects();
	loadResources(); // TODO: preload?
	toggleSimulation(true);
}

function initProtoled()
{
	// prvi
	canv1 = $(canvas_elem1).get(0);
	cntx = canv1.getContext("2d");
	
	width1 =  $(canvas_elem1).width();
	height1 = $(canvas_elem1).height();
	tileWidth = width1/numFieldColumns;
	tileHeight = height1/numFieldRows;
}

function initSimOptions()
{
	updateInterval =  25;
}

function initObjects()
{
	for( var y=0; y<numFieldRows; y++)
	{
		for( var x=0; x<numFieldColumns; x++)
		{
			var colorF = '#200'; // default random color;
			var fieldElem = {
				X: x*tileWidth,
				Y: y*tileHeight,
				color: colorF
			};
			fieldElems.push(fieldElem);
		}
	}
}

function toggleSimulation(status)
{
	simRunning = status;
	checkForPause();
}

function checkForPause()
{	
    if(simRunning)
    {
        clearInterval(simloopId);
        simloopId = setInterval(simLoop, updateInterval);
    }
    else
    {
        clearInterval(simloopId);
    }
}

function setRandomField()
{
	var colorR = Math.floor(Math.random()*255).toString(16);
	var colorG = Math.floor(Math.random()*255).toString(16);
	var colorB = Math.floor(Math.random()*255).toString(16);
	
	var colorF = '#'+ colorR + colorG + colorB;
	var indx = Math.floor(Math.random()*fieldElems.length)
	fieldElems[indx].color = colorF;
}

function updateLogic()
{	
	setRandomField();	
	
	// X
	if ((37 in keys && keys[37]) || (65 in keys && keys[65])){ //left
		;
	}
	if ((39 in keys && keys[39]) || (68 in keys && keys[68])){ //right
		;
	}
	
	//Y
	if (38 in keys && keys[38]){ //left
		;
	}
	if (40 in keys && keys[40]){ //right
		;
	}
}

function simLoop()
{	
	cntx.clearRect(0, 0, width1, height1);
	drawContext();
	updateLogic();
	checkForPause();
}

// RESOURCES

function loadResources()
{
	loadImages();
	loadSounds();
}

function loadImages()
{
	//pic = new Image();
	//pic.src = "./images/pic.png";
}

function loadSounds()
{
	//screamSnd = new Audio("./sounds/wilhelm.mp3");
}

// DRAWING

function drawContext()
{
	// da li ova funkcija mora imati precizno poredane objekte da bi ih pravilno iscrtala?
	// zasto sve shto se iscrtava ne strpati u container i sortirati po z-orderu?
	
	drawGrid();
	drawField();
	drawText();	
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

function drawField()
{
	for( var cnt=0; cnt<fieldElems.length; cnt++)
	{
		cntx.fillStyle   = fieldElems[cnt].color; // blue
		var fieldPadding = 1;
		cntx.fillRect(fieldElems[cnt].X+fieldPadding, fieldElems[cnt].Y+fieldPadding, tileWidth-fieldPadding*2, tileHeight-fieldPadding*2);
	}
}

function drawText()
{	
	cntx.font = "bold 10px sans-serif";
	cntx.textBaseline = "top";
	//cntx.fillStyle   = "#FFF"; // PROBLEM U ISCRTAVANJU
	//cntx.fillText( "ProtoLED", 5, 10 );
	
}

function writeToConsole(message)
{
	var err = new Error();
	err.name = 'ProtoLED debug message';
	err.message = message;
	throw(err);
}
