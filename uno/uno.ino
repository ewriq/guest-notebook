#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9
int BUTTON_PIN = 2;
int buttonState = 0;  
int buzzerPin = 3; 
MFRC522 mfrc522(SS_PIN, RST_PIN);  

bool cardRead = false;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP); 
  Serial.begin(9600);  
  SPI.begin();         
  mfrc522.PCD_Init();  
}

void loop() {
  buttonState = digitalRead(BUTTON_PIN);  

  if (cardRead == false) {
    if (mfrc522.PICC_IsNewCardPresent()) {  
      if (mfrc522.PICC_ReadCardSerial()) {  
        cardRead = true; 
          tone(buzzerPin, 261);  
          delay(500);            
          noTone(buzzerPin);   
          delay(500);
        String cardUID = "";
        for (byte i = 0; i < mfrc522.uid.size; i++) {
          cardUID += String(mfrc522.uid.uidByte[i], HEX); 
          if (i < mfrc522.uid.size - 1) {
            cardUID += " ";  
          }
        }
        
        Serial.println(cardUID);
      }
    }
  }
  
  if (buttonState == LOW) {  
    cardRead = false; 
    delay(500); 
  }
}
