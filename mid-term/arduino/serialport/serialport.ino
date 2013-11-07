//EX. with button and Pot input

const int ledPin = 13;

int potPin = 0;
int sensorVal = 0;
int prevVal = 0;
String inputString = "";

//button variables
int buttonPin=2;
int buttonState=0; //var for reading the button statis, this changes
int prevButton=0;


void setup()
{
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}
 
void loop()
{
  
    // arduino reads Serial//LED
  if (Serial.available() > 0) {
    int incomingByte = Serial.read();
    if (incomingByte == 1) { // 0x01 = char 1
      digitalWrite(ledPin, 1); // ON
    } else if (incomingByte == 0) { // 0x00 = char 0
      digitalWrite(ledPin, 0); //OFF
    }
  }
  
  //pot
  sensorVal = analogRead(potPin);
  if(prevVal != sensorVal) {
   //‘B’ and ‘E’ are stop characters, these values are used in the Arduino sketch 
   //to identify where a value begins and ends.
  Serial.print('B');
  Serial.print(sensorVal);
  Serial.println('E'); // stop letters
  prevVal = sensorVal;  
  }  
  //button into browser
  //The Serial Monitor should stay CLOSED, it interefer with the communication with 
  buttonState=digitalRead(buttonPin);
  Serial.print('J');
  Serial.print(buttonState);
  Serial.println('K');
  

    delay(100);
}
