// the arduino script
// pinouts:
//  water level captor n°1 -> A0
//  water level captor n°2 -> A1
//  resistor -> 12
//  pump -> 11
//  humidity/temperature captor -> 7
#include "DHT.h"

//captors
#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
int temperature,humidity;

//captors
const int capt1 = A0;
const int capt2 = A1;
int taux1,taux2;

// relay
const int res = 12;
const int pompe = 11; 

//other
int val1, val2, byte_read;

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(capt1,INPUT);
  pinMode(capt2,INPUT);
  pinMode(res,OUTPUT);
  pinMode(pompe,OUTPUT);
  digitalWrite(res,HIGH);
  digitalWrite(pompe,HIGH);
}
 
void loop() {
  byte_read = 0;
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();
  taux1 = analogRead(capt1);
  taux2 = analogRead(capt2);

  while (Serial.available()) {
    byte_read = Serial.read();
    switch (byte_read){
      case 65 : //temperature needed
        digitalWrite(res,LOW);
        delay(1200000); //20 min
        digitalWrite(res,HIGH);
        break;

      case 66 : //water needed 1/2
        digitalWrite(pompe,LOW);
        delay(60000); //1min
        digitalWrite(pompe,HIGH);
        break;
      
      case 67 : //water needed 2/2
        digitalWrite(pompe,LOW);
        delay(30000); //30s
        digitalWrite(pompe,HIGH);
        break;
      
      case 68 : //send data to the raspberry pi
        Serial.println(temperature);
        Serial.println(humidity);
        Serial.println(taux1);
        Serial.println(taux2);
        break;
        
      default:
        break;
    }
  }

}
