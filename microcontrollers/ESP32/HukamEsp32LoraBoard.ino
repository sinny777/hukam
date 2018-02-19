#include <stdlib.h>
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

// WIFI_LoRa_32 ports
// GPIO5  -- SX1278's SCK
// GPIO19 -- SX1278's MISO
// GPIO27 -- SX1278's MOSI
// GPIO18 -- SX1278's CS
// GPIO14 -- SX1278's RESET
// GPIO26 -- SX1278's IRQ(Interrupt Request)

#define ORG "rqeofj"
#define DEVICE_TYPE "HB_ESP32"
#define TOKEN "1SatnamW"

char server[] = ORG ".messaging.internetofthings.ibmcloud.com";
char topic[] = "iot-2/evt/espboard/fmt/json";
char authMethod[] = "use-token-auth";
char token[] = "P@ssw0rd"; // Auth token of Device registered on Watson IoT Platform

String DEVICE_ID;
WiFiClient wifiClient;
PubSubClient client(server, 1883, NULL, wifiClient);

int HEARTBEAT_LED = 25;

const char* ssid = "GurvinderNet";
const char* password =  "1SatnamW";

//--------- DHT Sensor ----------

#define DHTTYPE DHT11   // DHT 11
//#define DHTTYPE DHT21   // DHT 21 (AM2301)
//#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

const int DHTPin = 2;
// Initialize DHT sensor.
DHT dht(DHTPin, DHTTYPE);
// Temporary variables
static char celsiusTemp[7];
static char humidityTemp[7];

float humidity;
float temperature;

// -----------------------------

// LIGHT Sensor --- LDR ----------

const int ldrSensorPin = 34;
int lightVal;

// --------------------

int hallData = 0;
int boardTemp = 0;

int touchThreshold = 65;

int wifiTryCount = 0;
int mqttTryCount = 0;
int wifiStatus = WL_IDLE_STATUS;

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
    Serial.println("Failed to read from DHT sensor!");
    strcpy(celsiusTemp,"Failed");
    strcpy(humidityTemp, "Failed");
  } else{
    // Computes temperature values in Celsius + Fahrenheit and Humidity
    float hic = dht.computeHeatIndex(temperature, humidity, false);
    dtostrf(hic, 6, 2, celsiusTemp);
    dtostrf(humidity, 6, 2, humidityTemp);
  }
  String tempStr = "Temp: " +String(temperature);
  String humStr = "Humidity: " +String(humidity);
  String lightStr = "Light: " +String(lightVal);
}

static void blinkHeartbeatLED(){
  digitalWrite(HEARTBEAT_LED, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(HEARTBEAT_LED, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}

static void publishData(){
  String payload = "{\"d\":{\"type\":\"" DEVICE_TYPE "\", \"uniqueId\":\"" +DEVICE_ID+ "\", \"BOARD_TEMP\":" +String(boardTemp)+", \"HALL_DATA\":" +String(hallData)+", \"TEMP\":" +String(celsiusTemp)+", \"HUM\":" +String(humidityTemp)+", \"LIGHT\":" +String(lightVal)+"}}";
  Serial.println(payload);
    /*
   if (client.publish(topic, (char*) payload.c_str())) {
       Serial.print("Published payload: ");
       Serial.println(payload);
     } else {
       Serial.println("Publish failed: ");
       Serial.println(payload);
     }
  */

}

void gotTouch1(){
  int touchVal = touchRead(4);
  if(touchVal > 0){
     Serial.println("1 Touched: " + String(touchVal));
//     delay(500);
  }
}

void gotTouch2(){
  int touchVal = touchRead(32);
  if(touchVal > 0){
     Serial.println("2 Touched: " + String(touchVal));
//     delay(500);
  }
}


void gotTouch3(){
  int touchVal = touchRead(33);
  if(touchVal > 0){
     Serial.println("3 Touched: " + String(touchVal));
//     delay(500);
  }
}


void gotTouch4(){
  int touchVal = touchRead(15);
  if(touchVal > 0){
     Serial.println("4 Touched: " + String(touchVal));
//     delay(500);
  }
}


// the setup function runs once when you press reset or power the board
void setup() {
  Serial.begin(115200);
  while (!Serial);
  pinMode(HEARTBEAT_LED, OUTPUT);
  char chipid[20];
  sprintf(chipid, "%" PRIu64, ESP.getEfuseMac());
  DEVICE_ID = "HB_"+String(chipid);
  Serial.println(DEVICE_ID);

  /*
  SPI.begin(5, 19, 27, 18);
  LoRa.setPins(SS, RST, DI0);
  Serial.begin(115200);
  while (!Serial);

  Serial.println("LoRa Initializing...");

  if (!LoRa.begin(915E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
  */

  // Set WiFi to station mode and disconnect from an AP if it was previously connected
//  WiFi.mode(WIFI_STA);
//  WiFi.disconnect();
//  delay(100);

//   connectWiFi();
   if(wifiStatus == WL_CONNECTED){
//    connectMQTT();
   }

    touchAttachInterrupt(4, gotTouch1, touchThreshold);
    touchAttachInterrupt(32, gotTouch2, touchThreshold);
    touchAttachInterrupt(33, gotTouch3, touchThreshold);
    touchAttachInterrupt(15, gotTouch4, touchThreshold);
}

  // the loop function runs over and over again forever
  void loop() {
    Serial.println(WiFi.status());
    delay(5000);
//        if(WiFi.status() != WL_CONNECTED){
//          connectWiFi();
//        }
//        if (!client.loop()) {
//          connectMQTT();
//        }

        getSensorsData();
        publishData();

        blinkHeartbeatLED();

      //  scanWiFi();
      //  Serial.println(DEVICE_ID);

  }
