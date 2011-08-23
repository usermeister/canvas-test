var canvas_elem2 = "#canv2";
var canv2;
var cont2;
var width2;
var height2;
var colorBegin;
var colorEnd;

function startCanvas2()
{
	// TODO if init ok then draw...
	initCanvas2();	
	drawCont2();
}

function initCanvas2()
{
	canv2 = $(canvas_elem2).get(0);
	cont2 = canv2.getContext("2d");
	
	width2 =  $(canvas_elem2).width();
	height2 = $(canvas_elem2).height();
	
	colorBegin = "#DFD";
	colorEnd = "#CFC";
}

function drawCont2()
{
	drawGradient();
}

function drawGradient()
{
	var gradient = cont2.createLinearGradient(0,0,width2,0)
	gradient.addColorStop(0, colorBegin);
	gradient.addColorStop(1, colorEnd);
	cont2.fillStyle = gradient;
	cont2.fillRect(0, 0, width2, height2);
	
	//cont2.font = "bold 32px sans-serif";
	//cont2.fillText("O", 5, 5);
}
