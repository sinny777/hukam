/*
*  Hukam Technologies Switch Board based on LPC1768 IC
*  19 August 2017
*  This program is to handle 10 Digital and 3 Analog SWITCHES
*  It also handles Temperature, Humidity, Light and Current Sensors
*  Contact Email: contact@hukamtechnologies.com
*/


#include "mbed.h"
#include "MbedJSONValue.h"
#include <mpr121.h>
#include "DHT.h"
#include "ACS712.h"
#include <string>

using namespace std;

#define IAP_LOCATION 0x1FFF1FF1
typedef void (*IAP)(unsigned long [], unsigned long[] );
IAP iap_entry = (IAP) IAP_LOCATION;

#define U 230
float offset = 0.0f;

MbedJSONValue boardData;

Ticker tempTicker;
Ticker energyTicker;
Ticker sensorDataTicker;

InterruptIn touchPad1Interrupt(P2_0);
// InterruptIn touchPad2Interrupt(P2_1);
I2C i2c(P0_0, P0_1);
Mpr121 touchPad1(&i2c, Mpr121::ADD_VSS);
// Mpr121 touchPad2(&i2c, Mpr121::ADD_VDD);

bool kepad1TouchInProgress = false;
bool kepad2TouchInProgress = false;

    // Serial usbSerial(P0_2, P0_3);
    Serial xbeeSerial(P0_15, P0_16); // (XBEE TX, RX) (LPC1768 p9, p10)

    DigitalOut heartbeatLED(P1_16);
    DigitalOut xbeeLED(P1_17, 1);

// DIGITAL SWITCHES
DigitalOut DSw1(P2_4, 0);
DigitalOut DSw2(P2_5, 0);
DigitalOut DSw3(P2_6, 0);
DigitalOut DSw4(P2_7, 0);
DigitalOut DSw5(P2_8, 0);
DigitalOut DSw6(P0_21, 0);
DigitalOut DSw7(P0_22, 0);
DigitalOut DSw8(P1_0, 0);
DigitalOut ASw1(P1_28, 0);
DigitalOut ASw2(P1_29, 0);

// RGB LED PINS THAT CAN BE USED
DigitalInOut touch1(P0_4);
DigitalInOut touch2(P0_5);
DigitalInOut touch3(P0_6);
DigitalInOut touch4(P0_7);
DigitalInOut touch5(P0_8);
DigitalInOut touch6(P0_9);
DigitalInOut touch7(P0_17);
DigitalInOut touch8(P0_18);
DigitalInOut touch9(P0_19);
DigitalInOut touch10(P0_20);

AnalogIn lightSensor(P0_25);
DHT tempHumSensor(P0_24, DHT11);
ACS712 energySensor(ACS712_30A); // Connect to PIN P0_26

// ------------     MAIN PROGRAM -----------------------

void readEnergyConsumption(){
  float I = energySensor.getCurrentAC();
  float P = U * I;
  boardData["energy"] = P;
  boardData["offset"] = offset;
}

void broadcastChange(std::string command){
    xbeeLED = 1;
    command = command + "\n";
    xbeeSerial.puts(command.c_str());
    // usbSerial.printf("\nBroadcast Command = %s\r\n" ,  command.c_str());
    xbeeLED = 0;
    wait(0.2);
    xbeeLED = 1;
}

void refreshMyStatus(){
  boardData["DSw1"] = 0;
  boardData["DSw2"] = 0;
  boardData["DSw3"] = 0;
  boardData["DSw4"] = 0;
  boardData["DSw5"] = 0;
  boardData["DSw6"] = 0;
  boardData["DSw7"] = 0;
  boardData["DSw8"] = 0;
  boardData["ASw1_dval"] = 0;
  boardData["ASw1_aval"] = 0;
  boardData["ASw2_dval"] = 0;
  boardData["ASw2_aval"] = 0;

  boardData["temp"] = 0.0;
  boardData["hum"] = 0.0;
  boardData["light"] = 0.0f;
  boardData["energy"] = 0.0f;
  boardData["offset"] = 0.0f;

  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "status";
  std::string str = command.serialize();
  broadcastChange(str);
  //  printf("Ask Gateway to refresh board status for all switches\n\n");
}

void readTempHumidityData(){
      float temperature;
      float humidity;
      // int status = tempHumSensor.readData();
      temperature = tempHumSensor.ReadTemperature(CELCIUS);
      humidity = tempHumSensor.ReadHumidity();
      // dewpoint = tempHumSensor.CalcdewPointFast(temperature, humidity);

      // light=LDR.read_u16();
      // light=LDR.read()*100.0f;

    boardData["temp"] = temperature;
    boardData["hum"] = humidity;
    // boardData["light"] = lightSensor.read();
}

