import serial.tools.list_ports

def get_ports():
    ports = serial.tools.list_ports.comports()
    return {"ports": [port.device for port in ports]}