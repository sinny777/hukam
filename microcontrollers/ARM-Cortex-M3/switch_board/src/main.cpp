/*
*  This program is for ExploreEmbedded LPC1768 board
*
*
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

MbedJSONValue boardData;

Ticker tempTicker;
Ticker energyTicker;
Ticker sensorDataTicker;

//MODULES COMMUNICATION

    Serial pc(P0_2, P0_3); // (USBTX, USBRX) Opens up serial communication through the USB port via the computer
    Serial xbeeSerial(P0_0, P0_1); // (XBEE TX, RX) (LPC1768 p9, p10)
    Serial analogUNO(P0_10, P0_11); // (p28, p27) (Serial TX, RX)

// LED LIGHTS ON EXPLORE EMBEDDED BOARD LPC1768
/*
    DigitalOut heartbeatLED(P1_18); // LED1
    DigitalOut xbeeLED(P1_20); // LED2
    DigitalOut sensorLED(P1_21); // LED3
*/

// UNCOMENT FOR LPC1768 MBED BOARD.  MODIFY THE PINS
    DigitalOut heartbeatLED(P2_0); // LED1
    DigitalOut xbeeLED(P2_1); // LED2
    DigitalOut sensorLED(P2_2); // LED3
    DigitalOut led4(P2_3); // LED4

// INPUTS FOR PUSH BUTTONS
  DigitalIn DSwIn1(P1_13);
  DigitalIn DSwIn2(P1_14);
  DigitalIn DSwIn3(P1_15);
  DigitalIn DSwIn4(P1_16);
  DigitalIn DSwIn5(P1_17);
  DigitalIn DSwIn6(P1_18);
  DigitalIn DSwIn7(P1_19);
  DigitalIn DSwIn8(P1_20);
  DigitalIn DSwIn9(P1_21);
  DigitalIn DSwIn10(P1_22);
  DigitalIn DSwIn11(P1_23);
  DigitalIn DSwIn12(P1_24);
  DigitalIn DSwIn13(P1_25);
  DigitalIn DSwIn14(P1_26);
  DigitalIn DSwIn15(P1_27);
  DigitalIn DSwIn16(P1_28);

// OUTPUT TO RELAYS
    DigitalOut DSwO1(P2_4);
    DigitalOut DSwO2(P2_5);
    DigitalOut DSwO3(P2_6);
    DigitalOut DSwO4(P2_7);
    DigitalOut DSwO5(P2_8);
    DigitalOut DSwO6(P2_9);
    DigitalOut DSwO7(P0_10);
    DigitalOut DSwO8(P0_11);
    DigitalOut DSwO9(P0_15);
    DigitalOut DSwO10(P0_16);

// OUTPUT FOR RGB LEDs (FOR LOCK)
    // DigitalOut RGB1(P0_0);
    // DigitalOut RGB2(P0_1);
    // DigitalOut RGB3(P0_2);
    // DigitalOut RGB4(P0_3);
    DigitalOut RGB5(P0_4);
    DigitalOut RGB6(P0_5);
    DigitalOut RGB7(P0_6);
    DigitalOut RGB8(P0_7);
    DigitalOut RGB9(P0_8);
    DigitalOut RGB10(P0_9);

    DHT tempHumSensor(P0_23, DHT11);
    ACS712 energySensor(ACS712_30A);
    // AnalogIn energySensor(P0_24);

  void readEnergyConsumption(){
    float U = 220;
    float I = energySensor.getCurrentAC();
    float P = U * I;
    // UNCOMMENT TO CHECK ENERGY CONSUMPTOIN EVERY SECOND
    // printf("Energy Consumption: %3.7f and Current usage: %3.7f\n\n", P, I);
    boardData["energy"] = P;
    sensorLED = 1;
    wait(1);
  }

void broadcastChange(std::string command){
    command = command + "\n";
    printf("\nBroadcast Command = %s\r\n" ,  command.c_str());
    xbeeSerial.puts(command.c_str());
    xbeeLED = 1;
    wait(0.5);
    xbeeLED = 0;
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

    sensorLED = 1;

}

