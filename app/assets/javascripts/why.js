var canvas, ctx2;
$(document).foundation();
$(document).ready(function(){
	startLlama();
});

function startLlama(){
	var bub = document.getElementById("myCanvas");
	if(bub){
		makeBubbles();
	}
}

function makeBubbles(){
	canvas = $("#myCanvas");
	ctx2 = canvas[0].getContext("2d");
	setTimeout(updateCanvasDimensions, 30);

	var red = [0, 100, 63];
	var orange = [40, 100, 60];
	var green = [75, 100, 40];
	var blue = [196, 77, 55];
	var purple = [280, 50, 60];

	var word = "LLAMAS";

	var letterColors=[red, orange, green, blue, purple];

	drawName(word, letterColors);

	bounceBubbles();
}