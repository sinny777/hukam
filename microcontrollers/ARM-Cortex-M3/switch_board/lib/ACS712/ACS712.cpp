#include "mbed.h"
#include "ACS712.h"

Timer t;

AnalogIn sensor(P0_26);

 float zero = 512.0;
 float sensitivity;

ACS712::ACS712(ACS712_type type) {
	switch (type) {
		case ACS712_05B:
			sensitivity = 0.185;
			break;
		case ACS712_20A:
			sensitivity = 0.100;
			break;
		case ACS712_30A:
			sensitivity = 0.066;
			break;
		default:
			sensitivity = 0.066;
			break;
	}

}

float readSensor(){
		return sensor.read() * 1000;
}

int ACS712::calibrate() {
	int _zero = 0;
	for (int i = 0; i < 10; i++) {
		_zero += readSensor();
		wait_ms(10);
	}
	_zero /= 10;
	zero = _zero;
	printf("Zero: %3.5f \t", zero);
	return _zero;
}

void setZeroPoint(int _zero) {
	zero = _zero;
}

void ACS712::setSensitivity(float sens) {
	sensitivity = sens;
}

float ACS712::getCurrentDC() {
	float I = (zero - readSensor()) / ADC_SCALE * VREF / sensitivity;
	return I;
}

float ACS712::getCurrentAC() {
	return getCurrentAC(DEFAULT_FREQUENCY);
}

float ACS712::getCurrentAC(unsigned int frequency) {
	unsigned int period = 1000000 / frequency;
	t.start();
	unsigned int t_start = t.read_us();
	unsigned int Isum = 0, measurements_count = 0;
	int Inow;

	while (t.read_us() - t_start < period) {
		Inow = zero - readSensor();
		Isum += Inow*Inow;
		measurements_count++;
	}
	t.stop();
	float Irms = pow((Isum / measurements_count), 0.5) / ADC_SCALE * VREF / sensitivity;
	return Irms;
}
