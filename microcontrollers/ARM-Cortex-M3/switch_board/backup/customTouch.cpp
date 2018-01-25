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

Ticker tickTouch1;
Ticker tickTouch2;
Ticker tickTouch3;
Ticker tickTouch4;
Ticker tickTouch5;
// Ticker tickTouch6;
// Ticker tickTouch7;
// Ticker tickTouch8;
// Ticker tickTouch9;
// Ticker tickTouch10;

    Serial usbSerial(P0_2, P0_3);
    Serial xbeeSerial(P0_15, P0_16); // (XBEE TX, RX) (LPC1768 p9, p10)
    Serial analogUNO(P0_10, P0_11); // (p28, p27) (Serial TX, RX)

    DigitalOut heartbeatLED(P1_20);
    DigitalOut xbeeLED(P1_18, 0);

// DIGITAL SWITCHES
DigitalOut DSw1(P0_4);
DigitalOut DSw2(P0_5);
DigitalOut DSw3(P0_6);
DigitalOut DSw4(P2_7);
DigitalOut DSw5(P2_8);
DigitalOut DSw6(P0_21);
DigitalOut DSw7(P0_22);
DigitalOut DSw8(P1_0);
DigitalOut ASw1(P0_24);
DigitalOut ASw2(P0_25);

// RGB LED PINS THAT CAN BE USED
DigitalInOut touch1(P2_0);
DigitalInOut touch2(P2_1);
DigitalInOut touch3(P2_2);
DigitalInOut touch4(P2_3);
DigitalInOut touch5(P2_4);
DigitalInOut touch6(P2_5);
// DigitalInOut touch7(P0_17);
// DigitalInOut touch8(P0_18);
// DigitalInOut touch9(P0_19);
// DigitalInOut touch10(P0_20);

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
    usbSerial.printf("\nBroadcast Command: %s\r\n" ,  command.c_str());
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
    tempTicker.attach(&readTempHumidityData, 5.0);
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
  usbSerial.printf("\nIN handleDataReceived = %s\r\n" ,  data);
   // pc.puts(data);
   // usbSerial.printf("\n");
   // usbSerial.puts(data);
   // broadcastChange(data);
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

void detectTouch1(void){
    uint8_t count = 0;
    uint8_t touch_data1 = 0;
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "sb";
    command["index"] = 1;
    touch1.input();              // discharge the capacitor
    while (touch1.read()) {
        count++;
        if (count > 4) {
            break;
        }
    }
    touch1.output();
    touch1.write(1);             // charge the capacitor

    if (count > 3) {
        touch_data1 = (touch_data1 << 1) + 1;
    } else {
        touch_data1 = (touch_data1 << 1);
    }
    if (touch_data1 == 0x01) {
        int val = boardData["DSw1"].get<int>();
        if(val == 0){
            boardData["DSw1"] = 1;
            DSw1 = 1;
            command["dv"] = 1;
        }else{
            boardData["DSw1"] = 0;
            DSw1 = 0;
            command["dv"] = 0;
        }
        heartbeatLED = 1;                // touch
        wait(0.1);
        heartbeatLED = 0;

        std::string str = command.serialize();
        // usbSerial.printf("\nCommand = %s\r\n" ,  str.c_str());
        broadcastChange(str);
    }

}

void detectTouch2(void){
    uint8_t count = 0;
    uint8_t touch_data2 = 0;
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "sb";
    command["index"] = 2;
    touch2.input();              // discharge the capacitor
    while (touch2.read()) {
        count++;
        if (count > 4) {
            break;
        }
    }
    touch2.output();
    touch2.write(1);             // charge the capacitor

    if (count > 3) {
        touch_data2 = (touch_data2 << 1) + 1;
    } else {
        touch_data2 = (touch_data2 << 1);
    }

    if (touch_data2 == 0x01) {
      int val = boardData["DSw2"].get<int>();
      if(val == 0){
          boardData["DSw2"] = 1;
          DSw2 = 1;
          command["dv"] = 1;
      }else{
          boardData["DSw2"] = 0;
          DSw2 = 0;
          command["dv"] = 0;
      }
      heartbeatLED = 1;                // touch
      wait(0.1);
      heartbeatLED = 0;

      std::string str = command.serialize();
      // usbSerial.printf("\nCommand = %s\r\n" ,  str.c_str());
      broadcastChange(str);
    }
}

