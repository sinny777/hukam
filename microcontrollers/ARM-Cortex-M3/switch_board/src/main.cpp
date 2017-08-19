/*
*  Hukam Technologies Switch Board based on LPC1768 IC
*  19 August 2017
*  This program is to handle 10 Digital and 3 Analog SWITCHES
*  It also handles Temperature, Humidity, Light and Current Sensors
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
    Mpr121 touchPad1(&i2c, Mpr121::ADD_VDD);
    Mpr121 touchPad2(&i2c, Mpr121::ADD_VSS);

    Serial xbeeSerial(P0_15, P0_16); // (XBEE TX, RX) (LPC1768 p9, p10)
    Serial analogUNO(P0_10, P0_11); // (p28, p27) (Serial TX, RX)

    DigitalOut heartbeatLED(P0_6);
    DigitalOut xbeeLED(P1_1, 1);

// DIGITAL SWITCHES
DigitalOut DSw1(P2_4);
DigitalOut DSw2(P2_5);
DigitalOut DSw3(P2_6);
DigitalOut DSw4(P2_7);
DigitalOut DSw5(P2_8);
DigitalOut DSw6(P0_21);
DigitalOut DSw7(P0_22);
DigitalOut ASw1(P0_24);
DigitalOut ASw2(P0_25);
DigitalOut ASw3(P0_27);

// RGB LED PINS THAT CAN BE USED
DigitalOut RGB1(P0_4);
DigitalOut RGB2(P0_5);
DigitalOut RGB3(P2_2);
DigitalOut RGB4(P0_7);
DigitalOut RGB5(P0_8);
DigitalOut RGB6(P0_9);
DigitalOut RGB7(P0_17);
DigitalOut RGB8(P0_18);
DigitalOut RGB9(P0_19);
DigitalOut RGB10(P0_20);

DHT tempHumSensor(P0_23, DHT22);
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
    // printf("\nBroadcast Command = %s\r\n" ,  command.c_str());
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
  boardData["ASw3_dval"] = 0;
  boardData["ASw3_aval"] = 0;

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
    command["energy"] = boardData["energy"];
    command["offset"] = boardData["offset"];
    command["temp"] = boardData["temp"];
    command["hum"] = boardData["hum"];
    std::string str = command.serialize();
    broadcastChange(str);
}

void readNSaveSensorsData(){
    tempTicker.attach(&readTempHumidityData, 5.0);
    energyTicker.attach(&readEnergyConsumption, 2.0);
    sensorDataTicker.attach(&sendSensorData, 10.0);
}

/*
string to_string(const bitset<16>& bs){
    return bs.to_string<char, std::char_traits<char>, std::allocator<char> >();
}
*/

void keyPad1Touched(){
    int key_code=0;
    int i=0;
    int value=touchPad1.read(0x00);
    value +=touchPad1.read(0x01)<<8;
    for (i=0; i<12; i++) {
      if (((value>>i)&0x01)==1) key_code=i+1;
    }
    xbeeSerial.printf("TouchPad1 >> Value: %d, Key_code: %d \n", value, key_code);
}

void keyPad2Touched(){
    int key_code=0;
    int i=0;
    int value=touchPad2.read(0x00);
    value +=touchPad2.read(0x01)<<8;
    for (i=0; i<12; i++) {
      if (((value>>i)&0x01)==1) key_code=i+1;
    }
    xbeeSerial.printf("TouchPad2 >> Value: %d, Key_code: %d \n", value, key_code);
}

