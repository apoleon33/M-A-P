# M-A-P 
**an invention to manage a plant automatically**

[![CodeFactor](https://www.codefactor.io/repository/github/apoleon33/m-a-p/badge/main)](https://www.codefactor.io/repository/github/apoleon33/m-a-p/overview/main)

## **WORK IN PROGRESS**
**nothing work at the moment**

You can also follow its development on [ψProd](https://discord.gg/hS4VgSTumn) (it's a french Discord server, but you're welcome to talk in english)


## Installation

**i don't know on which plateform it work actually**

### prerequisites :
you need to have those 3 installed:
1. node.js/npm
2. python/pip
3. bash

### automatic install


```sh
curl -s https://raw.githubusercontent.com/apoleon33/M-A-P/main/install.sh | sh
 ```

### manual install

```sh
git clone https://github.com/apoleon33/M-A-P.git && cd M-A-P
 ```

then you will have to install the needed python packages :
(once you cd in M-A-P)
```sh
pip install -r requirements.txt
 ```
 then you will have to install the required npm packages:
 (once you are in M-A-P/src/front)
 ```sh
npm install
 ```

 The arduino also require the [
DHT sensor library ](https://github.com/adafruit/DHT-sensor-library) by adafruit to work