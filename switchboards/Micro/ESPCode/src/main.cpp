// Default Arduino includes
#include <Arduino.h>
#include <nvs.h>
#include <nvs_flash.h>
#include <ArduinoJson.h>

#include <stdlib.h>
#include <SPI.h>
#include <LoRa.h>
#include <Preferences.h>

#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define BOARD_TYPE "HB_SENSOR"

#define BAND    433E6
#define SCK     5
#define MISO    19
#define MOSI    27
#define CS      18

#define SS      18
#define RST     14
#define DI0     26

#ifdef __cplusplus
extern "C" {
#endif
uint8_t temprature_sens_read();
#ifdef __cplusplus
}
#endif
uint8_t temprature_sens_read();

int hallData = 0;
int boardTemp = 0;

// static int taskCore = 0;
bool radioAvailable = false;
bool enableRadio = true;
bool bmeAvailable = false;
bool enableSensors = true;

unsigned long interval = 5; // the time we need to wait
unsigned long previousMillis = 0;
unsigned long previousTouchMillis = 0;

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME280 bme; // I2C
//Adafruit_BME280 bme(BME_CS); // hardware SPI
//Adafruit_BME280 bme(BME_CS, BME_MOSI, BME_MISO, BME_SCK); // software SPI

unsigned long delayTime;

/** Build time */
const char compileDate[] = __DATE__ " " __TIME__;

/** Unique device name */
char apName[] = "HB_SENSOR-xxxxxxxxxxxx";

// #define HEARTBEAT_LED  32
#define HEARTBEAT_LED  25

bool hbLedState = LOW; // Heartbeat LED state

String BOARD_ID;

char* string2char(String str){
    if(str.length()!=0){
        char *p = const_cast<char*>(str.c_str());
        return p;
    }
}

/**
 * Create unique device name from MAC address
 **/
void createName() {
	uint8_t baseMac[6];
	// Get MAC address for WiFi station
	esp_read_mac(baseMac, ESP_MAC_WIFI_STA);
	// Write unique name into apName
	sprintf(apName, "SB_MICRO-%02X%02X%02X%02X%02X%02X", baseMac[0], baseMac[1], baseMac[2], baseMac[3], baseMac[4], baseMac[5]);

  BOARD_ID = String(apName);
  // pub_topic = PUBSUB_PREFIX + BOARD_ID +"/evt/cloud/fmt/json";
  // sub_topic = PUBSUB_PREFIX + BOARD_ID +"/cmd/device/fmt/json";
  // strcat(sub_topic, BOARD_ID.c_str() );
  // strcat(pub_topic, BOARD_ID.c_str() );
}

void initRadio(){
  if(enableRadio){
      int radioTryCount = 0;
      do{
        radioAvailable = LoRa.begin(BAND);
        radioTryCount++;
        if(!radioAvailable){
          Serial.printf("Starting Radio failed!, Try Count: %d\n", radioTryCount);
          delay(3000);
        }else{
          Serial.println("Radio Initialized Successfully...");
        }
      }while(!radioAvailable && radioTryCount < 3);
  }
}

void publishData(String data){
   bool published = false;

   if(radioAvailable){
       LoRa.beginPacket();
//        LoRa.write(destination);              // add destination address
//        LoRa.write(localAddress);
       LoRa.print(data);
       LoRa.print("\n");
       LoRa.endPacket();
//        LoRa.receive();
       delay(1);
       LoRa.flush();
       published = true;
       Serial.print("Published payload to Radio:>> ");
       Serial.println(data);
   }else{
      Serial.print("Radio Not Available: >> ");
   }

}

void checkDataOnRadio(){
  String receivedText;
  // try to parse packet
    int packetSize = LoRa.parsePacket();
    if (packetSize) {
        // received a packet
        // Serial.print("Received packet '");
        // read packet
        while (LoRa.available()) {
          receivedText = (char)LoRa.read();
          Serial.print(receivedText);
        }
        // print RSSI of packet
        Serial.print("' with RSSI ");
        Serial.println(LoRa.packetRssi());        
    }
}

void fetchNPublishSensorsData(){
  Preferences preferences;

  float temperature, humidity, pressure, altitude;
  temperature = bme.readTemperature();
  humidity = bme.readHumidity();
  pressure = bme.readPressure() / 100.0F;
  altitude = bme.readAltitude(SEALEVELPRESSURE_HPA);

  // String payload = "{\"type\":\"" BOARD_TYPE "\", \"uniqueId\":\"" +BOARD_ID+"\", \"deviceIndex\":1, \"deviceValue\": " +String(sw1Val)+"}";
  String payload;
  StaticJsonBuffer<200> dataJsonBuffer;
  JsonObject& jsonOut = dataJsonBuffer.createObject();
  jsonOut["type"] = BOARD_TYPE;
  jsonOut["uniqueId"] = BOARD_ID;
  jsonOut["temp"] = temperature;
  jsonOut["hum"] = humidity;
  jsonOut["press"] = pressure;
  jsonOut["alt"] = altitude;
  // Convert JSON object into a string
  jsonOut.printTo(payload);
  publishData(payload);
  dataJsonBuffer.clear();
}

void initSensors(){
  if(enableSensors){
      int bmeTryCount = 0;
      do{
        bmeAvailable = bme.begin(0x76);  
        bmeTryCount++;
        if(!bmeAvailable){
          Serial.printf("BME Sensor failed!, Try Count: %d\n", bmeTryCount);
          delay(3000);
        }else{
          Serial.println("BME Sensor Initialized Successfully...");
        }
      }while(!bmeAvailable && bmeTryCount < 3);
  }
}

void initDevice(){
	// Create unique device name
	createName();
  initRadio();
  initSensors();	
}


/**
 * Device Setup
 */
void setup() {
  delay(500);
	// Send some device info
	Serial.print("Build: ");
	Serial.println(compileDate);

  pinMode(HEARTBEAT_LED, OUTPUT);
  
  // Init Lora
  if(enableRadio){
      SPI.begin(SCK, MISO, MOSI, CS);
      LoRa.setPins(SS, RST, DI0);
      delay(1000);
  }

  Serial.begin(115200);
  while (!Serial);
  delay(1000);

	initDevice();

}

/**
 * Logic that runs in Loop
 */
void loop() {
	unsigned long currentMillis = millis();
    checkDataOnRadio();
    if ((unsigned long)(currentMillis - previousMillis) >= (interval * 1000)) {
      fetchNPublishSensorsData();
      previousMillis =  millis();
    }

}
