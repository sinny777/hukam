#include "TTP229.h"

TTP229::TTP229(PinName sdopin, PinName sclpin) : sdo(sdopin), sdoInt(sdopin), scl(sclpin)
{
    scl=1;
    sdoInt.fall(this, &TTP229::interrupt);
}

void TTP229::interrupt()
{
    sdoInt.disable_irq();
    swnum=0;
    while(!sdo) {}
    wait_us(10);
    for(int i=0; i<16; i++) {
        scl=0;
        wait_us(2);
        if((sw[i]=!sdo)==true) swnum=i+1;
        scl=1;
        wait_us(2);
    }
    callback();
    sdoInt.enable_irq();
}
