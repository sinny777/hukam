// Default Arduino includes
#include <Arduino.h>
#include <nvs.h>
#include <nvs_flash.h>
#include <ArduinoJson.h>

#include <stdlib.h>
#include <SPI.h>
#include <LoRa.h>
#include <Preferences.h>

#define BOARD_TYPE "SB_MICRO"

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

unsigned long interval = 5; // the time we need to wait
unsigned long previousMillis = 0;
unsigned long previousTouchMillis = 0;

/** Build time */
const char compileDate[] = __DATE__ " " __TIME__;

/** Unique device name */
char apName[] = "HB_SENSOR-xxxxxxxxxxxx";

// #define HEARTBEAT_LED  32
#define HEARTBEAT_LED  25
// #define WIFI_LED  32
// #define BLE_LED  33
#define touch1 4 // Pin for capactitive touch sensor
#define touch2 2 // Pin for capactitive touch sensor
#define touch3 13 // Pin for capactitive touch sensor
#define touch4 15 // Pin for capactitive touch sensor

bool hbLedState = LOW; // Heartbeat LED state

int SW1 = 17;
int SW2 = 16;
int SW3 = 22;
int SW4 = 23;

int sw1Val = 1;
int sw2Val = 1;
int sw3Val = 1;
int sw4Val = 1;

boolean lastState1 = LOW;
boolean lastState2 = LOW;
boolean lastState3 = LOW;
boolean lastState4 = LOW;


String BOARD_ID;

char* string2char(String str){
    if(str.length()!=0){
        char *p = const_cast<char*>(str.c_str());
        return p;
    }
}

void handleSwitchAction(String payload){
  StaticJsonBuffer<200> payloadBuffer;
  JsonObject& jsonData = payloadBuffer.parseObject(payload);
  // Serial.print(" >>> type: ");
  // Serial.print(jsonData["type"].as<String>());
  // Serial.print(", uniqueId: ");
  // Serial.print(jsonData["uniqueId"].as<String>());
  // Serial.print(", deviceIndex: ");
  // Serial.print(jsonData["deviceIndex"].as<int>());
  // Serial.print(", deviceValue: ");
  // Serial.println(jsonData["deviceValue"].as<int>());

  if(jsonData["type"].as<String>() == BOARD_TYPE && jsonData["uniqueId"].as<String>() == BOARD_ID){
    Serial.println("<<<< SWITCH ACTION ON BOARD MATCHES >>>>");
    int deviceIndex = jsonData["deviceIndex"].as<int>();
    int deviceValue = jsonData["deviceValue"].as<int>();

    int deviceAction = 1;
    if(deviceValue == 1){
      deviceAction = 0;
    }

    switch (deviceIndex) {
      case 1:
          digitalWrite(SW1, deviceAction);
          sw1Val = deviceAction;
        break;
      case 2:
          digitalWrite(SW2, deviceAction);
          sw2Val = deviceAction;
        break;
      case 3:
          digitalWrite(SW3, deviceAction);
          sw3Val = deviceAction;
        break;
      case 4:
          digitalWrite(SW4, deviceAction);
          sw4Val = deviceAction;
        break;
      default:
        Serial.println("Device index not matched .... ");
      }
   }
   payloadBuffer.clear();
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



void initSwitches(){
  Preferences preferences;
  preferences.begin("SwitchesState", false);
  bool hasPref = preferences.getBool("valid", false);
  if (hasPref) {
		sw1Val = preferences.getInt("sw1Val", 1);
    sw2Val = preferences.getInt("sw2Val", 1);
    sw3Val = preferences.getInt("sw3Val", 1);
    sw4Val = preferences.getInt("sw4Val", 1);
  }else{
    preferences.putInt("sw1Val", 1);
    preferences.putInt("sw2Val", 1);
    preferences.putInt("sw3Val", 1);
    preferences.putInt("sw4Val", 1);
    preferences.putBool("valid", true);
  }
  preferences.end();

  digitalWrite (SW1, sw1Val);
  digitalWrite (SW2, sw2Val);
  digitalWrite (SW3, sw3Val);
  digitalWrite (SW4, sw4Val);
    // Serial.printf("Switch 1: %d, Switch 2: %d, Switch 3: %d, Switch 4: %d\n\n", sw1Val, sw2Val, sw3Val, sw4Val);

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
        handleSwitchAction(receivedText);
    }
}

