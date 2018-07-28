/*
*  Hukam Technologies Switch Board based on LPC1768 IC
*  19 August 2017
*  This program is to handle 10 Digital and 3 Analog SWITCHES
*  It also handles Temperature, Humidity, Light and Current Sensors
*  Contact Email: contact@hukamtechnologies.com
*/


#include "mbed.h"
#include "MbedJSONValue.h"
// #include "ACS712.h"
#include <string>
#include "TTP229.h"

using namespace std;

#define IAP_LOCATION 0x1FFF1FF1
typedef void (*IAP)(unsigned long [], unsigned long[] );
IAP iap_entry = (IAP) IAP_LOCATION;

#define U 230
float offset = 0.0f;

MbedJSONValue boardData;

// Ticker energyTicker;
Ticker sensorDataTicker;

DigitalOut powerLED(P1_18, 0);
DigitalOut heartbeatLED(P1_19, 0);
DigitalOut radioLED(P1_20, 0);

Serial usbSerial(P0_2, P0_3);
// Serial ESPSerial(P0_11, P0_10);
// Serial ESPSerial(P0_0, P0_1); // (TX, RX)

TTP229 touchpad(P0_27,P0_28);

// DIGITAL SWITCHES
DigitalOut DSw1(P1_21, 0);
DigitalOut DSw2(P1_22, 0);
DigitalOut DSw3(P1_23, 0);
DigitalOut DSw4(P1_24, 0);
DigitalOut DSw5(P1_25, 0);
DigitalOut DSw6(P1_26, 0);
DigitalOut DSw7(P1_27, 0);
DigitalOut DSw8(P1_28, 0);
// DigitalOut ASw1(P2_0, 0);
// DigitalOut ASw2(P2_1, 0);

// ACS712 energySensor(ACS712_30A); // Connect to PIN P0_26

// ------------     MAIN PROGRAM -----------------------

/*
void readEnergyConsumption(){
  float I = energySensor.getCurrentAC();
  float P = U * I;
  boardData["energy"] = P;
  boardData["offset"] = offset;
}
*/

void ttp229int(){
    // printf("%16s\r\n",to_string(touchpad).c_str());
    printf("%d\r\n",touchpad.onkey());
    int sw = touchpad.onkey();
    if(sw != 0){
        printf("KEY: %d\r\n", sw);
    }
    //if(sw!=0) myleds=sw%16;
}

void broadcastChange(std::string command){
    radioLED = 0;
    command = command + "\n";
    // ESPSerial.puts(command.c_str());
    usbSerial.printf("\nBroadcast Command = %s\r\n" ,  command.c_str());
    radioLED = 1;
    wait(0.5);
    radioLED = 0;
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

  boardData["energy"] = 0.0f;
  boardData["offset"] = 0.0f;

  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "status";
  std::string str = command.serialize();
  broadcastChange(str);
  //  printf("Ask Gateway to refresh board status for all switches\n\n");
}

void sendSensorData(){
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "SB";
    command["energy"] = boardData["energy"];
    command["offset"] = boardData["offset"];
    std::string str = command.serialize();
    broadcastChange(str);
}

void readNSaveSensorsData(){
    // energyTicker.attach(&readEnergyConsumption, 10.0);
    sensorDataTicker.attach(&sendSensorData, 5.0);
}

