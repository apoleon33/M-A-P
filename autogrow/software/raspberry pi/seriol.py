import serial
import time
a = 0
def envoi(msg):
    arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600, timeout=.1)
    def write_read(x):
        arduino.write(bytes(x, 'utf-8'))
        time.sleep(0.05)
        data = arduino.readline()
        return data
    num = msg
    value = str(write_read(num))
    #value = value[2:][:-1] 
    print(value)
    if value == "ok\r\n":
        return "done"
    else:
        return "error"

msg = "test"
a = envoi(msg)
print(a)
