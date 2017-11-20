/*
*  Hukam Technologies Switch Board based on LPC1768 IC
*  19 August 2017
*  This program is to handle 10 Digital and 3 Analog SWITCHES
*  It also handles Temperature, Humidity, Light and Current Sensors
*  Contact Email: contact@hukamtechnologies.com
*/


#include "mbed.h"
#include "MbedJSONValue.h"
#include "DHT.h"
#include "ACS712.h"
#include <mpr121.h>
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
    InterruptIn touchPad2Interrupt(P2_1);
    I2C i2c(P0_0, P0_1);
    Mpr121 touchPad1(&i2c, Mpr121::ADD_VSS);
    Mpr121 touchPad2(&i2c, Mpr121::ADD_VDD);

    Serial usbSerial(P0_2, P0_3);
    Serial xbeeSerial(P0_15, P0_16); // (XBEE TX, RX) (LPC1768 p9, p10)
    Serial analogUNO(P0_10, P0_11); // (p28, p27) (Serial TX, RX)

    DigitalOut heartbeatLED(P1_20);
    DigitalOut xbeeLED(P1_18, 1);

// DIGITAL SWITCHES
DigitalOut DSw1(P2_4);
DigitalOut DSw2(P2_5);
DigitalOut DSw3(P2_6);
DigitalOut DSw4(P2_7);
DigitalOut DSw5(P2_8);
DigitalOut DSw6(P0_21);
DigitalOut DSw7(P0_22);
DigitalOut DSw8(P1_0);
DigitalOut ASw1(P0_24);
DigitalOut ASw2(P0_25);

// RGB LED PINS THAT CAN BE USED
DigitalInOut touch1(P0_4);
DigitalInOut touch2(P0_5);
DigitalInOut touch3(P2_2);
DigitalInOut touch4(P0_7);
DigitalInOut touch5(P0_8);
DigitalInOut touch6(P0_9);
DigitalInOut touch7(P0_17);
DigitalInOut touch8(P0_18);
DigitalInOut touch9(P0_19);
DigitalInOut touch10(P0_20);

DHT tempHumSensor(P0_23, DHT11);
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
    usbSerial.printf("\nBroadcast Command = %s\r\n" ,  command.c_str());
    xbeeSerial.puts(command.c_str());
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
  boardData["ASw1_dval"] = 0;
  boardData["ASw1_aval"] = 0;
  boardData["ASw2_dval"] = 0;
  boardData["ASw2_aval"] = 0;

  boardData["temp"] = 0;
  boardData["hum"] = 0;
  boardData["energy"] = 0.00;
  boardData["offset"] = 0.00;

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
    float dewpoint;
    int status = tempHumSensor.readData();
    temperature = tempHumSensor.ReadTemperature(CELCIUS);
    humidity = tempHumSensor.ReadHumidity();
    dewpoint = tempHumSensor.CalcdewPointFast(temperature, humidity);

    boardData["temp"] = temperature;
    boardData["hum"] = humidity;
    boardData["dewpoint"] = dewpoint;
}

void sendSensorData(){
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "SB";
    command["energy"] = boardData["energy"];
    command["offset"] = boardData["offset"];
    command["temp"] = boardData["temp"];
    command["hum"] = boardData["hum"];
    std::string str = command.serialize();
    broadcastChange(str);
}

void readNSaveSensorsData(){
    tempTicker.attach(&readTempHumidityData, 2.0);
    // energyTicker.attach(&readEnergyConsumption, 10.0);
    sensorDataTicker.attach(&sendSensorData, 5.0);
}

/*
string to_string(const bitset<16>& bs){
    return bs.to_string<char, std::char_traits<char>, std::allocator<char> >();
}
*/

void keyPad1Touched(){
    int key_code=0;
    int i=0;
    volatile int buttonValue=touchPad1.read(0x00);
    buttonValue +=touchPad1.read(0x01)<<8;
    // volatile int buttonValue = touchPad1.readTouchData();
    usbSerial.printf("TouchPad1 >> buttonValue: %d\n", buttonValue);
    i = 0;
    for (i=0; i<12; i++) {
      if (((buttonValue>>i)&0x01)==1) key_code=i+1;
    }
    usbSerial.printf("TouchPad1 >> buttonValue: %d, Key_code: %d \n", buttonValue, key_code);
    xbeeSerial.printf("TouchPad1 >> buttonValue: %d, Key_code: %d \n", buttonValue, key_code);
}

void keyPad2Touched(){
    int key_code=0;
    int i=0;
    int buttonValue=touchPad2.read(0x00);
    buttonValue +=touchPad2.read(0x01)<<8;
    // volatile int buttonValue = touchPad2.readTouchData();
    usbSerial.printf("TouchPad2 >> buttonValue: %d\n", buttonValue);
    for (i=0; i<12; i++) {
      if (((buttonValue>>i)&0x01)==1) key_code=i+1;
    }
    usbSerial.printf("TouchPad2 >> buttonValue: %d, Key_code: %d \n", buttonValue, key_code);
    xbeeSerial.printf("TouchPad2 >> Value: %d, Key_code: %d \n", buttonValue, key_code);
}


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
  usbSerial.printf("\nIN handleDataReceived = %s\r\n" ,  data);
   // pc.puts(data);
   // usbSerial.printf("\n");
   // usbSerial.puts(data);
   // broadcastChange(data);
   DSw1 = 1;
   DSw2 = 1;
   DSw3 = 1;
   DSw4 = 1;
   DSw5 = 1;
   DSw6 = 1;
   DSw7 = 1;
   DSw8 = 1;
   wait(0.5);
   DSw1 = 0;
   DSw2 = 0;
   DSw3 = 0;
   DSw4 = 0;
   DSw5 = 0;
   DSw6 = 0;
   DSw7 = 0;
   DSw8 = 0;
   wait(0.5);
   xbeeLED = 1;
   wait(0.5);
   xbeeLED = 0;
   wait(0.5);
}

void xbee_rx_callback() {
  char value[26];
  if(xbeeSerial.readable()){
      xbeeSerial.scanf("%sZ\n",&value);
      handleDataReceived(value);
      wait_ms(3);
      // xbeeSerial.printf("ACK_%s\n",&value);
  }
}

// main() runs in its own thread in the OS
int main() {

    usbSerial.baud(9600);
    xbeeSerial.baud(9600);
    xbeeSerial.format(8, SerialBase::None, 1);
    xbeeSerial.attach(&xbee_rx_callback);

    wait(5);
    // offset = energySensor.calibrate();
    setDeviceId();
    refreshMyStatus();
    int i;
    for (i=0; i<12; i++) {                           // Set up for sensitivity of Electrodes.
          touchPad1.setElectrodeThreshold(i, 65, 65);
    }
    touchPad1Interrupt.mode(PullUp);
    touchPad1Interrupt.fall(&keyPad1Touched);
    wait(1);
    touchPad2Interrupt.mode(PullUp);
    touchPad2Interrupt.fall(&keyPad2Touched);

    touchPad1.setProximityMode(true);

    // readNSaveSensorsData();

    while(1){}

}
