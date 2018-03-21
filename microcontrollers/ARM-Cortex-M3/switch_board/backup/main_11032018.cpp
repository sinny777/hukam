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

    Serial usbSerial(P0_2, P0_3);
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

// Push Button PINS THAT CAN BE USED
InterruptIn btn1(P0_4);
InterruptIn btn2(P0_5);
InterruptIn btn3(P0_6);
InterruptIn btn4(P0_7);
InterruptIn btn5(P0_8);
InterruptIn btn6(P0_9);
InterruptIn btn7(P0_17);
InterruptIn btn8(P0_18);
InterruptIn btn9(P0_19);
InterruptIn btn10(P0_20);
InterruptIn aBtn1P(P0_0);
InterruptIn aBtn1M(P0_1);
InterruptIn aBtn2P(P2_1);
InterruptIn aBtn2M(P2_0);



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
      int status = tempHumSensor.readData();
      temperature = tempHumSensor.ReadTemperature(CELCIUS);
      humidity = tempHumSensor.ReadHumidity();
      // dewpoint = tempHumSensor.CalcdewPointFast(temperature, humidity);

      // light=LDR.read_u16();
      // light=LDR.read()*100.0f;

    boardData["temp"] = temperature;
    boardData["hum"] = humidity;
    // boardData["light"] = lightSensor.read()*100.0f;
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
    tempTicker.attach(&readTempHumidityData, 2.0);
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
    case 9:
        ASw1 = deviceValue;
        break;
    case 10:
        ASw2 = deviceValue;
        break;
  }
  std::string commandStr;
  commandStr = command.serialize();
  xbeeSerial.printf("ACK_%s\n", commandStr.c_str());
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
  ASw1 = !ASw1;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "ASW";
  command["index"] = 1;
  command["value"] = ASw1.read();
  std::string str = command.serialize();
  broadcastChange(str);
  // wait_ms(3);
}

void btn10Pressed(){
  ASw2 = !ASw2;
  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "ASW";
  command["index"] = 2;
  command["value"] = ASw2.read();
  std::string str = command.serialize();
  broadcastChange(str);
  // wait_ms(3);
}

void aBtn1PPressed(){
  int asw1_aval = boardData["ASw1_aval"].get<int>();
  if(asw1_aval < 10){
      int val = asw1_aval + 1;
      boardData["ASw1_aval"] = val;
      MbedJSONValue command;
      command["id"] = boardData["id"];
      command["type"] = "ASWP";
      command["index"] = 1;
      command["value"] = val;
      usbSerial.printf("%c", (val+96));
      std::string str = command.serialize();
      broadcastChange(str);
  }
}

void aBtn1MPressed(){
  int asw1_aval = boardData["ASw1_aval"].get<int>();
  if(asw1_aval <= 10 || asw1_aval > 0){
    int val = asw1_aval - 1;
    boardData["ASw1_aval"] = val;
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "ASWM";
    command["index"] = 1;
    command["value"] = val;
    usbSerial.printf("%c", (val+96));
    std::string str = command.serialize();
    broadcastChange(str);
  }
}

void aBtn2PPressed(){
  int asw2_aval = boardData["ASw2_aval"].get<int>();
  if(asw2_aval < 10){
    int val = asw2_aval + 1;
    boardData["ASw2_aval"] = val;
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "ASWP";
    command["index"] = 2;
    command["value"] = val;
    usbSerial.printf("%c", (val+96));
    std::string str = command.serialize();
    broadcastChange(str);
  }
}

void aBtn2MPressed(){
  int asw2_aval = boardData["ASw2_aval"].get<int>();
  if(asw2_aval <= 10 || asw2_aval > 0){
    int val = asw2_aval - 1;
    boardData["ASw2_aval"] = val;
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "ASWM";
    command["index"] = 2;
    command["value"] = val;
    usbSerial.printf("%c", (val+96));
    std::string str = command.serialize();
    broadcastChange(str);
  }
}

// main() runs in its own thread in the OS
int main() {
    // usbSerial.baud(115200);
    xbeeSerial.baud(9600);
    xbeeSerial.format(8, SerialBase::None, 1);
    xbeeSerial.attach(&xbee_rx_callback);

    wait(2);
    usbSerial.baud(9600);
    usbSerial.format(8, SerialBase::None, 1);

    wait(3);
    // offset = energySensor.calibrate();
    setDeviceId();
    refreshMyStatus();

    readNSaveSensorsData();
    wait(1);
    btn1.mode(PullUp);
    btn2.mode(PullUp);
    btn3.mode(PullUp);
    btn4.mode(PullUp);
    btn5.mode(PullUp);
    btn6.mode(PullUp);
    btn7.mode(PullUp);
    btn8.mode(PullUp);
    btn9.mode(PullUp);
    btn10.mode(PullUp);
    aBtn1P.mode(PullUp);
    aBtn1M.mode(PullUp);
    aBtn2P.mode(PullUp);
    aBtn2M.mode(PullUp);

    btn1.fall(&btn1Pressed);
    btn2.fall(&btn2Pressed);
    btn3.fall(&btn3Pressed);
    btn4.fall(&btn4Pressed);
    btn5.fall(&btn5Pressed);
    btn6.fall(&btn6Pressed);
    btn7.fall(&btn7Pressed);
    btn8.fall(&btn8Pressed);
    btn9.fall(&btn9Pressed);
    btn10.fall(&btn10Pressed);
    aBtn1P.fall(&aBtn1PPressed);
    aBtn1M.fall(&aBtn1MPressed);
    aBtn2P.fall(&aBtn2PPressed);
    aBtn2M.fall(&aBtn2MPressed);

    while(1){

    }

}
