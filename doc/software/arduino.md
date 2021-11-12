# ARDUINO

**the code is still changing at the moment so some things might change**

# Introduction
The entire arduino code is in main.ino
The required libraries are the following:
- DHT

# Code
## before
first thing the code do is declaring useful variable and input/output. 
It also contain some functions to convert the received message from the raspberry pi

## setup
Declare if pins are either inputs or outputs/
Start the serial communication and the dht11.

## loop
The first thing the code will check is if the serial communication is available, then if yes, if and the arduino receive a message, it will convert it to char, and analyze it.

again and again...