void updateSwStateAndPublish(String varName, int index, int swValue){
  Preferences preferences;
  preferences.begin("SwitchesState", false);
  preferences.putInt(string2char(varName), swValue);
  preferences.end();
  // String payload = "{\"type\":\"" BOARD_TYPE "\", \"uniqueId\":\"" +BOARD_ID+"\", \"deviceIndex\":1, \"deviceValue\": " +String(sw1Val)+"}";
  String payload;
  StaticJsonBuffer<200> dataJsonBuffer;
  JsonObject& jsonOut = dataJsonBuffer.createObject();
  jsonOut["type"] = BOARD_TYPE;
  jsonOut["uniqueId"] = BOARD_ID;
  jsonOut["deviceIndex"] = index;
  jsonOut["deviceValue"] = swValue;
  // Convert JSON object into a string
  jsonOut.printTo(payload);
  publishData(payload);
  dataJsonBuffer.clear();
}

void checkTouchDetected(){
  if(digitalRead(touch1) == HIGH){
        Serial.println("1 pressed");
        if (sw1Val == 0){
          digitalWrite(SW1, 1);
          sw1Val = 1;
        } else {
          digitalWrite(SW1, 0);
          sw1Val = 0;
        }
        updateSwStateAndPublish("sw1Val", 1, sw1Val);
        delay(500);
  }
  if(digitalRead(touch2) == HIGH){
    Serial.println("2 pressed");
    if (sw2Val == 0){
      digitalWrite(SW2, 1);
      sw2Val = 1;
    } else {
      digitalWrite(SW2, 0);
      sw2Val = 0;
    }
    updateSwStateAndPublish("sw2Val", 2, sw2Val);
    delay(500);
  }
  if(digitalRead(touch3) == HIGH){
    Serial.println("3 pressed");
    if (sw3Val == 0){
      digitalWrite(SW3, 1);
      sw3Val = 1;
    } else {
      digitalWrite(SW3, 0);
      sw3Val = 0;
    }
    updateSwStateAndPublish("sw3Val", 3, sw3Val);
    delay(500);
  }
  if(digitalRead(touch4) == HIGH){
    Serial.println("4 pressed");
    if (sw4Val == 0){
      digitalWrite(SW4, 1);
      sw4Val = 1;
    } else {
      digitalWrite(SW4, 0);
      sw4Val = 0;
    }
    updateSwStateAndPublish("sw4Val", 4, sw4Val);
    delay(500);
  }
}

void initDevice(){
	// Create unique device name
	createName();
  initRadio();
  initSwitches();	
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
  pinMode(SW1, OUTPUT);
  pinMode(SW2, OUTPUT);
  pinMode(SW3, OUTPUT);
  pinMode(SW4, OUTPUT);

  digitalWrite(SW1, 1);
  digitalWrite(SW2, 1);
  digitalWrite(SW3, 1);
  digitalWrite(SW4, 1);

  pinMode(touch1, INPUT);
  pinMode(touch2, INPUT);
  pinMode(touch3, INPUT);
  pinMode(touch4, INPUT);

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
    checkTouchDetected();
   
    if ((unsigned long)(currentMillis - previousMillis) >= (interval * 1000)) {
      // if(!wifiConnected){
      //   if(hbLedState == HIGH){
      //     digitalWrite(HEARTBEAT_LED, 0);
      //     hbLedState = LOW;
      //   }
      // }else{
      //   if(hbLedState == LOW){
      //     digitalWrite(HEARTBEAT_LED, 1);
      //     hbLedState = HIGH;
      //   }
      // }
      previousMillis =  millis();
    }

}