void sendSensorData(){
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["energy"] = boardData["energy"];
    command["temp"] = boardData["temp"];
    command["hum"] = boardData["hum"];
    std::string str = command.serialize();
    broadcastChange(str);
}

void readNSaveSensorsData(){
    tempTicker.attach(&readTempHumidityData, 5.0);
    energyTicker.attach(&readEnergyConsumption, 1.0);
    sensorDataTicker.attach(&sendSensorData, 5.0);
}

/*
string to_string(const bitset<16>& bs){
    return bs.to_string<char, std::char_traits<char>, std::allocator<char> >();
}
*/

void checkSwitches(){
    // printf("%16s\r\n",to_string(touchUNO).c_str());
    // int8_t key = touchUNO.onkey();
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["type"] = "sb";
    int changed = 0;
    if(DSwIn1){
        DSwO1 = !DSwO1;
        command["index"] = 1;
        command["dv"] = DSwIn1;
        changed = 1;
    }
    if(DSwIn2){
        DSwO2 = !DSwO2;
        command["index"] = 2;
        command["dv"] = DSwIn2;
        changed = 2;
    }
    if(DSwIn3){
        DSwO3 = !DSwO3;
        command["index"] = 3;
        command["dv"] = DSwIn3;
        changed = 3;
    }
    if(DSwIn4){
        DSwO4 = !DSwO4;
        command["index"] = 4;
        command["dv"] = DSwIn4;
        changed = 4;
    }
    if(DSwIn5){
        DSwO5 = !DSwO5;
        command["index"] = 5;
        command["dv"] = DSwIn5;
        changed = 5;
    }
    if(DSwIn6){
        DSwO6 = !DSwO6;
        command["index"] = 6;
        command["dv"] = DSwIn6;
        changed = 6;
    }
    if(DSwIn7){
        DSwO7 = !DSwO7;
        command["index"] = 7;
        command["dv"] = DSwIn7;
        changed = 7;
    }
    if(DSwIn8){
        DSwO8 = !DSwO8;
        command["index"] = 8;
        command["dv"] = DSwIn8;
        changed = 8;
    }
    if(DSwIn9){
        DSwO9 = !DSwO9;
        command["index"] = 9;
        command["dv"] = DSwIn9;
        changed = 9;
    }
    if(DSwIn10){
        DSwO10 = !DSwO10;
        command["index"] = 10;
        command["dv"] = DSwIn10;
        changed = 10;
    }

    //TODO: Analog Switch implementation

    if(changed > 0){
        std::string str = command.serialize();
        broadcastChange(str);
    }

    wait(0.5);

}

void setDeviceId(){
    unsigned long comm[5] = {0,0,0,0,0};
    unsigned long result[5] = {0,0,0,0,0};
    comm[0] = 58;  // read device serial number
    printf("\r\nSerial number:\r\n");
    iap_entry(comm, result);
    boardData["id"] = "";
    char tmpbuf[256];
    if (result[0] == 0) {
        printf("\nSerial Number: ");
        sprintf(tmpbuf,"%08X%08X",result[0], result[1]);
        printf(tmpbuf);
        sprintf(tmpbuf,"%08X%08X", result[2], result[3]);
        printf(tmpbuf);
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
        printf("Status error!\r\n");
    }
}

void handleDataReceived(char data[128]){
  // TODO: Action from Internet
    pc.puts(data);
}

// main() runs in its own thread in the OS
int main() {
    setDeviceId();
    refreshMyStatus();
    wait(5);
    readNSaveSensorsData();

    energySensor.calibrate();

    while (true) {
        // heartbeatLED = 1;
        // wait(0.5);
        // heartbeatLED = 0;
        // wait(0.5);
        sensorLED = 0;
        checkSwitches();
        if (pc.readable()) {//Checking for serial comminication
            xbeeSerial.putc(pc.getc()); //XBee write whatever the PC is sending
        }

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
