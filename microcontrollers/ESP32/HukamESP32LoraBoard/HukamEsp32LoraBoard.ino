#include<stdlib.h>
#include "DHT.h"
#include <SPI.h>
#include <LoRa.h>
#include <WiFi.h>
#include <PubSubClient.h>

#ifdef __cplusplus
extern "C" {
#endif
uint8_t temprature_sens_read();
#ifdef __cplusplus
}
#endif
uint8_t temprature_sens_read();

static int taskCore = 0;
String sensorsData = "";
bool broadcast = false;

unsigned long interval = 1000; // the time we need to wait
unsigned long previousMillis = 0;

// WIFI_LoRa_32 ports
// GPIO5  -- SX1278's SCK
// GPIO19 -- SX1278's MISO
// GPIO27 -- SX1278's MOSI
// GPIO18 -- SX1278's CS
// GPIO14 -- SX1278's RESET
// GPIO26 -- SX1278's IRQ(Interrupt Request)

// ---- LORA Pins ----

byte localAddress = 0xBB;     // address of this device
byte destination = 0xFF;      // destination to send to

#define BAND    433E6
#define SCK  5
#define MISO  19
#define MOSI  27
#define CS  18

#define SS  18
#define RST     14
#define DI0     26
// -----------------

String receivedText;
bool isLoraWorking = false;

#define ORG "rqeofj"
#define DEVICE_TYPE "HB_ESP32"
#define TOKEN "1SatnamW"

#define HEARTBEAT_LED  21
bool hbLedState = false;

#define DHTPin 35
#define ldrSensorPin 25

#define TOUCH1PIN   12
#define TOUCH2PIN   13
#define TOUCH3PIN   4
#define TOUCH4PIN   15
unsigned long previousTouchMillis = 0;

int touchThreshold = 40;
int touchIndex = 0;

//#define SW1  9
//#define SW2  10
//#define SW3  22
//#define SW4  23

char server[] = ORG ".messaging.internetofthings.ibmcloud.com";
char topic[] = "iot-2/evt/espboard/fmt/json";
char authMethod[] = "use-token-auth";
char token[] = "P@ssw0rd"; // Auth token of Device registered on Watson IoT Platform

String DEVICE_ID;
WiFiClient wifiClient;
PubSubClient client(server, 1883, NULL, wifiClient);

const char* ssid = "GurvinderNet";
const char* password =  "1SatnamW";

//--------- DHT Sensor ----------

#define DHTTYPE DHT11   // DHT 11
//#define DHTTYPE DHT21   // DHT 21 (AM2301)
//#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
// Initialize DHT sensor.
DHT dht(DHTPin, DHTTYPE);
// Temporary variables
static char celsiusTemp[7];
static char humidityTemp[7];

float humidity;
float temperature;

// -----------------------------

int lightVal;

// --------------------

int hallData = 0;
int boardTemp = 0;

int wifiTryCount = 0;
int mqttTryCount = 0;
int wifiStatus = WL_IDLE_STATUS;
int loraTryCount = 0;

static void scanWiFi(){
  int n = WiFi.scanNetworks();

  if (n == 0) {
    Serial.println("Searching networks.");
  } else {
    Serial.println("Networks found: ");
    for (int i = 0; i < n; ++i) {
      // Print SSID for each network found
      char currentSSID[64];
      WiFi.SSID(i).toCharArray(currentSSID, 64);
      Serial.println(currentSSID);
    }
  }
  // Wait a bit before scanning again
  delay(5000);
}

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

static void connectMQTT() {
  Serial.print("IN connecting MQTT client...");
  if(DEVICE_ID == ""){
    char chipid[20];
    sprintf(chipid, "%" PRIu64, ESP.getEfuseMac());
    DEVICE_ID = "HB_"+String(chipid);
  }
 String clientId = "d:" ORG ":" DEVICE_TYPE ":" +DEVICE_ID;
 if (!!!client.connected()) {
   Serial.print("Reconnecting MQTT client to ");
   Serial.println(server);
   while (!!!client.connect((char*) clientId.c_str(), authMethod, token)) {
     Serial.print("Connecting: ");
     Serial.println(DEVICE_ID);
     delay(500);
   }
   Serial.println();
 }
 Serial.print("MQTT Connected...");
}

static void getSensorsData(){
  hallData = hallRead();
//  delay(1000);
  boardTemp = (temprature_sens_read() - 32) / 1.8;
  lightVal = analogRead(ldrSensorPin);

    humidity = dht.readHumidity();
// Read temperature as Celsius (the default)
    temperature = dht.readTemperature();
  if (isnan(humidity) || isnan(temperature)) {
//    Serial.println("Failed to read from DHT sensor!");
    strcpy(celsiusTemp,"-0");
    strcpy(humidityTemp, "-0");
  } else{
    // Computes temperature values in Celsius + Fahrenheit and Humidity
    float hic = dht.computeHeatIndex(temperature, humidity, false);
    dtostrf(hic, 6, 2, celsiusTemp);
    dtostrf(humidity, 6, 2, humidityTemp);
  }

  sensorsData = "{\"type\":\"" DEVICE_TYPE "\", \"uniqueId\":\"" +DEVICE_ID+ "\", \"BOARD_TEMP\":" +String(boardTemp)+", \"HALL_DATA\":" +String(hallData)+", \"TEMP\":" +String(celsiusTemp)+", \"HUM\":" +String(humidityTemp)+", \"LIGHT\":" +String(lightVal)+"}";

}

