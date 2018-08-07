#include "mbed.h"
#include "ACS712.h"

Timer t;

AnalogIn sensor(P0_26);

 float zero = 512.0;
 float sensitivity;

ACS712::ACS712(ACS712_type type){

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
	for (int i = 0; i < 50; i++) {
    _zero += readSensor();
		wait_ms(10);
	}
	_zero = _zero / 50;
  _zero = _zero * 10;
	zero = _zero;
	return _zero;
}

void ACS712::setZeroPoint(int _zero) {
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
  /*
  if(zero < 500.0f){
    return 0.0f;
  }else{
    return getCurrentAC(DEFAULT_FREQUENCY);
  }
  */
}

float ACS712::getCurrentAC(unsigned int frequency) {
	unsigned int period = 1000000 / frequency;
	unsigned int Isum = 0, measurements_count = 0;
	int Inow;

  t.start();
	unsigned int t_start = t.read_us();
	while (t.read_us() - t_start < period) {
		Inow = zero - readSensor();
		Isum += Inow*Inow;
		measurements_count++;
	}
	t.stop();

  float Imean = float(Isum / measurements_count);
  float Irms = pow(Imean, 0.5);
	// float currentAc = (Irms / ADC_SCALE) * (VREF / sensitivity);
  // float P = 230.0 * currentAc;
  // printf("Zero: %3.5f, Isum: %d, Count: %d, meanVolt: %3.5f, Volts: %3.7f, P: %3.5f \n", zero, Isum, measurements_count, meanVolt, volts, P);
	// return currentAc;
	   return Irms;
}
