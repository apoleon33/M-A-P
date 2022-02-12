# M-A-P 
**An invention to manage a plant automatically**

[![CodeFactor](https://www.codefactor.io/repository/github/apoleon33/m-a-p/badge/main)](https://www.codefactor.io/repository/github/apoleon33/m-a-p/overview/dev)

## Installation

### Prerequisites :
You need to have those 3 installed:
1. node.js/npm
2. python/pip
3. bash

### Automatic install

```sh
curl -s https://raw.githubusercontent.com/apoleon33/M-A-P/main/install.sh | sh
 ```

### Manual install

```sh
git clone --recursive https://github.com/apoleon33/M-A-P.git && cd M-A-P
 ```

Then you will have to install the needed python packages :
(once you cd in M-A-P)
```sh
pip install -r requirements.txt
 ```
Once its done, install the required npm packages:
 (in M-A-P/src/front)
 ```sh
npm install
 ```

The arduino also require the [
DHT sensor library ](https://github.com/adafruit/DHT-sensor-library) by adafruit to work