void gotTouch1(){
  touchIndex = 1;
}


void gotTouch2(){
  touchIndex = 2;
}

void gotTouch3(){
  touchIndex = 3;
}

void gotTouch4(){
  touchIndex = 4;
}

void publishData(String data){
     /*
   if (client.publish(topic, (char*) payload.c_str())) {
       Serial.print("Published payload: ");
       Serial.println(payload);
     } else {
       Serial.println("Publish failed: ");
       Serial.println(payload);
     }
  */

  if(isLoraWorking){
        LoRa.beginPacket();
//        LoRa.write(destination);              // add destination address
//        LoRa.write(localAddress);
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

// tocuhValue > threshold = Release Event
// touchValue < threshold = Touch Event
void checkTouchDetected(){
  if(touchIndex > 0){
    unsigned long currentTouchMillis = millis();
    if ((unsigned long)(currentTouchMillis - previousTouchMillis) >= 500) {
          previousTouchMillis = millis();
          switch (touchIndex){
            case 1: {
                int touchVal = touchRead(TOUCH1PIN);
                if(touchVal > 1 && touchVal <= touchThreshold){
                      String payload = "{\"deviceIndex\":1, \"deviceValue\": " +String(touchVal)+"}";
                      publishData(payload);
                }
                break;
            }
           case 2: {
              int touchVal = touchRead(TOUCH2PIN);
              if(touchVal > 1 && touchVal <= touchThreshold){
                    String payload = "{\"deviceIndex\":2, \"deviceValue\": " +String(touchVal)+"}";
                    publishData(payload);
              }
              break;
           }
           case 3: {
              int touchVal = touchRead(TOUCH3PIN);
              if(touchVal > 1 && touchVal <= touchThreshold){
                    String payload = "{\"deviceIndex\":3, \"deviceValue\": " +String(touchVal)+"}";
                    publishData(payload);
              }
              break;
           }
           case 4: {
              int touchVal = touchRead(TOUCH4PIN);
              if(touchVal > 1 && touchVal <= touchThreshold){
                    String payload = "{\"deviceIndex\":4, \"deviceValue\": " +String(touchVal)+"}";
                    publishData(payload);
              }
              break;
           }
          }

          touchIndex = 0;
//          delay(1);
     }
  }

}

// the setup function runs once when you press reset or power the board
void setup() {
  delay(1000);
  dht.begin();
  delay(1000);

  SPI.begin(SCK, MISO, MOSI, CS);
  LoRa.setPins(SS, RST, DI0);
  delay(1000);
  Serial.begin(115200);
  while (!Serial);
  delay(1000);

  pinMode(HEARTBEAT_LED, OUTPUT);
  char chipid[20];
  sprintf(chipid, "%" PRIu64, ESP.getEfuseMac());
  DEVICE_ID = "HB_"+String(chipid);
  Serial.println(DEVICE_ID);
  delay(100);

  Serial.println("LoRa Initializing...");
  while(!LoRa.begin(BAND) && loraTryCount < 2) {
    Serial.println("Starting LoRa failed!");
    isLoraWorking = false;
    loraTryCount++;
    delay(5000);
  }

  if(loraTryCount < 2){
    isLoraWorking = true;
    Serial.println("LoRa Initialized Successfully...");
    // register the receive callback
//    LoRa.onReceive(onReceive);
    // put the radio into receive mode
//    LoRa.receive();
  }
  loraTryCount = 0;

  // Set WiFi to station mode and disconnect from an AP if it was previously connected
//  WiFi.mode(WIFI_STA);
//  WiFi.disconnect();
//  delay(100);

//   connectWiFi();
   if(wifiStatus == WL_CONNECTED){
//    connectMQTT();
   }

    touchAttachInterrupt(TOUCH1PIN, gotTouch1, touchThreshold);
    touchAttachInterrupt(TOUCH2PIN, gotTouch2, touchThreshold);
    touchAttachInterrupt(TOUCH3PIN, gotTouch3, touchThreshold);
    touchAttachInterrupt(TOUCH4PIN, gotTouch4, touchThreshold);

}

void checkDataOnLora(){
    // try to parse packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // received a packet
    Serial.print("Received packet '");
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

  // the loop function runs over and over again forever
  void loop() {
    unsigned long currentMillis = millis();
      checkDataOnLora();
      checkTouchDetected();
      if ((unsigned long)(currentMillis - previousMillis) >= (interval * 15)) {
           hbLedState = !hbLedState;
           digitalWrite(HEARTBEAT_LED, hbLedState);
           getSensorsData();
           publishData(sensorsData);
           previousMillis =  millis();
      }

      //  scanWiFi();
      //  Serial.println(DEVICE_ID);

  }
