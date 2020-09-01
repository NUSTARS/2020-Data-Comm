import struct
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
# global vars
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

def read_packet(ba):
    try:
        obj = {
                'version': unpack('>B', ba[0:1])[0], 
                'flags': unpack('>B', ba[1:2])[0],
                'payloadSize': unpack('>H', ba[2:4])[0],
                'seqNum': unpack('>H', ba[4:6])[0],
                'checksum': unpack('>I', ba[6:10])[0],
                'time': datetime.datetime.fromtimestamp(int(time.time())).strftime("%H:%M:%S"),
                'data': {}
              }

        i = 10
        while (i < len(ba)):
                uid = unpack('>H', ba[i:i+2])[0]
                reserved = unpack('>H', ba[i+2:i+3])
                if reserved != 0: return 0
                dtype = unpack('>B', ba[i+3:i+4])[0]
                data = unpack(types[dtype][1], ba[i+4:i+4+dtype])[0]

                obj['data'][uid] = data
                i += 4+types[dtype][0]
       
    except IndexError as error:
        return {'error': error}

    except struct.error as error:
        return {'error': error}

    except: return {'error': 'exception'}
    
    return obj if i==len(ba) else {'error': 'exception'}