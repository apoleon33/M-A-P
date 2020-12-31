 #include <dht_nonblocking.h>
#define DHT_SENSOR_TYPE DHT_TYPE_11

static const int DHT_SENSOR_PIN = 13;
DHT_nonblocking dht_sensor( DHT_SENSOR_PIN, DHT_SENSOR_TYPE );


const int detecteur_eau_1 = A0;  //detecteur de l'eau au niveau de la coupelle
const int detecteur_eau_2 = A1;  //detecteur de l'eau au niveau de la plante
const int detecteur_1_value = 0; //valeur du detecteur de l'eau au niveau de la coupelle 
const int detecteur_2_value = 0;  //valeur du detecteur de l'eau au niveau de la plante
const int relai_lampe = 3; //pins du relai pour la lampe
const int relai_resistance = 4 ;//pins du relai de la resistance
const int pompe = 5;   //je sais pas encores si la pompe seras relié a un relai
const int niveau_deau_1 = 6; //envoie de l'impulsion
const int niveau_deau_2 = 7;  //reception de l'impulsion
float distance;

void humandtemp(){                    //dcp c pas si utile que ca finalement                                                        //envoie de l'humidité et de la temperature
  float temperature;
  float humidity;
   
    Serial.print("temp:");
    Serial.println(temperature);    //Du point de vue de l’Arduino, écrire, c’est envoyer des données vers le périphérique connecté.
    Serial.print("humi:");
    Serial.println(humidity);
    delay(1);        
  
}
void detecteur_eau(){                                                                         //fonction en charge des detecteurs au niveau de la coupelle/plante
  int detecteur_1_value= analogRead(detecteur_eau_1);
  int detecteur_2_value= analogRead(detecteur_eau_2);
  if (detecteur_1_value<10 and detecteur_2_value<10){
    Serial.println("nowater");
  }
  else{
    if (detecteur_1_value  <10){
     Serial.println("waterhelp");
  }
    if (detecteur_2_value <10){
     Serial.println("waterpls");
  }
  }
}

void relais() { 
  if (Serial.available()>1){
     String v = Serial.readString();
     if(v.substring(0) == "lamp_on\r\n"){
       digitalWrite(relai_lampe,HIGH);
     }
     if(v.substring(0) == "lamp_off\r\n"){
       digitalWrite(relai_lampe,LOW);
     }
     if(v.substring(0) == "res_high\r\n"){
       digitalWrite(relai_resistance,LOW);
     }
     if(v.substring(0) == "res_low\r\n"){
       digitalWrite(relai_resistance,HIGH);
     }
  }
}

void arrosage(){                                                                               //a voir si je le met pas dans relais()
  String v = Serial.readString();
  if (v=="pompe_on"){
    int tmp = Serial.parseInt();
    for (int i=0; i<tmp; ++i); {
      digitalWrite(pompe,HIGH);
      delay(1);
    }
    digitalWrite(pompe,LOW);
  }
}

void niveau_deau(){                                                                            //vérifie si le niveau de l'eau du reservoir est suffisant
  digitalWrite(niveau_deau_1,LOW);
  delayMicroseconds(2);
  digitalWrite(niveau_deau_1,HIGH);
  delayMicroseconds(10);
  digitalWrite(niveau_deau_1,LOW);
  distance = pulseIn(niveau_deau_2, HIGH);  //renvoie la vitesse a ricocher en mms
  distance = distance/(29*2);
  if (distance>10){
    Serial.print("needwater");
  }
}
void setup() {
  Serial.begin(9600);
  pinMode(detecteur_eau_1,INPUT);
  pinMode(detecteur_eau_2,INPUT);
  pinMode(relai_lampe,OUTPUT);
  pinMode(relai_resistance,OUTPUT);
  pinMode(niveau_deau_1,OUTPUT);
  pinMode(niveau_deau_2,INPUT);
  }


//static bool measure_environment( float *temperature, float *humidity )
//{
  //static unsigned long measurement_timestamp = millis( );

  
 // if( millis( ) - measurement_timestamp > 3000ul ){
    //if( dht_sensor.measure( temperature, humidity ) == true ){
      //measurement_timestamp = millis( );
      //return( true );
    //}
  //}

//  return( false );
//}

void loop() {
  
    //humandtemp();
    detecteur_eau();
    relais();
    //arrosage();
    niveau_deau(); 
    delay(1000);
  }