/*
string to_string(const bitset<16>& bs){
    return bs.to_string<char, std::char_traits<char>, std::allocator<char> >();
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
      break;
    case 2:
      DSw2 = deviceValue;
      break;
    case 3:
        DSw3 = deviceValue;
        break;
    case 4:
        DSw4 = deviceValue;
        break;
    case 5:
        DSw5 = deviceValue;
        break;
    case 6:
        DSw6 = deviceValue;
        break;
    case 7:
        DSw7 = deviceValue;
        break;
    case 8:
        DSw8 = deviceValue;
        break;
  }
  std::string commandStr;
  commandStr = command.serialize();
  // ESPSerial.printf("ACK_%s\n", commandStr.c_str());
  usbSerial.printf("ACK_%s\n", commandStr.c_str());
}

void btn1Pressed(){
  DSw1 = !DSw1;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "DSW";
  command["index"] = 1;
  command["value"] = DSw1.read();
  std::string str = command.serialize();
  broadcastChange(str);
}

void btn2Pressed(){
  DSw2 = !DSw2;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "DSW";
  command["index"] = 2;
  command["value"] = DSw2.read();
  std::string str = command.serialize();
  broadcastChange(str);
  // wait_ms(3);
}

void btn3Pressed(){
  DSw3 = !DSw3;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "DSW";
  command["index"] = 3;
  command["value"] = DSw3.read();
  std::string str = command.serialize();
  broadcastChange(str);
  // wait_ms(3);
}

void btn4Pressed(){
  DSw4 = !DSw4;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "DSW";
  command["index"] = 4;
  command["value"] = DSw4.read();
  std::string str = command.serialize();
  broadcastChange(str);
  // wait_ms(3);
}

void btn5Pressed(){
  DSw5 = !DSw5;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "DSW";
  command["index"] = 5;
  command["value"] = DSw5.read();
  std::string str = command.serialize();
  broadcastChange(str);
  // wait_ms(3);
}

void btn6Pressed(){
  DSw6 = !DSw6;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "DSW";
  command["index"] = 6;
  command["value"] = DSw6.read();
  std::string str = command.serialize();
  broadcastChange(str);
  // wait_ms(3);
}

void btn7Pressed(){
  DSw7 = !DSw7;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "DSW";
  command["index"] = 7;
  command["value"] = DSw7.read();
  std::string str = command.serialize();
  broadcastChange(str);
  // wait_ms(3);
}

void btn8Pressed(){
  DSw8 = !DSw8;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "DSW";
  command["index"] = 8;
  command["value"] = DSw8.read();
  std::string str = command.serialize();
  broadcastChange(str);
  // wait_ms(3);
}

void btn9Pressed(){
  // ASw1 = !ASw1;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "ASW";
  command["index"] = 1;
  // command["value"] = ASw1.read();
  std::string str = command.serialize();
  broadcastChange(str);
  // wait_ms(3);
}

void btn10Pressed(){
  // ASw2 = !ASw2;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "ASW";
  command["index"] = 2;
  // command["value"] = ASw2.read();
  std::string str = command.serialize();
  broadcastChange(str);
  // wait_ms(3);
}

void btn11Pressed(){
  int asw1_aval = boardData["ASw1_aval"].get<int>();
  if(asw1_aval < 10){
      boardData["ASw1_aval"] = asw1_aval + 1;
      MbedJSONValue command;
      command["id"] = boardData["id"];
      command["type"] = "ASWP";
      command["index"] = 1;
      command["value"] = asw1_aval;
      std::string str = command.serialize();
      broadcastChange(str);
  }
}

void btn12Pressed(){
  int asw1_aval = boardData["ASw1_aval"].get<int>();
  if(asw1_aval <= 10 || asw1_aval > 0){
      boardData["ASw1_aval"] = asw1_aval - 1;
      MbedJSONValue command;
      command["id"] = boardData["id"];
      command["type"] = "ASWP";
      command["index"] = 1;
      command["value"] = asw1_aval;
      std::string str = command.serialize();
      broadcastChange(str);
  }
}

void btn13Pressed(){
  int asw2_aval = boardData["ASw2_aval"].get<int>();
  if(asw2_aval < 10){
      boardData["ASw2_aval"] = asw2_aval + 1;
      MbedJSONValue command;
      command["id"] = boardData["id"];
      command["type"] = "ASWP";
      command["index"] = 2;
      command["value"] = asw2_aval;
      std::string str = command.serialize();
      broadcastChange(str);
  }
}

void btn14Pressed(){
  int asw2_aval = boardData["ASw2_aval"].get<int>();
  if(asw2_aval <= 10 || asw2_aval > 0){
      boardData["ASw2_aval"] = asw2_aval - 1;
      MbedJSONValue command;
      command["id"] = boardData["id"];
      command["type"] = "ASWP";
      command["index"] = 2;
      command["value"] = asw2_aval;
      std::string str = command.serialize();
      broadcastChange(str);
  }
}

/*
void esp_rx_callback() {
  char value[128];
  if(ESPSerial.readable()){
      // ESPSerial.scanf("%s\n",&value);
      ESPSerial.gets(value, 106);
      handleDataReceived(value);
      // wait_ms(3);
      // ESPSerial.printf("ACK_%s\n", value);
  }
}
*/

void usb_rx_callback() {
  char value[128];
  if(usbSerial.readable()){
      usbSerial.gets(value, 106);
     usbSerial.printf("ACK_%s\n", value);
  }
}

// main() runs in its own thread in the OS
int main() {
    wait(2);
    powerLED = 1;
    // ESPSerial.baud(115200);
    // ESPSerial.format(8, SerialBase::None, 1);
    // ESPSerial.attach(&esp_rx_callback);
    wait(1);
    usbSerial.baud(9600);
    usbSerial.attach(&usb_rx_callback);

    wait(2);
    touchpad.attach(&ttp229int);
    // offset = energySensor.calibrate();
    setDeviceId();
    refreshMyStatus();
    readNSaveSensorsData();
    wait(1);

    while(1){

      }

}
