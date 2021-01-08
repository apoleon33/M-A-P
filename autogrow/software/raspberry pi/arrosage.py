
import serial
import time
def arrose():
    a = 0
    def envoi(msg):
        arduino = serial.Serial(port='COM4', baudrate=115200, timeout=.1)
        def write_read(x):
            arduino.write(bytes(x, 'utf-8'))
            time.sleep(0.05)
            data = arduino.readline()
            return data
        num = msg
        value = write_read(num)
        if value=="ok":
           return "done"
        else:
           return "error"

    msg = "arrose"
    a = envoi(msg)
    print(a)
