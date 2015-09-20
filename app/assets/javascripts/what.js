var farmCanvas, ctx;
var mouseIsDown = false;
var lastX = 0;
var lastY = 0;
var canvasOffset;
var offsetX;
var offsetY;
var hayPath = "/assets/images/hay.png";

$(document).foundation();
$(document).ready(function(){
	startFarm();
});

function startFarm(){
	var f = document.getElementById("farm");
	$("#farm").ready(function(){
		canvasStuff();
	});
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function canvasStuff(){
	farmCanvas = $("#farm");
	ctx = farmCanvas[0].getContext("2d");
	ctx.clearRect(0, 0, 875, 500);

	/* ANIMATION LOGIC */
	
	var newX = getRandomInt(0, 875);
	var newY = getRandomInt(322, 422);
	var loop = setInterval(function(){
		ctx.clearRect(0, 0, 875, 500);

		resetButton.update();
	    hay.update();
	    for(var l in llamas){
	    	if(!llamas[l].arrived){
    				llamas[l].move(newX, newY);
	    	} else {
				llamas[l].newX= getRandomInt(0, 875);
				llamas[l].newY = getRandomInt(322, 422);
				llamas[l].arrived = false;
			}
			llamas[l].update();
		}
	}, 30);

	/* END ANIMATION LOGIC */

	/* ALL HAY LOGIC */

	var hayPath = "/assets/images/hay.png";
	var hay = new DragImage(hayPath, 0, 477);

	var mouseX = 0,
	    mouseY = 0;
	var mousePressed = false;
	var dragging = false;

	farmCanvas.mousemove(function(e){
	    mouseX = e.offsetX;
	    mouseY = e.offsetY;
	})

	$(document).mousedown(function(){
		mousePressed = true;
	}).mouseup(function() {
		mousePressed = false;
		dragging = false;
	    add = true;
	});

	var add = true;
	function DragImage(src, x, y){
	    var that = this;
	    var startX = 0,
	        startY = 0;
	    var drag = false;
	    this.x = x;
	    this.y = y;
	    var img = new Image();
	    img.src = src;
	    this.update = function(){
	        if (mousePressed) {
                var left = that.x;
                var right = that.x + img.width;
                var top = that.y;
                var bottom = that.y + img.height;
                if (!drag) {
                    startX = mouseX - that.x;
                    startY = mouseY - that.y;
                }
                if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top) {
                    if (!dragging){
            			dragging = true;
                        drag = true;
                    }
                    
                }
	            
	        } else {   
	            drag = false;
	        }
	        if (drag) {
	            that.x = mouseX - startX;
	            that.y = mouseY - startY;
	            var hayX = 25;
	            var llamaX = 75;
	            var llamaY = 78;
	            for(var l in llamas){
		            if((that.x >= llamas[l].x && that.x <= llamas[l].x+llamaX) || ((that.x + hayX) >= llamas[l].x && (that.x + hayX) <= llamas[l].x+llamaX)){
		            	if(that.y >= llamas[l].y && that.y <= llamas[l].y+llamaY){
		            		if(add){
				            	var spawnX = getRandomInt(0, 875);
								var spawnY = getRandomInt(322, 422);
								var newLlama = new Llama(llamaPath, spawnX, spawnY);
								llamas.push(newLlama);
								that.x = 0;
								that.y = 477;
								add = false;
								drag = false;
							}
		            	}
		            }
		        }
	        }
	        ctx.drawImage(img, that.x, that.y);
	    }
	}

	/* END OF HAY LOGIC */

	/* ALL LLAMA LOGIC */

	var llamaPath = "/assets/images/miniLlama.png";
	var llama;
	var llamas = [];
	llama = new Llama(llamaPath, 200, 450);
	llamas.push(llama);

	function Llama(src, x, y){
		console.log("made a llama");
		var that = this;
		var startX = 0,
			startY = 0;
		
		this.x = x;
		this.y = y;
		this.newX = getRandomInt(0, 875);
		this.newY = getRandomInt(322, 422);
		this.arrived = false;
		var img = new Image();
		img.src = src;
		this.update = function(){
			ctx.drawImage(img, that.x, that.y);
		}
		this.move = function(){
			if(this.newX != this.x && this.newY != this.y){
				if(this.newX != this.x){
					if(this.newX > this.x){
						this.x += 1;
					} else {
						this.x -= 1;
					}
				}
				if(this.newY != this.y){
					if(this.newY > this.y){	
						this.y += 1;
					} else {
						this.y -= 1;
					}
				}
				ctx.drawImage(img, that.x, that.y);
			} else {
				this.arrived = true;
			}
		}
	}

	/* END OF LLAMA LOGIC */
	
	/* RESET BUTTON LOGIC */

	var resetPath = "/assets/images/reset.png";
	var resetButton = new ResetButton(resetPath, 775, 0);

	function ResetButton(src, x, y){
		var that = this;
		this.x = x;
		this.y = y;
		this.clicked = false;

		var img = new Image();
		img.src = src;
		this.update = function(){
			ctx.drawImage(img, this.x, this.y);

			if(mousePressed){
				var left = that.x;
	            var right = that.x + img.width;
	            var top = that.y;
	            var bottom = that.y + img.height;
	            if (mouseX < right && mouseX > left && mouseY < bottom && mouseY > top) {
	       			while(llamas.length > 1){
	       				llamas.pop();
	       			}
	                
	            }
			}
		}
	}

	/* END OF RESET BUTTON LOGIC */
}

