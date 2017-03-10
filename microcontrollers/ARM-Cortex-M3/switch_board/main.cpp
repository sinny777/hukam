#include "mbed.h"
#include "TTP229.h"
#include "MbedJSONValue.h"
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
    TTP229 touchpad(p9, p10); // For Connecting Capacitive Touchpad using I2C
    Serial xbeeSerial(p13, p14);
    Serial pc(USBTX, USBRX);//Opens up serial communication through the USB port via the computer

// LED LIGHTS ON BOARD
    DigitalOut heartbeatLED(LED1, 0); // LED1
    DigitalOut xbeeLED(LED2); // LED2
    DigitalOut sensorLED(LED3); // LED3
    DigitalOut led4(LED4); // LED4

// DIGITAL SWITCHES
    DigitalOut DSw1(p5);
    DigitalOut DSw2(p6);
    DigitalOut DSw3(p7);
    DigitalOut DSw4(p8);
    DigitalOut DSw5(p11);
    DigitalOut DSw6(p12);
    DigitalOut DSw7(p15);

// ANALOG SWITCHES

    PwmOut ASw1(p21);  // Connect Potentiometer (Trimpot 10K with Knob)
    PwmOut ASw2(p22);  // Connect Potentiometer (Trimpot 10K with Knob)
    PwmOut ASw3(p23);  // Connect Potentiometer (Trimpot 10K with Knob)

    AnalogIn temHumSensor(p19);
    AnalogIn energySensor(p20);

// RGB LED PINS THAT CAN BE USED

    DigitalOut DSw1Led(p16);
    DigitalOut DSw2Led(p17);
    DigitalOut DSw3Led(p18);
    DigitalOut DSw4Led(p24);
    DigitalOut DSw5Led(p25);
    DigitalOut DSw6Led(p26);
    DigitalOut DSw7Led(p27);
    DigitalOut ASw1Led(p28);
    DigitalOut ASw2Led(p29);
    DigitalOut ASw3Led(p30);

void broadcastChange(std::string command){
    command = command + "\n";
    printf("\nBroadcast = %s\r\n" ,  command.c_str());
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

  boardData["temp"] = 0.00;
  boardData["hum"] = 0.00;
  boardData["energy"] = 0.00;

  MbedJSONValue command;
  command["id"] = boardData["id"];
  command["type"] = "status";
  std::string str = command.serialize();
  broadcastChange(str);
  //  printf("Ask Gateway to refresh board status for all switches\n\n");
}

void readTempHumidityData(){
    boardData["temp"] = boardData["temp"].get<double>() + 0.11;
    boardData["hum"] = boardData["hum"].get<double>() + 0.23;
    sensorLED = 1;
    wait_ms(2);
    sensorLED = 0;
}

void readEnergyConsumption(){
    boardData["energy"] = boardData["energy"].get<double>() + 0.31;
}

void sendSensorData(){
    MbedJSONValue command;
    command["id"] = boardData["id"];
    command["energy"] = boardData["energy"];
    command["temp"] = boardData["temp"];
    command["hum"] = boardData["hum"];
    std::string str = command.serialize();
    broadcastChange(str);
    // boardData["energy"] = 0.00;
    // boardData["temp"] = 0.00;
    // boardData["hum"] = 0.00;
}

void readNSaveSensorsData(){
    tempTicker.attach(&readTempHumidityData, 15.0);
    energyTicker.attach(&readEnergyConsumption, 1.0);
    sensorDataTicker.attach(&sendSensorData, 5.0);
}

void switchTouched(){
//    printf("%16s\r\n",to_string(touchpad).c_str());
    int8_t key = touchpad.onkey();
    int dv;
    int av;
    // printf("%d\r\n", key);
    //int sw=touchpad.getsingle();
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
              // ASw1.write(av);
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
            // ASw1 = dv;
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
              // ASw1.write(av);
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
              // ASw2.write(av);
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
            // ASw2.write(dv);
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
              // ASw2.write(av);
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
              // ASw3.write(av);
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
            // ASw3 = dv;
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
              // ASw3.write(av);
            }else{
              key = 0; // DO NOTHING
            }
            break;
    }

    if(key > 0){
        std::string str = command.serialize();
        broadcastChange(str);
    }
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

// main() runs in its own thread in the OS
int main() {
    setDeviceId();
    refreshMyStatus();
    readNSaveSensorsData();
    touchpad.attach(&switchTouched);

    while (true) {
        heartbeatLED = 1;
        wait(0.5);
        heartbeatLED = 0;
        wait(0.5);

        if (pc.readable()) {//Checking for serial comminication
            xbeeSerial.putc(pc.getc()); //XBee write whatever the PC is sending
        }
        if(xbeeSerial.readable()){
            pc.putc(xbeeSerial.getc());
        }

    }
}