/*
void switchTouched(){
    // printf("%16s\r\n",to_string(touchUNO).c_str());
    // int8_t key = touchUNO.onkey();
    int key = 0;
    char value[2];
    int index=0;
    char ch;
    do{
       if (touchUNO.readable()){      // if there is an character to read from the device
          ch = touchUNO.getc();   // read it
          if (index<2)               // just to avoid buffer overflow
             value[index++]=ch;  // put it into the value array and increment the index
      }
    } while (ch!='\n');    // loop until the '\n' character
    value[index]='\x0';
    key = atoi(value);

    if(key == 0){
      printf("Do Nothing as Key is %d\r\n", key);
      return;
    }
    int dv;
    int av;
    printf("KEY: %d\r\n", key);
    //int sw=touchUNO.getsingle();
    //if(sw!=0) myleds=sw%16;
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "sb";

    switch(key){
        case 1:
            DSw1 = !DSw1;
            command["index"] = key;
            command["dv"] = DSw1;
            break;
        case 2:
            DSw2 = !DSw2;
            command["index"] = key;
            command["dv"] = DSw2;
            break;
        case 3:
            DSw3 = !DSw3;
            command["index"] = key;
            command["dv"] = DSw3;
            break;
        case 4:
            DSw4 = !DSw4;
            command["index"] = key;
            command["dv"] = DSw4;
            break;
        case 5:
            DSw5 = !DSw5;
            command["index"] = key;
            command["dv"] = DSw5;
            break;
        case 6:
            DSw6 = !DSw6;
            command["index"] = key;
            command["dv"] = DSw6;
            break;
        case 7:
            DSw7 = !DSw7;
            command["index"] = key;
            command["dv"] = DSw7;
            break;
        case 8:
            command["index"] = 8;
            av = boardData["ASw1_aval"].get<int>();
            if(av < 10){
              av = av + 1;
              command["av"] = av;
              boardData["ASw1_aval"] = av;
              ASw1.write(av);
            }else{
              key = 0; // DO NOTHING
            }
            break;
        case 9:
            command["index"] = 8;
            dv = boardData["ASw1_dval"].get<int>();
            if(dv > 0){
              dv = 0;
            }else{
              dv = 1;
            }
            ASw1 = dv;
            command["dv"] = dv;
            boardData["ASw1_dval"] = command["dv"];
            break;
        case 10:
            command["index"] = 8;
            av = boardData["ASw1_aval"].get<int>();
            if(av > 0){
              av = av - 1;
              command["av"] = av;
              boardData["ASw1_aval"] = av;
              ASw1.write(av);
            }else{
              key = 0; // DO NOTHING
            }
            break;
        case 11:
            command["index"] = 9;
            av = boardData["ASw2_aval"].get<int>();
            if(av < 10){
              av = av + 1;
              command["av"] = av;
              boardData["ASw2_aval"] = av;
              ASw2.write(av);
            }else{
              key = 0; // DO NOTHING
            }
            break;
        case 12:
            command["index"] = 9;
            dv = boardData["ASw2_dval"].get<int>();
            if(dv > 0){
              dv = 0;
            }else{
              dv = 1;
            }
            ASw2.write(dv);
            command["dv"] = dv;
            boardData["ASw2_dval"] = command["dv"];
            break;
        case 13:
            command["index"] = 9;
            av = boardData["ASw2_aval"].get<int>();
            if(av > 0){
              av = av - 1;
              command["av"] = av;
              boardData["ASw2_aval"] = av;
              ASw2.write(av);
            }else{
              key = 0; // DO NOTHING
            }
            break;
        case 14:
            command["index"] = 10;
            av = boardData["ASw3_aval"].get<int>();
            if(av < 10){
              av = av + 1;
              command["av"] = av;
              boardData["ASw3_aval"] = av;
              ASw3.write(av);
            }else{
              key = 0; // DO NOTHING
            }
            break;
        case 15:
            command["index"] = 10;
            dv = boardData["ASw3_dval"].get<int>();
            if(dv > 0){
              dv = 0;
            }else{
              dv = 1;
            }
            ASw3 = dv;
            command["dv"] = dv;
            boardData["ASw3_dval"] = command["dv"];
            break;
        case 16:
            command["index"] = 10;
            av = boardData["ASw3_aval"].get<int>();
            if(av > 0){
              av = av - 1;
              command["av"] = av;
              boardData["ASw3_aval"] = av;
              ASw3.write(av);
            }else{
              key = 0; // DO NOTHING
            }
            break;
    }

    if(key > 0){
        std::string str = command.serialize();
        broadcastChange(str);
    }

    wait(0.5);
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

void handleDataReceived(char data[128]){
    // pc.puts(data);
}

// main() runs in its own thread in the OS
int main() {
    wait(5);
    offset = energySensor.calibrate();
    setDeviceId();
    refreshMyStatus();

    touchPad1Interrupt.fall(&keyPad1Touched);
    touchPad1Interrupt.mode(PullUp);

    touchPad2Interrupt.fall(&keyPad2Touched);
    touchPad2Interrupt.mode(PullUp);

    readNSaveSensorsData();

    while (true) {
         heartbeatLED = 1;
         wait(0.5);
         heartbeatLED = 0;
         wait(0.5);

        char value[128];
        int index=0;
        char ch;

        do
        {
           if (xbeeSerial.readable()){      // if there is an character to read from the device
              ch = xbeeSerial.getc();   // read it
              if (index<128)               // just to avoid buffer overflow
                 value[index++]=ch;  // put it into the value array and increment the index
          }
        } while (ch!='\n');    // loop until the '\n' character

        value[index]='\x0';  // add un 0 to end the c string
        handleDataReceived(value);

    }
}
