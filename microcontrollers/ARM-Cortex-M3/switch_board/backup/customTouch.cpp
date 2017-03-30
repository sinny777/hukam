#include "mbed.h"

DigitalOut led(LED1);
DigitalInOut touch(P0_11);       // Connect a wire to P0_11
Ticker tick;

uint8_t touch_data = 0;         // data pool

void detect(void)
{
    uint8_t count = 0;
    touch.input();              // discharge the capacitor
    while (touch.read()) {
        count++;
        if (count > 4) {
            break;
        }
    }
    touch.output();
    touch.write(1);             // charge the capacitor

    if (count > 2) {
        touch_data = (touch_data << 1) + 1;
    } else {
        touch_data = (touch_data << 1);
    }

    if (touch_data == 0x01) {
        led = 1;                // touch
    } else if (touch_data == 0x80) {
        led = 0;                // release
    }
}

int main()
{
    touch.mode(PullDown);
    touch.output();
    touch.write(1);

    tick.attach(detect, 1.0 / 64.0);

    while(1) {
        // do something
    }
}
