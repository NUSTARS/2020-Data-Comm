import time
import datetime
import numpy as np
import threading
import serial
import json
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from parsePacket import read_packet, types
from serialPort import get_ports

app = Flask(__name__)
app.debug = False
app.use_reloader = False
CORS(app)

@app.route('/ports/')
def list_ports():
    return get_ports()

@app.route('/selected-port/', methods=['POST'])
def selected_port():
    global selected_port
    print('post app')
    req = request.json
    print(req)
    with dataLock:
        selected_port = req['port']
    return req

@app.route('/request-data/')
def get_data():
    global data
    with dataLock:
        d = data.copy()
        print(f'data: {d}')
        print(f'json dump: {jsonify(d)}')
        data = []
    return jsonify(d)

def run():
    global data
    global sthread
    global selected_port
    # x = 0
    # y = 0
    while True:
        print(f'port: {selected_port}')
        if selected_port:
            # print("WE HAVE PORT!")
            # actual:
            ser = serial.Serial(self.selected_port)
            print(ser.name)
            print('Reading from port...')
            s = ser.read(size=10) # reads until and including checksum
            packet = read_packet(bytearray(s))
            self.data.append(packet)

            # test:
        #     obj = {
        #         'time': x,
        #         'data': {10: y}
        #     }
        #     print('test1')
        #     print(x)
        #     with dataLock:
        #         data.append(obj)
        #         print('test2')
        #     x += 1
        #     y = np.random.randint(0,100)

        # # print('test3')
        # time.sleep(1)
        # # print('test4')

def startThread():
    global sthread
    sthread.start()

data = []
selected_port = None
dataLock = threading.Lock()
sthread = threading.Thread(target=run, args=())

startThread()