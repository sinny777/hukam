/*
*  Hukam Technologies Switch Board based on LPC1768 IC
*  06 August 2017
*  This program is to handle 10 Digital and 3 Analog SWITCHES
*  It also handles Temperature, Humidity, Light and Current Sensors
*  Contact Email: contact@hukamtechnologies.com
*/


#include "mbed.h"
#include "MbedJSONValue.h"
#include "ACS712.h"
#include <string>
#include "TTP229.h"
#include "BME280.h"

using namespace std;

#define IAP_LOCATION 0x1FFF1FF1
typedef void (*IAP)(unsigned long [], unsigned long[] );
IAP iap_entry = (IAP) IAP_LOCATION;

#define U 230
float offset = 0.0f;

MbedJSONValue boardData;

Ticker energyTicker;
Ticker sensorDataTicker;

DigitalOut powerLED(P1_18, 0);
DigitalOut heartbeatLED(P1_19, 0);
DigitalOut radioLED(P1_20, 0);

Serial usbSerial(P0_2, P0_3);
Serial espSerial(P0_15, P0_16); // (ESP TX, RX) (LPC1768 p9, p10)
Serial analogUNO(P0_10, P0_11); // (p28, p27) (Serial TX, RX)

TTP229 touchpad(P2_4, P2_5);

// DIGITAL SWITCHES
DigitalOut DSw1(P1_21, 1);
DigitalOut DSw2(P1_22, 1);
DigitalOut DSw3(P1_23, 1);
DigitalOut DSw4(P1_24, 1);
DigitalOut DSw5(P1_25, 1);
DigitalOut DSw6(P1_26, 1);
DigitalOut DSw7(P1_27, 1);
DigitalOut DSw8(P1_28, 1);
DigitalOut ASw1(P2_0, 1);
DigitalOut ASw2(P2_1, 1);

ACS712 energySensor(ACS712_30A); // Connect to PIN P0_26
BME280 bme280(P0_10, P0_11);
AnalogIn LDR(P0_25);

// ------------     MAIN PROGRAM -----------------------

void broadcastChange(std::string command){
    radioLED = 0;
    command = command + "\n";
    // ESPSerial.puts(command.c_str());
    // espSerial.printf("\nBroadcast Command = %s\r\n" ,  command.c_str());
    printf(command.c_str());
    espSerial.printf(command.c_str());
    radioLED = 1;
    wait(0.5);
    radioLED = 0;
}

void readEnergyConsumption(){
  float Irms = energySensor.getCurrentAC();

  float currentAc = (Irms / 1023) * (5.0 / 0.66);

  float P = U * currentAc;
  boardData["current"] = Irms;
  boardData["power"] = P;
  boardData["offset"] = offset;
}

