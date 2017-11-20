/*
*  Sensors Device based on LPC1768 IC
*  28 October 2017
*  This program is to handle multiple sensors and broadcast data
*  It handles Temperature, Humidity, Light and Current Sensors
*  Contact Email: sinny777@gmail.com
*/

#include "mbed.h"
#include "MbedJSONValue.h"
#include "DHT.h"
#include <string>

using namespace std;

#define IAP_LOCATION 0x1FFF1FF1
typedef void (*IAP)(unsigned long [], unsigned long[] );
IAP iap_entry = (IAP) IAP_LOCATION;

MbedJSONValue boardData;

Ticker tempTicker;
Ticker sensorDataTicker;

    Serial usbSerial(P0_2, P0_3);
    Serial xbeeSerial(P0_15, P0_16, 9600); // (XBEE TX, RX) (LPC1768 p9, p10)

    DigitalOut heartbeatLED(P1_18);
    DigitalOut xbeeLED(P1_20, 1);
    DigitalOut LED(P1_21, 0);

DHT tempHumSensor(P0_23, DHT11);

// ------------     MAIN PROGRAM -----------------------

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
  boardData["temp"] = 0;
  boardData["hum"] = 0;
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
    command["type"] = "switch_board";
    command["temp"] = boardData["temp"];
    command["hum"] = boardData["hum"];
    // command["dewpoint"] = boardData["dewpoint"];
    std::string str = command.serialize();
    broadcastChange(str);
}

void readNSaveSensorsData(){
    tempTicker.attach(&readTempHumidityData, 5.0);
    sensorDataTicker.attach(&sendSensorData, 10.0);
}

void setDeviceId(){
    unsigned long comm[5] = {0,0,0,0,0};
    unsigned long result[5] = {0,0,0,0,0};
    comm[0] = 58;  // read device serial number
    // printf("\r\nSerial number:\r\n");
    iap_entry(comm, result);
    boardData["id"] = "";
    boardData["type"] = "switch_board";
    char tmpbuf[256];
    if (result[0] == 0) {
          sprintf(tmpbuf,"%08X%08X",result[0], result[1]);
          sprintf(tmpbuf,"%08X%08X", result[2], result[3]);
        boardData["id"] = tmpbuf;
        /*
        std::string temp = "";
        for(int i = 1; i < 5; i++) {
           // printf( "0x%x\r\n", result[i] );
            unsigned char *s=(unsigned char *)&result[i];
            char buffer [10];
            sprintf (buffer, "%lu" , result[i] );
            temp = temp + buffer;
        }
        command["id"] = temp;
        */
    } else {
        // printf("Status error!\r\n");
    }
}

void handleDataReceived(char data[256]){
   usbSerial.printf("\nIN handleDataReceived = %s\r\n" ,  data);
    // pc.puts(data);
    // usbSerial.printf("\n");
    // usbSerial.puts(data);
    // broadcastChange(data);
    if(LED==0){
      LED = 1;
    }else{
      LED = 0;
    }
    xbeeLED = 1;
    wait(0.5);
    xbeeLED = 0;
    wait(0.5);
}

// main() runs in its own thread in the OS
int main() {
    wait(5);
    setDeviceId();
    refreshMyStatus();

    readNSaveSensorsData();

    while (true) {
          //  heartbeatLED = 1;
          //  wait(0.5);
          //  heartbeatLED = 0;
          //  wait(0.5);
        // wait(0.2);
        char value[128];
        int index=0;
        char ch;
        int dataSize = 0;
        if(xbeeSerial.readable()){
          do {
            ch = xbeeSerial.getc();   // read it
            // usbSerial.printf("\n\nch is %c \n\r", ch);
            if (index<128)               // just to avoid buffer overflow
               value[index++]=ch;
            dataSize++;
          } while(ch != 'Z');
        };
        value[index]='\x0';  // add un 0 to end the c string
        if(dataSize > 0){
          // usbSerial.printf("\n\nData Size is %d \n\r", dataSize);
          handleDataReceived(value);
        }
    }
}
