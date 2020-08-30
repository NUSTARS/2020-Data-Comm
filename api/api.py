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
    x = 0
    y = 0
    while True:
        print(f'port: {selected_port}')
        if selected_port:
            print("WE HAVE PORT!")
            # test:
            obj = {
                'time': x,
                'data': {10: y}
            }
            print('test1')
            print(x)
            with dataLock:
                data.append(obj)
                print('test2')
            x += 1
            y = np.random.randint(0,100)

        # print('test3')
        time.sleep(1)
        # print('test4')

def startThread():
    global sthread
    sthread.start()


data = []
selected_port = None
dataLock = threading.Lock()
sthread = threading.Thread(target=run, args=())

startThread()
print('hey')

# app = Flask(__name__)
# CORS(app)

# sthread = SerialThread()

# global sthread = None

# class SerialThread(object):
#     def __init__(self, time=0, selected_port=''):
#         self.data = []
#         self.selected_port = selected_port

#         thread = threading.Thread(target=self.run, args=(), daemon=True)
#         thread.start()

#     def run(self):
#         x = 0
#         y = 0
#         while True:
#             print(f'port: {self.selected_port}')
#             if self.selected_port != '':
#                 # test:
#                 obj = {
#                     'version': 0, 
#                     'flags': 0,
#                     'payloadSize': 0,
#                     'seqNum': x,
#                     'checksum': 0,
#                     'time': x,
#                     'data': {10: y}
#                 }
#                 print(x)
#                 self.data.append(obj)
#                 x += 1
#                 y = np.random.randint(0,100)

#             time.sleep(5000)

#                 # actual:
#                 # ser = serial.Serial(self.selected_port)
#                 # print(ser.name)
#                 # print('Reading from port...')
#                 # s = ser.read_until() # reads until '\n'
#                 # packet = read_packet(bytearray(s))
#                 # self.data.append(packet)

# # source venv/bin/activate

# # @app.route('/time/<test>')
# # def get_current_time(test):
# #     d = datetime.datetime.fromtimestamp(int(time.time()))
# #     return {'time': d.strftime("%H:%M:%S"), 'test': test}

# # @app.route('/binary/<packet>')
# # def read_binary(packet):
# #     ba = bytearray(packet)
# #     return read_packet(ba)

# @app.route('/ports/')
# def list_ports():
#     return get_ports()

# @app.route('/selected-port/', methods=['POST'])
# def selected_port():
#     global sthread
#     print('post app')
#     req = request.json
#     print(req)
#     sthread.selected_port = req['port']
#     return req

# @app.route('/request-data/')
# def get_data():
#     global sthread
#     data = sthread.data.copy()
#     print(f'data: {data}')
#     sthread.data = []
#     return jsonify(data)