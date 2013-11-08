// canvas js code

// good practice to wrap everything inside an onload funciton
window.onload = function() {

	// connect clent to the server
	var socket = io.connect(window.location.hostname);

	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d'); // standard is to shorten context to ctx

	//set canvas window size
	context.canvas.width = window.innerWidth;
	context.canvas.height = window.innerHeight;

	var canvas2 = document.getElementById('clearVP');
	var context2 = canvas2.getContext('2d'); // standard is to shorten context to ctx

	//set canvas window size
	context2.canvas.width = window.innerWidth;
	context2.canvas.height = window.innerHeight;	

	// test rectangle to make sure it's a werkin
	// context.fillRect(25,25,100,100);

	// context2.fillRect(175,175,25,50);

	function makeCircles(){
		var xPos = Math.floor(Math.random() * (canvas.width)),
			yPos = Math.floor(Math.random() * (canvas.height)),
			radius = Math.floor(Math.random()*100),
			h = Math.floor(Math.random()*360);

        context.fillStyle = 'hsla(' + h + ', 50%, 50%, 0.3)';  
		//draw a circle
		context.beginPath();
		context.arc(xPos, yPos, radius, 0, 2 * Math.PI, false);
		context.fill();
		context.lineWidth = 0;
		context.strokeStyle = 'rgba(255,255,255,0)';
		context.stroke();
	}

	function shiftHue(data){
		var hue = data;
		// context.fillStyle = 'hsl(' + hue + ',50%,60%)'
		// context.fillRect(0, 0, canvas.width, canvas.height);	
		$('#myCanvas').css({
		'background': 'hsl(' + hue + ',50%,50%)'
		})	
	}

	function clearCanvas(){
			context.fillStyle = 'rgb(255, 255, 255)';
			context.fillRect(0, 0, canvas.width, canvas.height);

	}

	function makeRect(){
		var w = Math.floor(Math.random() * (canvas.width)),
			h = Math.floor(Math.random() * (canvas.height)),
			xPos = Math.floor(Math.random() * (canvas.width)),
			yPos = Math.floor(Math.random() * (canvas.height)),
			h = Math.floor(Math.random()*360);

		context.fillStyle = 'hsla(' + h + ', 50%, 50%, 0.3)';
		context.fillRect(xPos, yPos, w, h);
	}

	socket.on('myCanvas', function(data){
		console.log("Pot value: " + data);
		//drawCircle(0.7, data);
		shiftHue(data);
	})

	// socket.on('clearVP', function(data){
	// 	console.log("cleared!");
	// 	clearCanvas(data);
	// })

	//analog button
	socket.on('myCanvas', function(data) {	
		if(data==1){ 						
			// $('#myCanvas').css({
			// 	'background': 'rgb(255, 255, 255)'
			// })

			// context.fillStyle = 'hsl(120,50%,60%)'
			// context.fillRect(0, 0, canvas.width, canvas.height);
			makeRect();
			console.log("button is pressed!");
		} else {
			// $('#myCanvas').css({
			// 	'background': 'rgb(0,0,0)'
			// })
			makeCircles();
			// context.fillStyle = 'hsl(180,50%,60%)'
			// context.fillRect(0, 0, canvas.width, canvas.height);

		}
	});

};