void sendSensorData(){
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "SB";
    command["energy"] = boardData["energy"];
    command["offset"] = boardData["offset"];
    command["temp"] = boardData["temp"];
    command["hum"] = boardData["hum"];
    command["light"] = boardData["light"];
    std::string str = command.serialize();
    broadcastChange(str);
}

void readNSaveSensorsData(){
    tempTicker.attach(&readTempHumidityData, 3.0);
    // energyTicker.attach(&readEnergyConsumption, 10.0);
    sensorDataTicker.attach(&sendSensorData, 5.0);
}

/*
string to_string(const bitset<16>& bs){
    return bs.to_string<char, std::char_traits<char>, std::allocator<char> >();
}
*/

void keyPad1Touched(){
    if(kepad1TouchInProgress == false){
      // kepad1TouchInProgress = true;
      int key_code=0;
      int value=touchPad1.read(0x00);
      value +=touchPad1.read(0x01)<<8;
      // int buttonValue = touchPad1.readTouchData();
      // usbSerial.printf("TouchPad1 >> buttonValue: %d\n", buttonValue);
      for (int i=0; i<12; i++) {
        if (((value>>i)&0x01)==1) key_code=i+1;
      }
      // usbSerial.printf("TouchPad1 >> buttonValue: %d, Key_code: %d \n", buttonValue, key_code);
      // xbeeSerial.printf("TouchPad1 >> buttonValue: %d, Key_code: %d \n", value, key_code);
      // #AE2C100952FBC1FB#D#2#0#0Z
      int swVal = 0;
      if(key_code > 0){
        switch(key_code){
          case 4:
              touch1.output();
              swVal = DSw1.read();
              if(swVal == 0){
                DSw1.write(1);
                touch1 = 1;
              }else{
                DSw1.write(0);
                touch1 = 0;
              }
              break;
          case 5:
              touch2.output();
              swVal = DSw2.read();
              if(swVal == 0){
                DSw2.write(1);
                touch2 = 1;
              }else{
                DSw2.write(0);
                touch2 = 0;
              }
              break;
          case 6:
              touch3.output();
              swVal = DSw3.read();
              if(swVal == 0){
                DSw3.write(1);
                touch3 = 1;
              }else{
                DSw3.write(0);
                touch3 = 0;
              }
              break;
          case 7:
              touch4.output();
              swVal = DSw4.read();
              if(swVal == 0){
                DSw4.write(1);
                touch4 = 1;
              }else{
                DSw4.write(0);
                touch4 = 0;
              }
              break;
          case 8:
              touch5.output();
              swVal = DSw5.read();
              if(swVal == 0){
                DSw5.write(1);
                touch5 = 1;
              }else{
                DSw5.write(0);
                touch5 = 0;
              }
              break;
          case 9:
              touch6.output();
              swVal = DSw6.read();
              if(swVal == 0){
                DSw6.write(1);
                touch6 = 1;
              }else{
                DSw6.write(0);
                touch6 = 0;
              }
              break;
          case 10:
              touch7.output();
              swVal = DSw7.read();
              if(swVal == 0){
                DSw7.write(1);
                touch7 = 1;
              }else{
                DSw7.write(0);
                touch7 = 0;
              }
              break;
          case 11:
              touch8.output();
              swVal = DSw8.read();
              if(swVal == 0){
                DSw8.write(1);
                touch8 = 1;
              }else{
                DSw8.write(0);
                touch8 = 0;
              }
              break;
          case 12:
              touch9.output();
              swVal = ASw1.read();
              if(swVal == 0){
                ASw1.write(1);
                touch9 = 1;
              }else{
                ASw1.write(0);
                touch9 = 0;
              }
              break;
        }

        MbedJSONValue command;
        command["id"] = boardData["id"];
        command["type"] = "DSW";
        command["index"] = key_code;
        command["value"] = swVal;
        std::string str = command.serialize();
        broadcastChange(str);
      }
      // wait_ms(500);
      kepad1TouchInProgress = false;
    }
}

/*
void keyPad2Touched(){
    int key_code=0;
    int i=0;
    int value=touchPad2.read(0x00);
    value +=touchPad2.read(0x01)<<8;
    // volatile int buttonValue = touchPad2.readTouchData();
    // usbSerial.printf("TouchPad2 >> buttonValue: %d\n", buttonValue);
    for (i=0; i<12; i++) {
      if (((value>>i)&0x01)==1) key_code=i+13;
    }
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "DSW";
    command["index"] = key_code;
    command["value"] = value;
    std::string str = command.serialize();
    broadcastChange(str);
}
*/

