#include "mbed.h"
#include "TTP229.h"
#include "MbedJSONValue.h"
#include <string>

using namespace std;

#define IAP_LOCATION 0x1FFF1FF1
typedef void (*IAP)(unsigned long [], unsigned long[] );
IAP iap_entry = (IAP) IAP_LOCATION;

MbedJSONValue command;
Ticker tempTicker;
Ticker energyTicker;

    TTP229 touchpad(p9, p10); // For Connecting Capacitive Touchpad using I2C
    Serial xbeeSerial(p13, p14);
    Serial pc(USBTX, USBRX);//Opens up serial communication through the USB port via the computer

    DigitalOut heartbeatLED(LED1, 0); // LED1
    DigitalOut xbeeLED(LED2); // LED2
    DigitalOut sensorLED(LED3); // LED3
    DigitalOut led4(LED4); // LED4

    DigitalOut DSw1(p5);
    DigitalOut DSw2(p6);
    DigitalOut DSw3(p7);
    DigitalOut DSw4(p8);
    DigitalOut DSw5(p11);
    DigitalOut DSw6(p12);
    DigitalOut DSw7(p15);
    DigitalOut DSw8(p16);
    DigitalOut ASw1P(p17);
    DigitalOut ASw1(p18);
    DigitalOut ASw1M(p19);
    DigitalOut ASw2P(p20);
    DigitalOut ASw2(p21);
    DigitalOut ASw2M(p22);
    DigitalOut ASw3P(p23);
    DigitalOut ASw3(p24);
    DigitalOut ASw3M(p25);

    DigitalOut p26Led(p26);
    DigitalOut p27Led(p27);
    DigitalOut p28Led(p28);
    DigitalOut p29Led(p29);
    DigitalOut p30Led(p30);

void broadcastChange(std::string command){
    command = command + "\n";
    printf("Broadcast = %s\r\n" ,  command.c_str());
    xbeeSerial.puts(command.c_str());
    xbeeLED = 1;
    wait(0.5);
    xbeeLED = 0;
}

void refreshMyStatus(){
  //  printf("Ask Gateway to refresh board status for all switches\n\n");
}

void readTempHumidityData(){
    command["temp"] = 25.1;
    command["hum"] = 45.7;
    sensorLED = 1;
    wait_ms(2);
    sensorLED = 0;
}

void readEnergyConsumption(){
    command["energy"] = 2.3;
}

void readNSaveSensorsData(){
    tempTicker.attach(&readTempHumidityData, 5.0);
    energyTicker.attach(&readEnergyConsumption, 1.0);
}

void switchTouched(){
//    printf("%16s\r\n",to_string(touchpad).c_str());
    int8_t key = touchpad.onkey();
    // printf("%d\r\n", key);
    //int sw=touchpad.getsingle();
    //if(sw!=0) myleds=sw%16;
    command["type"] = "sb";
    command["index"] = key;
    switch(key){
        case 1:
            DSw1 = !DSw1;
            command["dv"] = DSw1;
            break;
        case 2:
            DSw2 = !DSw2;
            command["dv"] = DSw2;
            break;
        case 3:
            DSw3 = !DSw3;
            command["dv"] = DSw3;
            break;
        case 4:
            DSw4 = !DSw4;
            command["dv"] = DSw4;
            break;
        case 5:
            DSw5 = !DSw5;
            command["dv"] = DSw5;
            break;
        case 6:
            DSw6 = !DSw6;
            command["dv"] = DSw6;
            break;
        case 7:
            DSw7 = !DSw7;
            command["dv"] = DSw7;
            break;
        case 8:
            ASw1P = !ASw1P;
            command["dv"] = ASw1P;
            break;
        case 9:
            ASw1 = !ASw1;
            command["dv"] = ASw1;
            break;
        case 10:
            ASw1M = !ASw1M;
            command["dv"] = ASw1M;
            break;
        case 11:
            ASw2P = !ASw2P;
            command["dv"] = ASw2P;
            break;
        case 12:
            ASw2 = !ASw2;
            command["dv"] = ASw2;
            break;
        case 13:
            ASw2M = !ASw2M;
            command["dv"] = ASw2M;
            break;
        case 14:
            ASw3P = !ASw3P;
            command["dv"] = ASw3P;
            break;
        case 15:
            ASw3 = !ASw3;
            command["dv"] = ASw3;
            break;
        case 16:
            ASw3M = !ASw3M;
            command["dv"] = ASw3M;
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
    command["id"] = "";
    char tmpbuf[256];
    if (result[0] == 0) {
        printf("\nSerial Number: ");
        sprintf(tmpbuf,"%08X%08X",result[0], result[1]);
        printf(tmpbuf);
        sprintf(tmpbuf,"%08X%08X", result[2], result[3]);
        printf(tmpbuf);
        command["id"] = tmpbuf;
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
