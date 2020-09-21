/*
  NUPacketize.cpp - 
    Library for sending packets to NUSTARS data comm app.
*/

#include "Arduino.h"
#include "NUPacketize.h"
#include <cstdint>

#define REGISTER_PARSE_TYPE(X) \
    template <> const char* TypeParseTraits<X>::name = #X

REGISTER_PARSE_TYPE(uint8_t);
REGISTER_PARSE_TYPE(uint16_t);
REGISTER_PARSE_TYPE(uint32_t);
REGISTER_PARSE_TYPE(uint64_t);
REGISTER_PARSE_TYPE(int8_t);
REGISTER_PARSE_TYPE(int16_t);
REGISTER_PARSE_TYPE(int32_t);
REGISTER_PARSE_TYPE(int64_t);
REGISTER_PARSE_TYPE(float);
REGISTER_PARSE_TYPE(double);
