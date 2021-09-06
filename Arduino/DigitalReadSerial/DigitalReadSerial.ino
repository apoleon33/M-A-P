#include <dht11.h>
#include <RTClib.h>
#define dht_apin 4
dht11 DHT11;
RTC_DS3231 rtc;
int capt_1 = A0;
int capt_2 = A1;
int pompe = 12;
int resistance = 3;
int sec_check = 0;
String trad1, trad2,eau_hiver,eau_ete;
int taux1,taux2,temperature_hiver,temperature_ete,inputString,junk,a,Montenegro;
void setup(){
	Serial.begin(9600);
	pinMode(capt_1,INPUT);
	pinMode(capt_2,INPUT);
	pinMode(pompe,OUTPUT);
	pinMode(resistance,OUTPUT);
	if (! rtc.begin()){
		digitalWrite(13, HIGH);
		delay(1000);
		digitalWrite(13,LOW);
		Serial.println("ca marche pas");
		while (1);
    }
	while (a!=1){
		if(Serial.available()){ 
	    	while(Serial.available()) { 
				char inChar = (char)Serial.read(); //Lire l'entrée 
				inputString += inChar; //Construit une chaine de caractére a partir des caractére reçus
			} 
			while (Serial.available() > 0) { junk = Serial.read() ; }
			switch (inputString){
				case 'A':
					eau_hiver="pot";
					eau_ete="coupelle";
					temperature_hiver= 12;
					temperature_ete= 25;
					a=1;
					break;
				case 'B':
					eau_hiver="pot";
					eau_ete="pot";
					temperature_hiver= 10;
					temperature_ete= 25;
					a=1;
					break;
				case 'C':
					eau_hiver="pot";
					eau_ete="pot";
					temperature_hiver= 10;
					temperature_ete= 25;
					a=1;
					break;
				case 'D':
					eau_hiver="sec";
					eau_ete="sec";
					temperature_hiver= 22;
					temperature_ete= 22;
					a=1;
					break;
				case 'E':
					eau_hiver="pot";
					eau_ete="coupelle";
					temperature_hiver= 15;
					emperature_ete= 22;
					a=1;
					break;
				case 'F':
					eau_hiver="sec";
					eau_ete="coupelle";
					temperature_hiver= 13;
					temperature_ete= 19;
					a=1;
					break;
				case 'G':
					eau_hiver="sec";
					eau_ete="pot";
					temperature_hiver= 15;
					temperature_ete= 19;
					a=1;
					break;
				case 'H':
					eau_hiver=false;
					eau_ete="sec";
					temperature_hiver= 11;
					temperature_ete= 20;
					a=1;
					break;
				case 'I':
					eau_hiver=false;
					eau_ete="sec";
					temperature_hiver= 7;
					temperature_ete= 20;
					a=1;
					break;
			}
			inputString = ""; 
		}
	}
	digitalWrite(13,LOW);
	delay(10000);
}
void loop(){
		int chk = DHT11.read(dht_apin);
		DateTime now = rtc.now();
		taux1=map(analogRead(capt_1),0,1024,0,100);
		taux2=map(analogRead(capt_2),0,1024,0,100);
		if ( now.month() >= 4 and now.month() <= 9){//ete
				if (DHT11.temperature < temperature_ete){//gestion temperature
						while(DHT11.temperature < temperature_ete){
							digitalWrite(resistance,HIGH);
							chk = DHT11.read(dht_apin);
						}
				}
				digitalWrite(resistance,LOW);
				if (taux1 < 20 and eau_ete=="coupelle"){
					while (taux1 < 20 and eau_ete=="coupelle"){
						digitalWrite(12,HIGH);
						taux1=map(analogRead(capt_1),0,1024,0,100);
					}
				}
				if (taux1 < 20 and eau_ete=="sec"){
					sec_check += 1;
					if (sec_check >= 2){
						while (taux1 < 20){
							taux1=map(analogRead(capt_1),0,1024,0,100);
						}
						sec_check=0;
					}
				}
				if (taux2 < 20 and eau_ete=="pot"){
					while (taux2 < 20 and eau_ete=="pot"){
						digitalWrite(pompe, HIGH);
						taux2=map(analogRead(capt_2),0,1024,0,100);
					}
				}
				digitalWrite(pompe,LOW);
		} 
		else{//hiver
				if (DHT11.temperature < temperature_hiver){//gestion temperature
					while(DHT11.temperature < temperature_hiver){
						digitalWrite(resistance,HIGH);
						chk = DHT11.read(dht_apin);
					}
				}
				digitalWrite(resistance,LOW);
				if (taux1 < 20 and eau_hiver == "coupelle"){
					while (taux1 < 20 and eau_hiver=='coupelle'){
						digitalWrite(12,HIGH);
						taux1=map(analogRead(capt_1),0,1024,0,100);
					}
				}
				if (taux1 < 20 and eau_hiver=="sec"){
					sec_check += 1;
					if (sec_check >= 2){
						while (taux1 < 20){
							taux1=map(analogRead(capt_1),0,1024,0,100);
						}
						sec_check=0;
					}

				}
				if (taux2 < 20 and eau_hiver=="pot"){
					while (taux2 < 20 and eau_hiver=='pot'){
						digitalWrite(pompe, HIGH);
						taux2=map(analogRead(capt_2),0,1024,0,100);
				 }
				}
				digitalWrite(pompe,LOW);
		}
		delay(36000000);
		Serial.println((float)DHT11.temperature);
		Serial.println((float)DHT11.humidity);
		digitalWrite(13,LOW);
}