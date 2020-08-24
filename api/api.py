import time
import datetime
import numpy as np
import threading
import serial
from flask import Flask
from flask_cors import CORS
from parsePacket import read_packet, types
from serialPort import get_ports

app = Flask(__name__)
CORS(app)

class SerialThread(object):
    def __init__(self, time=0, selected_port=''):
        self.data = []
        self.selected_port = selected_port

        thread = threading.Thread(target=self.run, args=())
        thread.daemon = True
        thread.start()

    def run(self):
        while True:
            if self.selected_port:
                ser = serial.Serial(self.selected_port)
                print(ser.name)
                print('Reading from port...')
                s = ser.read_until() # reads until '\n'
                packet = read_packet(bytearray(s))
                self.data.append(packet)


sthread = SerialThread()

# source venv/bin/activate

# @app.route('/time/<test>')
# def get_current_time(test):
#     d = datetime.datetime.fromtimestamp(int(time.time()))
#     return {'time': d.strftime("%H:%M:%S"), 'test': test}

# @app.route('/binary/<packet>')
# def read_binary(packet):
#     ba = bytearray(packet)
#     return read_packet(ba)

@app.route('/ports/')
def list_ports():
    return get_ports()

@app.route('/selected-port/', methods=['POST'])
def selected_port():
    global sthread
    print('post app')
    req = request.json
    print(req)
    sthread.selected_port = req['port']
    return

@app.route('/request-data/')
def get_data():
    global sthread
    data = sthread.data.copy()
    sthread.data = []
    return data
