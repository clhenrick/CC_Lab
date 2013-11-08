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

	// var canvas2 = document.getElementById('clearVP');
	// var context2 = canvas2.getContext('2d'); // standard is to shorten context to ctx

	// //set canvas window size
	// context2.canvas.width = window.innerWidth;
	// context2.canvas.height = window.innerHeight;

	context.globalCompositeOperation = "xor";	

	// test rectangle to make sure it's a werkin
	// context.fillRect(25,25,100,100);

	//test background color
	// $('#myCanvas').css({
	// 	'background':'hsl(0,50%,50%)'
	// });	

	// context2.fillRect(175,175,25,50);

	function makeCircles(fps){
		setInterval(function(){
			var xPos = Math.floor(Math.random() * (canvas.width)),
				yPos = Math.floor(Math.random() * (canvas.height)),
				radius = Math.floor(Math.random()*(canvas.height/3)),
				h = Math.floor(Math.random()*360);

	        context.fillStyle = 'hsla(' + h + ', 50%, 50%, 1)';  
			//draw a circle
			context.beginPath();
			context.arc(xPos, yPos, radius, 0, 2 * Math.PI, false);
			context.fill();
			context.lineWidth = 0;
			context.strokeStyle = 'rgba(255,255,255,0)';
			context.stroke();

		}, 1000/fps);
	}

	function shiftHue(data, fps){
		setInterval(function(){
			var hue = data;
			context.fillStyle = 'hsl(' + hue + ', 50%, 50%)'
			context.fillRect(0, 0, canvas.width, canvas.height);
			
	}, 1000);
	
	}

	function clearCanvas(data, fps){
		setInterval(function(){

			//context.fillStyle = 'rgb(255, 255, 255)';
			//context.fillRect(0, 0, canvas.width, canvas.height);

			h = data;
			//h = convertToRange(data, [0,1050], [0,360]);

			$('#myCanvas').css({
				'background':'hsl('+ h +',50%,50%)'
			});
		},1000/fps)
	}

	function makeRect(fps){
		setInterval(function(){
			var w = Math.floor(Math.random() * (canvas.width/2)),
				h = Math.floor(Math.random() * (canvas.height/2)),
				xPos = Math.floor(Math.random() * (canvas.width)),
				yPos = Math.floor(Math.random() * (canvas.height)),
				h = Math.floor(Math.random()*360);

			context.fillStyle = 'hsla(' + h + ', 50%, 50%, 1)';
			context.fillRect(xPos, yPos, w, h);

		}, 1000/fps);
	}

	function convertToRange(value, srcRange, dstRange){
	  // value is outside source range return
	  if (value < srcRange[0] || value > srcRange[1]){
	    return NaN; 
	  }

	  var srcMax = srcRange[1] - srcRange[0],
	      dstMax = dstRange[1] - dstRange[0],
	      adjValue = value - srcRange[0];

	  return Math.floor((adjValue * dstMax / srcMax) + dstRange[0]);

	}

	socket.on('myCanvas', function(data){
		//console.log("Pot value: " + data);
		newdata = convertToRange(data, [0,1050], [0,360]);
		//clearCanvas(newdata);
		shiftHue(newdata, .02);

		// $('#myCanvas').css({
		// 	'background':'hsl('+ newdata +',50%,50%)'
		// });

		console.log(convertToRange(data, [0,1050], [0,360]));

		//	context.save();
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
			makeRect(.1);
			console.log("button is pressed!");
		} else {
			// $('#myCanvas').css({
			// 	'background': 'rgb(0,0,0)'
			// })
			makeCircles(.05);
			// context.fillStyle = 'hsl(180,50%,60%)'
			// context.fillRect(0, 0, canvas.width, canvas.height);

		}
	});

	//setTimeout(clearCanvas, 5000);

};