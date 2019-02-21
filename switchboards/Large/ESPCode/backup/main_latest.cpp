/**
 * This file is for ESP32 module on our Large Switchboard that has
 * LPC1768 as our main controller.  ESP is used to connect with WiFi,
 * Bluetooth (BLE), Lora 433MHz
 * @Date: 07 August 2018
 */

#include <Arduino.h>
#include <stdlib.h>
#include <SPI.h>
#include <Wire.h>
#include <LoRa.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "EEPROM.h"

//#include "soc/soc.h"
//#include "soc/rtc_cntl_reg.h"
//void setup(){
//WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detecto

#ifdef __cplusplus
extern "C" {
#endif
uint8_t temprature_sens_read();
#ifdef __cplusplus
}
#endif
uint8_t temprature_sens_read();

HardwareSerial MbedSerial(2);
#define ESP_RX2 16
#define ESP_TX2 17

static int taskCore = 0;
String sensorsData = "";
bool enableLora = true;
bool enableWiFi = false;
bool enableEEPROM = true;
bool enableSensors = false;
unsigned long interval = 1000; // the time we need to wait in milliseconds
unsigned long previousMillis = 0;
unsigned long previousTouchMillis = 0;
String receivedText;
bool loraAvailable = false;
bool eepromAvailable = false;
int wifiTryCount = 0;
int mqttTryCount = 0;
int wifiStatus = WL_IDLE_STATUS;
int hallData = 0;
int boardTemp = 0;
float lightVal = 0.0f;

int EEPROM_SIZE = 64;

#define BAND    433E6
#define SCK  5
#define MISO  19
#define MOSI  27
#define CS  18

#define SS  18
#define RST     14
#define DI0     26
// -----------------

#define HEARTBEAT_LED  32
bool hbLedState = false;

#define ORG "rqeofj"
#define BOARD_TYPE "HB_ESP32"
#define TOKEN "1SatnamW"

char server[] = ORG ".messaging.internetofthings.ibmcloud.com";
char topic[] = "iot-2/evt/espboard/fmt/json";
char authMethod[] = "use-token-auth";
char token[] = "P@ssw0rd"; // Auth token of Device registered on Watson IoT Platform

String BOARD_ID;
WiFiClient wifiClient;
PubSubClient client(server, 1883, NULL, wifiClient);

const char* ssid = "GurvinderNet";
const char* password =  "1SatnamW";

/**
 * Connect to a given WiFi Network
 */
static void connectWiFi(){
  while(wifiStatus != WL_CONNECTED && wifiTryCount < 5){
        Serial.print("Attempting to connect to WEP network, SSID: ");
        Serial.println(ssid);
        wifiStatus = WiFi.begin(ssid, password);
        wifiTryCount++;
        delay(10000);
  }

  wifiTryCount = 0;

  if(wifiStatus == WL_CONNECTED){
    Serial.println("WiFi Connected..");
  }else{
    Serial.println("Failed to Connect WiFi");
  }
}

/**
 * Connect to MQTT Server
 */
static void connectMQTT() {
  // Serial.print("IN connecting MQTT client...");
  if(BOARD_ID == ""){
    char chipid[20];
    sprintf(chipid, "%" PRIu64, ESP.getEfuseMac());
    BOARD_ID = "HB_"+String(chipid);
  }
 String clientId = "d:" ORG ":" BOARD_TYPE ":" +BOARD_ID;
 if (!!!client.connected()) {
   Serial.print("Reconnecting MQTT client to ");
   Serial.println(server);
   while (!!!client.connect((char*) clientId.c_str(), authMethod, token)) {
     Serial.print("Connecting: ");
     Serial.println(BOARD_ID);
     delay(500);
   }
   // Serial.println();
 }
 Serial.print("MQTT Connected...");
}

/**
 * Get all sensors data and save it in a variable
 */
