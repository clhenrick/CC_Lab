
 #include "pitches.h"

//Flex Sensor Pin (flexPin)
//the analog pin the Flex Sensor is connected to
int flexPin = A0;
int notes [] = { NOTE_C4, NOTE_D4, NOTE_E4, NOTE_G4, NOTE_A4 };
int noteDuration = 8;
                  
void setup() {
  Serial.begin(9600);
}

void loop(){
  
  // test to make sure sensor is getting an input.
  int flexSensorReading = analogRead(flexPin); 
  // Serial.println(flexSensorReading);

  // test input result range: 300 - 478
  // map range to 0 - 100
  int flexMap = map(flexSensorReading, 300, 478, 0, 100);
  Serial.println(flexMap);
  
  if (flexMap > 0 && flexMap <= 19) {
    tone(8, notes[4], noteDuration);
  }
  
  if (flexMap >= 20 & flexMap <= 39) {
    tone(8, notes[3], noteDuration);
  }
  
  if (flexMap >= 40 & flexMap <= 59) {
    tone(8, notes[2], noteDuration);
  }
  
  if (flexMap >= 60 & flexMap <= 79) {
    tone(8, notes[1], noteDuration);
  }

  if (flexMap >= 80 & flexMap <= 100) {
    tone(8, notes[0], noteDuration);
  }
  
  
}

