import time
import datetime
import numpy as np
import threading
import serial
import json
import atexit
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from parsePacket import read_packet, unpackHeader, unpackPayload, types, header
from serialPort import get_ports

app = Flask(__name__)
app.debug = False
app.use_reloader = False
CORS(app)

@app.route('/ports/')
def list_ports():
    '''
    Type: GET
    Sends available serial ports to front end
    - Output: list of port names (type: string)
    '''
    return get_ports()

@app.route('/selected-port/', methods=['POST'])
def selected_port():
    '''
    Type: POST
    Receives selected serial port from front end
    - Output: Success or failure
    '''
    global selected_port
    global dataLock
    print('post app')
    req = request.json
    print(req)
    with dataLock:
        selected_port = req['port']
    return req

@app.route('/request-data/')
def get_data():
    '''
    Type: GET
    Sends any new data to front end
    - Output: List of new data
    '''
    global data
    global dataLock
    with dataLock:
        d = data.copy()
        print(f'data: {d}')
        print(f'json dump: {jsonify(d)}')
        data = []
    return jsonify(d)

def run():
    '''
    Reads packets from serial port and appends them to data array
    - Input: None
    - Output: None
    '''
    global data
    global sthread
    global dataLock
    global selected_port
    global run_thread
    prev_port = None
    buf = b''
    ser = None
    while run_thread:
        if selected_port:
            if prev_port != selected_port:
                ser.close()
                ser = serial.Serial(selected_port)

            print(f'Reading from port {ser.name}...')

            buf += ser.read(ser.in_waiting)
            packet = read_packet(bytearray(buf))
            while not packet and run: 
                buf = buf[1:]
                buf += ser.read(ser.in_waiting)
                if len(buf) > 10: # possible to be a full packet, has to be more than just header
                    packet = read_packet(bytearray(buf))
            else:
                with dataLock:
                    data.append(packet)
                buf = buf[10+packet['payloadSize']:]
            
            prev_port = selected_port
    
    if ser: ser.close()
    sthread.join()

def startThread():
    global sthread
    sthread.start()

data = []
selected_port = None
run_thread = True
dataLock = threading.Lock()
sthread = threading.Thread(target=run, args=())

startThread()

@atexit.register
def terminate_thread():
    global run
    run = False