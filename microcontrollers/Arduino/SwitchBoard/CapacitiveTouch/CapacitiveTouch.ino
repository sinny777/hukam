
/*
 * Connect SDA of TTP229 to A4
 * Connect SCL of TTP229 to A5
 */

#include <SoftwareSerial.h>
#include <Wire.h>
#define ttp229 (0xAF>>1) //If you have a datasheet or sample code that uses 8 bit address, 
                         //you'll want to drop the low bit (i.e. shift the value one bit to the right), 
                         //yielding an address between 0 and 127.
#define maxKeyNumber 15
int lastPressedKeys[maxKeyNumber+1];
int currentPressedKeys[maxKeyNumber+1];

SoftwareSerial mySerial(10, 11); // (RX, TX)

void setup() {
  Serial.begin(9600);  // start serial for output
  mySerial.begin(9600);
  Wire.begin();
}

void loop() {

  bool isNewData = false;
  Wire.requestFrom(ttp229,2,true);
  while (Wire.available()) { 
    uint16_t b1 = Wire.read(); // receive a first byte
    uint16_t b2 = Wire.read(); // receive a second byte
    if (b1==b2 && b2==0) {break;}
    isNewData = true;
    
    int keys = (b1<<8) + b2;
    for(int i=0; i<=maxKeyNumber; i++) 
    {
      if (bitRead(keys, maxKeyNumber-i) == 1)
      {
        lastPressedKeys[i] = 1;
      }
      else {
        lastPressedKeys[i] = 0;
      }
    }
  }
  if (isNewData) {
    Serial.print("Pressed keys:");
    for(int i=0; i<=maxKeyNumber; i++) {
      if (lastPressedKeys[i] == 1)
      {
        String key = "";
        if((i+1) <= 9){
          key = key + "0"+ (i+1);
        }else{
          key = key + (i+1);
        }
        mySerial.println(key);
        Serial.print(key);  
              
        delay(500);
        
      }
    }
    Serial.println();
    Serial.println("---------------");
    isNewData = false;
  }
}
