#include <WiFi.h>
#include <HTTPClient.h>

HardwareSerial mySerial(2);  

const char* ssid = "ewriq";    
const char* password = "f9663ddc"; 
const char* serverName = "http://lightewriq.space:3000/add/";  

const int wLed = 2;  
const int sLed = 4;  
const int rLed = 5;  

void setup() {
  Serial.begin(115200); 
  mySerial.begin(9600, SERIAL_8N1, 16, 17);  

  pinMode(wLed, OUTPUT);  
  pinMode(sLed, OUTPUT);
  pinMode(rLed, OUTPUT);

  WiFi.begin(ssid, password);
  
  int retryCount = 0;
  while (WiFi.status() != WL_CONNECTED && retryCount < 10) {
    delay(1000);
    Serial.println("WiFi'ye bağlanılıyor...");
    retryCount++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("WiFi'ye bağlanıldı.");
    digitalWrite(wLed, HIGH); 
    Serial.print("IP Adresi: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("WiFi bağlantısı başarısız.");
     digitalWrite(wLed, LOW); 
    return;  
  }
}

void loop() {
  String dynamicId = readSerialData();  

  if (dynamicId.length() > 0) {
    dynamicId.trim();  
    dynamicId.replace(" ", "");  

    int httpResponseCode = sendPostRequest(dynamicId);
  }

}


String readSerialData() {
  String receivedData = ""; 
  bool dataComplete = false;

  while (!dataComplete) {
    if (mySerial.available()) {
      char incomingByte = mySerial.read();
      
      if (incomingByte == '\n' || incomingByte == '\r') {
        if (receivedData.length() > 0) {
          dataComplete = true;  
        }
      } else {
        receivedData += incomingByte;
      }
    }
    delay(10);  
  }


  if (receivedData.length() > 0) {
    Serial.println("Gelen Veri: " + receivedData); 
    digitalWrite(sLed, LOW);  
    delay(100);
    digitalWrite(sLed, HIGH);
    delay(100);
    digitalWrite(sLed, LOW);

    String cardUID = "";
    for (int i = 0; i < receivedData.length(); i++) {
      cardUID += String(receivedData[i], HEX); 
    }
      return cardUID;
  }
}


int sendPostRequest(String id) {
  HTTPClient http;
  Serial.print(id);
  if (WiFi.status() == WL_CONNECTED) {
    http.begin(serverName);  
    http.addHeader("Content-Type", "application/json");  

    String jsonData = "{\"id\":\"" + id + "\"}";

    int httpResponseCode = http.POST(jsonData);  

    if (httpResponseCode == 200) {
      String response = http.getString();
        digitalWrite(rLed, HIGH); 
        delay(200);
        digitalWrite(rLed, LOW); 
    } 
    if (httpResponseCode == 404) {
      String response = http.getString();
        digitalWrite(rLed, HIGH); 
        delay(200);
        digitalWrite(rLed, LOW); 
    } 

    http.end();  
    return httpResponseCode;
  } else {
    digitalWrite(wLed, LOW); 
  }

  return 0; 
}
