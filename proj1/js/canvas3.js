var canvas_elem3 = "#canv3";
var canv3;
var cont3;
var width3;
var height3;
var cat;

function startCanvas3()
{
	// TODO if init ok then draw...
	initCanvas3();	
	drawCont3();
}

function initCanvas3()
{
	canv3 = $(canvas_elem3).get(0);
	cont3 = canv3.getContext("2d");
	
	width3 =  $(canvas_elem3).width();
	height3 = $(canvas_elem3).height();
	cat = new Image();
	cat.src = "./images/cat.png";
}

function drawCont3()
{
	cat.onload = function() { cont3.drawImage(cat, 0, 0); };
}

function drawText3()
{
	cont3.font = "bold 33px sans-serif";
	cont3.fillText("O", width3/2, height3/2);
}
