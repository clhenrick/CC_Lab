
//Receive: button and pot
//Send: LED

// old stuff
var connect = require('connect'),
	fs = require('fs'),
	util = require('util'),
	io = require('socket.io').listen(9001), // WS port
	port = 9000, // HTTP port
	
	// new stuff
	// define a class
	// in require() use the name of project's arduino file = "serialport"
	SerialPort = require("serialport").SerialPort,
	
	// type ls /dev/tty.* in terminal - to find the serial ports that are available on your computer 
	sPort = "/dev/tty.usbmodem1411",
	// create an instance (object)
	arduino = new SerialPort(sPort, {
		baudrate: 9600 // The arduino Serial speed
	});

//old stuff again:
// create web server using connect 
connect.createServer(
	connect.static(__dirname + '/public') // two underscores
).listen(port);
util.log('the server is running on port: ' + port);


// init socket.io
io.set('log level', 1); // 1 - reduces the socket's logging in the Terminal 
//The amount of detail that the server should output to the logger.0 - error, 1 - warn, 2 - info, 3 - debug

io.sockets.on('connection', function(socket) {
	util.log('Ooooooh, someone just poked me :)');

	socket.on('led', function(data) {
		var ledOn = new Buffer(1), // Buffer is an array and Buffer(1) means 1 index array,--> contains 1 byte?
			ledOff = new Buffer(1);
		ledOn[0] = 0x01; // 1
		ledOff[0] = 0x00; // 0

		if(data === true) {
			// turn on
			arduino.write(ledOn);
			util.log('LED ON'); //writing to terminal
		} else {
			// turn off
			arduino.write(ledOff);
			util.log('LED OFF');
		}
	});

});

// function that converts int to hexadecimal
// we communicate to Arduino using hex (binary) 

// serial port
var getData, sendData; //potentionmeter
var getDataButton, sendDataButton; //button

arduino.on('open', function() {  //setting serial communication 
	console.log('opening port');
});

// receive data, the measurements 
arduino.on('data', function(data) { // data comes in Buffer <   >	
	//util.log(data);
	//this is for the pot
	getData += data;
	// basically says if there're 'E' and 'B' signals
	//‘B’ and ‘E’ are stop characters, these values are used in the Arduino sketch 
   //to identify where a value begins and ends.
	if (getData.indexOf('B') >= 0 && getData.indexOf('E') >= 0) {
		// save the data between 'B' and 'E'
		sendData = getData.substring(getData.indexOf('B') + 1, getData.indexOf('E'));
		getData = '';
		util.log("the received data is="+getData);
		util.log(sendData);
		// parse data to browser
		io.sockets.emit('pot', sendData); //emit is to send
		// socket.io
		// emit, on, broadcast.emit, io.sockets.emit
		} 
	
	//now with analog button
	util.log("The data coming out is="+data);
	getDataButton+=data;
		if (getDataButton.indexOf('J') >= 0 && getDataButton.indexOf('K') >= 0) {
				sendDataButton=getDataButton.substring(getDataButton.indexOf('J') + 1, getDataButton.indexOf('K'));
				getDataButton = '';
				//util.log(sendDataButton);
				util.log("dataButton="+sendDataButton);
				// parse data to browser
				io.sockets.emit('ardButton', sendDataButton); //emit is to send

		}//end of if button

});

