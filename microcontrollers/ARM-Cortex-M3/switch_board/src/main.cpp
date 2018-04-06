#include "mbed.h"
#include "TTP229.h"

Serial usbSerial(P0_2, P0_3);

//DigitalOut myled(LED1);
//DigitalOut myled2(LED2);
//DigitalOut myled3(LED3);
BusOut myleds(LED1, LED2, LED3, LED4);

TTP229 touchpad(p22,p21);

string to_string(const bitset<16>& bs){
    return bs.to_string<char, std::char_traits<char>, std::allocator<char> >();
}

void ttp229int(){
    // printf("%16s\r\n",to_string(touchpad).c_str());
    printf("%d\r\n",touchpad.onkey());
    //int sw=touchpad.getsingle();
    //if(sw!=0) myleds=sw%16;
}

int main(){
    usbSerial.baud(115200);
    usbSerial.printf("Hello TTP229\r\n");
    touchpad.attach(&ttp229int);
    while(1) {
        for(int i=0; i<4; i++) {
            myleds[i]=touchpad[(i+1)*4-1];
        }
        wait(0.5);
    }
}
