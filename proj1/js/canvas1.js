var canvas_elem1 = "#canv1";
var canv1;
var cont1;
var width1;
var height1;

var lineDist1;
var arrowSize1;

function startCanvas1()
{
	// TODO if init ok then draw...
	initCanvas1();
	drawCont1();
}

function initCanvas1()
{
	// prvi
	canv1 = $(canvas_elem1).get(0);
	cont1 = canv1.getContext("2d");
	
	width1 =  $(canvas_elem1).width();
	height1 = $(canvas_elem1).height();
	
	lineDist1 = 40;
	arrowSize1 = 5
}

function drawCont1()
{
	drawGrid();
	drawAxes();
	drawData();
	drawText();
}

function drawGrid()
{
	// vertical lines
	for( var x=0.5; x<=width1; x+=10 )
	{
		cont1.moveTo(x,0)
		cont1.lineTo(x,height1);
	}
	
	// horizontal lines
	for( var y=0.5; y<=height1; y+=10 )
	{
		cont1.moveTo(0, y)
		cont1.lineTo(width1, y);
	}
		
	cont1.strokeStyle = "#BDB";
	cont1.stroke();
}

function drawAxes()
{
	cont1.beginPath();
	
	// horizontal arrow
	cont1.moveTo(0, lineDist1);
	cont1.lineTo(240, lineDist1);
	
	cont1.moveTo(260, lineDist1);
	cont1.lineTo(width1, lineDist1);
	
	cont1.moveTo(width1-arrowSize1, lineDist1-arrowSize1);
	cont1.lineTo(width1, lineDist1);
	cont1.moveTo(width1-arrowSize1, lineDist1+arrowSize1);
	cont1.lineTo(width1, lineDist1);
	
	
	// vertical arrow
	lineDist1 += 10;
	cont1.moveTo(lineDist1, 0);
	cont1.lineTo(lineDist1, 160);
	
	cont1.moveTo(lineDist1, 180);
	cont1.lineTo(lineDist1, height1);
	
	cont1.moveTo(lineDist1-arrowSize1, height1-arrowSize1);
	cont1.lineTo(lineDist1, height1);
	cont1.moveTo(lineDist1+arrowSize1, height1-arrowSize1);
	cont1.lineTo(lineDist1, height1);
	lineDist1 -= 10;
	
	cont1.strokeStyle = "#050";
	cont1.stroke();
}

function drawData()
{
	var dot1 = [(lineDist1+10)*2, lineDist1*2];
	var dot2 = [width1/2, height1/2+height1/4];
	var dot3 = [width1-width1/10, height1-height1/10];
	
	cont1.beginPath();
	
	cont1.moveTo(dot1[0], dot1[1]);
	cont1.lineTo(dot2[0], dot2[1]);
	
	cont1.moveTo(dot2[0], dot2[1]);
	cont1.lineTo(dot3[0], dot3[1]);
	
	cont1.strokeStyle = "#F00";
	cont1.stroke();
}

function drawText()
{
	cont1.font = "bold 10px sans-serif";
	
	cont1.fillText("x", 248, lineDist1+3);
	cont1.fillText("y", lineDist1+8, 173);
	
	cont1.textBaseline = "top";
	var txtCoordTop= "(" + 0 + ", " + 0 + ")";
	cont1.fillText( txtCoordTop, 8, 8 );
	
	cont1.textAlign = "right";
	cont1.textBaseline = "bottom";
	var txtCoordBottom = "(" + width1 + ", " + height1 + ")";
	cont1.fillText( txtCoordBottom, width1-width1/50, height1-height1/50);
}
