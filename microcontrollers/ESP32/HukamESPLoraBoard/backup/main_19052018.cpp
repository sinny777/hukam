#include <Arduino.h>
#include <stdlib.h>
#include <SPI.h>
#include <Wire.h>
#include <LoRa.h>

#ifdef __cplusplus
extern "C" {
#endif
uint8_t temprature_sens_read();
#ifdef __cplusplus
}
#endif
uint8_t temprature_sens_read();

String sensorsData = "";
bool broadcast = false;

unsigned long interval = 1000; // the time we need to wait
unsigned long previousMillis = 0;


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
bool loraAvailable = false;

String BOARD_ID;

// -----------------------------

int hallData = 0;
int boardTemp = 0;

/**
 * Get all sensors data and save it in a variable
 */
static void getSensorsData(){
    // hallData = hallRead();
    // boardTemp = (temprature_sens_read() - 32) / 1.8;

  // sensorsData = "{\"type\":\"ESP_BOARD\", \"BOARD_ID:\""+BOARD_ID+"}";
  sensorsData = "{\"type\":\"ESP_BOARD\"}";

}

void publishData(String data){
  if(loraAvailable){
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
      // Serial.print("Lora Not Working: >> ");
      // Serial.println(data);
    }
}

void checkDataOnLora(){
    // try to parse packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // received a packet
    // Serial.print("Received packet '");
    // read packet
    while (LoRa.available()) {
      receivedText = (char)LoRa.read();
      // Serial.print(receivedText);
    }

    // print RSSI of packet
    // Serial.print("' with RSSI ");
    // Serial.println(LoRa.packetRssi());
  }
}

// the setup function runs once when you press reset or power the board
void setup() {
  // Init Lora
  SPI.begin(SCK, MISO, MOSI, CS);
  LoRa.setPins(SS, RST, DI0);
  delay(1000);
  Serial.begin(115200);
  while (!Serial);
  delay(1000);

  // char chipid[20];
  // sprintf(chipid, "%" PRIu64, ESP.getEfuseMac());
  // BOARD_ID = "HB_"+String(chipid);
  // Serial.println(BOARD_ID);
  // delay(100);

  // Serial.println("LoRa Initializing...");
  int loraTryCount = 0;
  do{
    loraAvailable = LoRa.begin(BAND);
    loraTryCount++;
    if(!loraAvailable){
      // Serial.printf("Starting LoRa failed!, Try Count: %d\n", loraTryCount);
      delay(3000);
    }else{
      // Serial.println("LoRa Initialized Successfully...");
    }
  }while(!loraAvailable && loraTryCount < 3);

  // Set WiFi to station mode and disconnect from an AP if it was previously connected
//  WiFi.mode(WIFI_STA);
//  WiFi.disconnect();
//  delay(100);

}

  // the loop function runs over and over again forever
  void loop() {
    unsigned long currentMillis = millis();
      checkDataOnLora();
      if ((unsigned long)(currentMillis - previousMillis) >= (interval * 5)) {
           getSensorsData();
           publishData(sensorsData);
           previousMillis =  millis();
      }
  }
