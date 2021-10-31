#include <dht11.h>
#define dht_apin 4
dht11 DHT11;
int capt_1 = A0;
int capt_2 = A1;
int pompe = 12;
int resistance = 3;
int inputString,junk;
int taux1,taux2 ;
void setup() {
  Serial.begin(9600);
  pinMode(capt_1,INPUT);
  pinMode(capt_2,INPUT);
  pinMode(pompe,OUTPUT);
  pinMode(resistance,OUTPUT);

}

void loop() {
  while(Serial.available()) { 
    char inChar = (char)Serial.read();  
    inputString += inChar;
    } 
    while (Serial.available() > 0) { 
      junk = Serial.read() ; 
      }
    switch (inputString){
      case 'A':
        digitalWrite(resistance,HIGH);
        delay(1200000); // 20 min
        digitalWrite(resistance,LOW);
        break;
      case 'B':
        digitalWrite(pompe,HIGH);
        delay(60000); //1 min
        digitalWrite(pompe,LOW);
        break;
       case 'C':
        digitalWrite(pompe,HIGH);
        delay(120000); //2 min
        break;
       case 'D':
        taux1 = analogRead(capt_1);
        taux2 = analogRead(capt_2);
        Serial.println((float)DHT11.temperature);
        Serial.println((float)DHT11.humidity);
        Serial.println((float)taux1);
        Serial.println((float)taux2);
        break;
      }
      inputString=0;
}
