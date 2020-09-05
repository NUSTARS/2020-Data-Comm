from struct import unpack, Struct
from struct import error as structerror
# import struct
from binascii import crc32
import time
import datetime

"""
    PACKET FORMAT

Byte #
     1: Protocol version
     2: Flags
   3-4: Payload size
   5-6: Sequence number
  7-10: CRC-32 checksum
  11-?: Variable length secion of repeating:
      --- 2 bytes: Unique ID
      --- 1 byte:  Reserved
      --- 1 byte:  Data type
      --- ? bytes: Data of length dtype size
"""

# source venv/bin/activate

# dict containing TYPE-ID : [TYPE-SIZE, FORMAT-STRING] pairs
types = {
            0: [1, '>B'], # uint8
            1: [2, '>H'], # uint16
            2: [4, '>I'], # uint32
            3: [8, '>Q'], # uint64
            4: [1, '>b'], # int8
            5: [2, '>h'], # int16
            6: [4, '>i'], # int32
            7: [8, '>q'], # int64
            8: [4, '>f'], # float32
            9: [8, '>d']  # float 64
        }

# struct class containing format string for unpacking
header = Struct('>BBHHI')

def unpackHeader(hba):
    '''
    Unpacks the header bytes of the packet.
    - Input:    header bytes (10)
    - Output:   (version, flags, payload-size, sequence-num, checksum)
    '''
    return header.unpack(hba)

def unpackPayload(pba, pSize):
    '''
    Unpacks the payload bytes of the packet.
    - Input:    payload bytes, payload size
    - Output:   {uid1: data1, uid2: data2, ...}
    '''
    d = {}
    i = 0
    while (i < pSize):
        uid = unpack('>H', pba[i:i+2])[0]
        reserved = unpack('>H', pba[i+2:i+3])
        if reserved != 0: return 0
        dtype = unpack('>B', pba[i+3:i+4])[0]
        data = unpack(types[dtype][1], pba[i+4:i+4+dtype])[0]

        d[uid] = data
        i += 4+types[dtype][0]
    
    return d if i==pSize else 0 # 0 if packet malformed

def read_packet(ba):
    '''
    Parses packets read from serial port.
    - Input:    None
    - Output:   Packet object if parse successful, 0 otherwise
    '''
    try:
        h = unpackHeader(ba[:10])
        if h[4] != crc32(ba[10:]): return 0 # checksum failure
        d = unpackPayload(ba[10:], h[2])
        if not d: return 0 # payload unpacking failure
        obj = {
                'version': h[0], 
                'flags': h[1],
                'payloadSize': h[2],
                'seqNum': h[3],
                'checksum': h[4],
                'time': datetime.datetime.fromtimestamp(int(time.time())).strftime("%H:%M:%S"),
                'data': d
              }
       
    except IndexError as error:
        print(f'Error: {error}')
        return 0

    except structerror as error:
        print(f'Error: {error}')
        return 0

    except: return 0
    
    else: return obj