void setDeviceId(){
    unsigned long comm[5] = {0,0,0,0,0};
    unsigned long result[5] = {0,0,0,0,0};
    comm[0] = 58;  // read device serial number
    // printf("\r\nSerial number:\r\n");
    iap_entry(comm, result);
    boardData["id"] = "";
    char tmpbuf[256];
    if (result[0] == 0) {
          sprintf(tmpbuf,"%08X%08X",result[0], result[1]);
          sprintf(tmpbuf,"%08X%08X", result[2], result[3]);
        boardData["id"] = tmpbuf;
    } else {
        // printf("Status error!\r\n");
    }
}

void handleDataReceived(char data[128]){
  // usbSerial.printf("\nIN handleDataReceived = %s\r\n" ,  data);
  MbedJSONValue command;
  const char *str(data);
  parse(command, str);
  int deviceIndex = command["deviceIndex"].get<int>();
  int deviceValue = command["deviceValue"].get<int>();
  switch(deviceIndex){
    case 1:
      DSw1 = deviceValue;
      touch1.output();
      touch1 = deviceValue;
      break;
    case 2:
      DSw2 = deviceValue;
      touch2.output();
      touch2 = deviceValue;
      break;
    case 3:
        DSw3 = deviceValue;
        touch3.output();
        touch3 = deviceValue;
        break;
    case 4:
        DSw4 = deviceValue;
        touch4.output();
        touch4 = deviceValue;
        break;
    case 5:
        DSw5 = deviceValue;
        touch5.output();
        touch5 = deviceValue;
        break;
    case 6:
        DSw6 = deviceValue;
        touch6.output();
        touch6 = deviceValue;
        break;
    case 7:
        DSw7 = deviceValue;
        touch7.output();
        touch7 = deviceValue;
        break;
    case 8:
        DSw8 = deviceValue;
        touch8.output();
        touch8 = deviceValue;
        break;
    case 9:
        ASw1 = deviceValue;
        touch9.output();
        touch9 = !touch9;
        break;
    case 10:
        ASw2 = deviceValue;
        touch10.output();
        touch10 = deviceValue;
        break;
  }
  std::string commandStr;
  commandStr = command.serialize();
  xbeeSerial.printf("ACK_%s\n", commandStr.c_str());
  /*
  DSw1 = !DSw1;
  DSw2 = !DSw2;
  DSw3 = !DSw3;
  DSw4 = !DSw4;
  DSw5 = !DSw5;
  DSw6 = !DSw6;
  DSw7 = !DSw7;
  DSw8 = !DSw8;
  ASw1 = !ASw1;
  ASw2 = !ASw2;
  touch1.output();
  touch1 = !touch1;
  touch2.output();
  touch2 = !touch2;
  touch3.output();
  touch3 = !touch3;
  touch4.output();
  touch4 = !touch4;
  touch5.output();
  touch5 = !touch5;
  touch6.output();
  touch6 = !touch6;
  touch7.output();
  touch7 = !touch7;
  touch8.output();
  touch8 = !touch8;
  touch9.output();
  touch9 = !touch9;
  touch10.output();
  touch10 = !touch10;
  // wait(0.5);
  */
}

void xbee_rx_callback() {
  char value[128];
  if(xbeeSerial.readable()){
      // xbeeSerial.scanf("%s\n",&value);
      xbeeSerial.gets(value, 106);
      handleDataReceived(value);
      // wait_ms(3);
      // xbeeSerial.printf("ACK_%s\n", value);
  }
}

// main() runs in its own thread in the OS
int main() {
    // usbSerial.baud(115200);
    xbeeSerial.baud(9600);
    xbeeSerial.format(8, SerialBase::None, 1);
    xbeeSerial.attach(&xbee_rx_callback);

    wait(5);
    // offset = energySensor.calibrate();
    setDeviceId();
    refreshMyStatus();

    /*
    for (int i=0; i<12; i++) {
          touchPad1.setElectrodeThreshold(i, 65, 65);
          touchPad2.setElectrodeThreshold(i, 65, 65);
    }
    */

    touchPad1Interrupt.fall(&keyPad1Touched);
    touchPad1Interrupt.mode(PullUp);
    wait(1);
    // touchPad2Interrupt.fall(&keyPad2Touched);
    // touchPad2Interrupt.mode(PullUp);
    // wait(1);
    // touchPad1.setProximityMode(true);
    // touchPad2.setProximityMode(true);

    readNSaveSensorsData();
    wait(1);

    while(1){}

}
