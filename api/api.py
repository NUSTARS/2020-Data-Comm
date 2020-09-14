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
ALLOWED_EXTENSIONS = {'bin'}

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
        data = []
    return jsonify(d)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload-data/', methods=['POST'])
def upload():
    '''
    TYPE: POST
    Receives data and parses uploaded file
    - Output: Parsed data
    '''
    if 'file' not in request.files: return 0
    f = request.files['file']
    if f.filename == '': return 0
    if f and allowed_file(f.filename):
        data = bytearray(f.read())
        d = []
        for i in range(len(data)-10):
            packet = read_packet(data[i:])
            if packet: d.append(packet)
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
    global fn
    prev_port = None
    buf = b''
    ser = None
    while run_thread:
        if selected_port:
            if prev_port != selected_port:
                if ser: ser.close()
                ser = serial.Serial(selected_port)

            print(f'Reading from port {ser.name}...')

            read = ser.read(ser.in_waiting)
            buf += read
            with open(fn+'.bin','ab') as f:
                f.write(read)
            # print(buf)
            packet = read_packet(bytearray(buf))
            while not packet and run: 
                # print('Looking for packet...')
                buf = buf[1:]
                read = ser.read(ser.in_waiting)
                buf += read
                with open(fn+'.bin','ab') as f:
                    f.write(read)
                # print(buf)
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

fn = datetime.datetime.now()\
        .strftime("%m/%d/%Y, %H:%M:%S")\
        .translate({ord(c): None for c in ' /,:'})
data = []
udata = []
selected_port = None
run_thread = True
dataLock = threading.Lock()
sthread = threading.Thread(target=run, args=(), daemon=True)

startThread()

@atexit.register
def terminate_thread():
    global run
    run = False