void btnPressed(int key){
  MbedJSONValue command;
  command["id"] = boardData["id"];
  switch(key){
    case 1:
      if(boardData["DSw1"].get<int>() == 1){
        DSw1 = 0;
        boardData["DSw1"] = 0;
      }else{
        DSw1 = 1;
        boardData["DSw1"] = 1;
      }
      command["index"] = key;
      command["type"] = "DSW";
      command["value"] = DSw1.read();
      break;
    case 2:
      if(boardData["DSw2"].get<int>() == 1){
        DSw2 = 0;
        boardData["DSw2"] = 0;
      }else{
        DSw2 = 1;
        boardData["DSw2"] = 1;
      }
      command["index"] = key;
      command["type"] = "DSW";
      command["value"] = DSw2.read();
      break;
    case 3:
      if(boardData["DSw3"].get<int>() == 1){
        DSw3 = 0;
        boardData["DSw3"] = 0;
      }else{
        DSw3 = 1;
        boardData["DSw3"] = 1;
      }
      command["index"] = key;
      command["type"] = "DSW";
      command["value"] = DSw3.read();
      break;
    case 4:
      if(boardData["DSw4"].get<int>() == 1){
        DSw4 = 0;
        boardData["DSw4"] = 0;
      }else{
        DSw4 = 1;
        boardData["DSw4"] = 1;
      }
      command["index"] = key;
      command["type"] = "DSW";
      command["value"] = DSw4.read();
      break;
    case 5:
      if(boardData["DSw5"].get<int>() == 1){
        DSw5 = 0;
        boardData["DSw5"] = 0;
      }else{
        DSw5 = 1;
        boardData["DSw5"] = 1;
      }
      command["index"] = key;
      command["type"] = "DSW";
      command["value"] = DSw5.read();
      break;
    case 6:
      if(boardData["DSw6"].get<int>() == 1){
        DSw6 = 0;
        boardData["DSw6"] = 0;
      }else{
        DSw6 = 1;
        boardData["DSw6"] = 1;
      }
      command["index"] = key;
      command["type"] = "DSW";
      command["value"] = DSw6.read();
      break;
    case 7:
      if(boardData["DSw7"].get<int>() == 1){
        DSw7 = 0;
        boardData["DSw7"] = 0;
      }else{
        DSw7 = 1;
        boardData["DSw7"] = 1;
      }
      command["index"] = key;
      command["type"] = "DSW";
      command["value"] = DSw7.read();;
      break;
    case 8:
      if(boardData["DSw8"].get<int>() == 1){
        DSw8 = 0;
        boardData["DSw8"] = 0;
      }else{
        DSw8 = 1;
        boardData["DSw8"] = 1;
      }
      command["index"] = key;
      command["type"] = "DSW";
      command["value"] = DSw8.read();
      break;
    case 9:
      ASw1 = !ASw1;
      command["index"] = key;
      command["type"] = "ASW";
      command["value"] = ASw1.read();
  }

  std::string str = command.serialize();
  broadcastChange(str);

}

void ttp229int(){
    // printf("%16s\r\n",to_string(touchpad).c_str());
    // espSerial.printf("%d\r\n",touchpad.onkey());
    int sw = touchpad.onkey();
    if(sw != 0){
        // espSerial.printf("{KEY: %d}", sw);
        btnPressed(sw);
    }
    //if(sw!=0) myleds=sw%16;
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

  boardData["power"] = 0.0f;
  boardData["offset"] = 0.0f;

  boardData["temp"] = 0.0f;
  boardData["hum"] = 0.0f;
  boardData["press"] = 0.0f;

  boardData["light"] = 0.0f;

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
    command["power"] = boardData["power"];
    command["current"] = boardData["current"];
    command["offset"] = boardData["offset"];
    command["temp"] = bme280.getTemperature();
    command["hum"] = bme280.getHumidity();
    command["press"] = bme280.getPressure();
    // pc.printf("%2.2f degC, %04.2f hPa, %2.2f %%\n", sensor.getTemperature(), sensor.getPressure(), sensor.getHumidity());
    command["light"] = LDR.read();
    // pc.printf("\r%u %f\n",(LDR.read_u16()/64), LDR.read());

    std::string str = command.serialize();
    broadcastChange(str);
}

void readNSaveSensorsData(){
    energyTicker.attach(&readEnergyConsumption, 10.0);
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
  // espSerial.printf("\nIN handleDataReceived = %s\r\n" ,  data);
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
  espSerial.printf("ACK_%s\n", commandStr.c_str());
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


void usb_rx_callback() {
  char value[128];
  if(usbSerial.readable()){
     usbSerial.gets(value, 106);
     espSerial.printf("ACK_%s\n", value);
  }
}
*/

// main() runs in its own thread in the OS
int main() {
    wait(2);
    powerLED = 1;
    // ESPSerial.baud(115200);
    // ESPSerial.format(8, SerialBase::None, 1);
    // ESPSerial.attach(&esp_rx_callback);
    wait(1);
    usbSerial.baud(115200);
    // usbSerial.attach(&usb_rx_callback);

    wait(2);
    touchpad.attach(&ttp229int);
    offset = energySensor.calibrate();
    setDeviceId();
    refreshMyStatus();
    readNSaveSensorsData();
    wait(1);
    printf("Hukam Board Started....");
    espSerial.printf("Hukam Board Started....");

    while(1){

      }

}