void detectTouch3(void){
    uint8_t count = 0;
    uint8_t touch_data3 = 0;
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "sb";
    command["index"] = 3;
    touch3.input();              // discharge the capacitor
    while (touch3.read()) {
        count++;
        if (count > 4) {
            break;
        }
    }
    touch3.output();
    touch3.write(1);             // charge the capacitor

    if (count > 3) {
        touch_data3 = (touch_data3 << 1) + 1;
    } else {
        touch_data3 = (touch_data3 << 1);
    }
    if (touch_data3 == 0x01) {
        int val = boardData["DSw3"].get<int>();
        if(val == 0){
            boardData["DSw3"] = 1;
            DSw3 = 1;
            command["dv"] = 1;
        }else{
            boardData["DSw3"] = 0;
            DSw3 = 0;
            command["dv"] = 0;
        }
        heartbeatLED = 1;                // touch
        wait(0.1);
        heartbeatLED = 0;

        std::string str = command.serialize();
        // usbSerial.printf("\nCommand = %s\r\n" ,  str.c_str());
        broadcastChange(str);
    }
}

void detectTouch4(void){
    uint8_t count = 0;
    uint8_t touch_data4 = 0;
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "sb";
    command["index"] = 4;
    touch4.input();              // discharge the capacitor
    while (touch4.read()) {
        count++;
        if (count > 4) {
            break;
        }
    }
    touch4.output();
    touch4.write(1);             // charge the capacitor

    if (count > 3) {
        touch_data4 = (touch_data4 << 1) + 1;
    } else {
        touch_data4 = (touch_data4 << 1);
    }
    if (touch_data4 == 0x01) {
        int val = boardData["DSw4"].get<int>();
        if(val == 0){
            boardData["DSw4"] = 1;
            DSw4 = 1;
            command["dv"] = 1;
        }else{
            boardData["DSw4"] = 0;
            DSw4 = 0;
            command["dv"] = 0;
        }
        heartbeatLED = 1;                // touch
        wait(0.1);
        heartbeatLED = 0;

        std::string str = command.serialize();
        // usbSerial.printf("\nCommand = %s\r\n" ,  str.c_str());
        broadcastChange(str);
    }
}

void detectTouch5(void){
    uint8_t count = 0;
    uint8_t touch_data5 = 0;
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "sb";
    command["index"] = 5;
    touch5.input();              // discharge the capacitor
    while (touch5.read()) {
        count++;
        if (count > 4) {
            break;
        }
    }
    touch5.output();
    touch5.write(1);             // charge the capacitor

    if (count > 3) {
        touch_data5 = (touch_data5 << 1) + 1;
    } else {
        touch_data5 = (touch_data5 << 1);
    }
    if (touch_data5 == 0x01) {
        int val = boardData["DSw5"].get<int>();
        if(val == 0){
            boardData["DSw5"] = 1;
            DSw5 = 1;
            command["dv"] = 1;
        }else{
            boardData["DSw5"] = 0;
            DSw5 = 0;
            command["dv"] = 0;
        }
        heartbeatLED = 1;                // touch
        wait(0.1);
        heartbeatLED = 0;

        std::string str = command.serialize();
        // usbSerial.printf("\nCommand = %s\r\n" ,  str.c_str());
        broadcastChange(str);
    }
}

// main() runs in its own thread in the OS
int main() {

    usbSerial.baud(19200);
    xbeeSerial.baud(9600);
    xbeeSerial.format(8, SerialBase::None, 1);
    xbeeSerial.attach(&xbee_rx_callback);

    wait(5);
    // offset = energySensor.calibrate();
     setDeviceId();
     refreshMyStatus();

     readNSaveSensorsData();

    touch1.mode(PullDown);
    touch1.output();
    touch1.write(1);
    tickTouch1.attach(detectTouch1, 1.0 / 5.0);

    touch2.mode(PullDown);
    touch2.output();
    touch2.write(1);
    tickTouch2.attach(detectTouch2, 1.0 / 5.0);

    touch3.mode(PullDown);
    touch3.output();
    touch3.write(1);
    tickTouch3.attach(detectTouch3, 1.0 / 5.0);

    touch4.mode(PullDown);
    touch4.output();
    touch4.write(1);
    tickTouch4.attach(detectTouch4, 1.0 / 5.0);

    touch5.mode(PullDown);
    touch5.output();
    touch5.write(1);
    tickTouch5.attach(detectTouch5, 1.0 / 5.0);


    while(1){}

}
