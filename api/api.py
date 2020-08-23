import time
import datetime
import numpy as np
from flask import Flask
from .parsePacket import read_packet, types
from .serialPort import get_ports

app = Flask(__name__)

# source venv/bin/activate

@app.route('/time/<test>')
def get_current_time(test):
    d = datetime.datetime.fromtimestamp(int(time.time()))
    return {'time': d.strftime("%H:%M:%S"), 'test': test}

@app.route('/binary/<packet>')
def read_binary(packet):
    ba = bytearray(packet)
    return read_packet(ba)

@app.route('/ports/')
def list_ports():
    return get_ports()