static void getSensorsData(){
    hallData = hallRead();
    boardTemp = (temprature_sens_read() - 32) / 1.8;
    sensorsData = "{\"type\":\"" BOARD_TYPE "\", \"uniqueId\":\"" +BOARD_ID+ "\", \"d\": {\"type\":\"" BOARD_TYPE "\", \"uniqueId\":\"" +BOARD_ID+ "\", \"BOARD_TEMP\":" +String(boardTemp)+", \"HALL_DATA\":" +String(hallData)+"}}";
}


void publishData(String data){
  Serial.print("Publish data:>> ");
  Serial.println(data);
     /*
   if (client.publish(topic, (char*) payload.c_str())) {
       // Serial.print("Published payload: ");
       // Serial.println(payload);
     } else {
       // Serial.println("Publish failed: ");
       // Serial.println(payload);
     }
  */

  if(loraAvailable){
        LoRa.beginPacket();
        LoRa.print(data);
        LoRa.print("\n");
        LoRa.endPacket();
//        LoRa.receive();
        delay(1);
        LoRa.flush();
    }else{
       Serial.print("Lora Not Working: >> ");
       Serial.println(data);
    }
}

void checkDataOnLora(){
    // try to parse packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    while (LoRa.available()) {
      receivedText = (char)LoRa.read();
      Serial.print(receivedText);
    }

    // print RSSI of packet
    // Serial.print("' with RSSI ");
    // Serial.println(LoRa.packetRssi());
  }
}

// the setup function runs once when you press reset or power the board
void setup() {
  delay(1000);

  pinMode(HEARTBEAT_LED, OUTPUT);

  // Init Lora
  if(enableLora){
      SPI.begin(SCK, MISO, MOSI, CS);
      LoRa.setPins(SS, RST, DI0);
      delay(1000);
  }
  Serial.begin(115200);
  while (!Serial);
  delay(1000);

  MbedSerial.begin(115200, SERIAL_8N1, ESP_RX2, ESP_TX2);

  char chipid[20];
  sprintf(chipid, "%" PRIu64, ESP.getEfuseMac());
  BOARD_ID = "HB_"+String(chipid);
  // Serial.println(BOARD_ID);
  delay(100);

if(enableEEPROM){
    int eepromTryCount = 0;
    do{
      eepromAvailable = EEPROM.begin(EEPROM_SIZE);
      eepromTryCount++;
      if(!eepromAvailable){
        Serial.printf("Failed to initialise EEPROM, Try Count: %d\n", eepromTryCount);
        delay(2000);
      }else{
        Serial.println("EEPROM Initialized Successfully...");
      }
    }while(!eepromAvailable && eepromTryCount > 3);
}

  // Serial.println("LoRa Initializing...");
  if(enableLora){
      int loraTryCount = 0;
      do{
        loraAvailable = LoRa.begin(BAND);
        loraTryCount++;
        if(!loraAvailable){
          Serial.printf("Starting LoRa failed!, Try Count: %d\n", loraTryCount);
          delay(3000);
        }else{
          Serial.println("LoRa Initialized Successfully...");
        }
      }while(!loraAvailable && loraTryCount < 3);
  }


  if(enableWiFi){
        // Set WiFi to station mode and disconnect from an AP if it was previously connected
  //      WiFi.mode(WIFI_STA);
  //      WiFi.disconnect();
        delay(100);

  //      scanWiFi();
        connectWiFi();
         if(wifiStatus == WL_CONNECTED){
            connectMQTT();
         }
  }


}

  // the loop function runs over and over again forever
  void loop() {
    unsigned long currentMillis = millis();
      checkDataOnLora();
      String payloadStr = "";
      while (MbedSerial.available() > 0) {
//        sprintf(tmpBuf, "%s", char(MbedSerial.read()));
          payloadStr += char(MbedSerial.read());
      }
      if(payloadStr != ""){
        publishData(payloadStr);
      }

      if ((unsigned long)(currentMillis - previousMillis) >= (interval)) {
           hbLedState = !hbLedState;
           if(hbLedState){
              digitalWrite(HEARTBEAT_LED, 1);
           }else{
              digitalWrite(HEARTBEAT_LED, 0);
           }
           previousMillis =  millis();
      }

  }
