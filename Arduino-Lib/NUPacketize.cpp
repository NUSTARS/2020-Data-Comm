/*
  NUPacketize.cpp - 
    Library for sending packets to NUSTARS data comm app.

    Notes:
      crc32 implementation modified from https://gist.github.com/timepp
*/

#include "Arduino.h"
#include "NUPacketize.h"
// #include <cstdint>
#include <stdint.h>

NUPacketize::NUPacketize(){}

void NUPacketize::gen_crc_table(uint32_t(&table)[256])
{
  uint32_t polynomial = 0xEDB88320;
  for (uint32_t i = 0; i < 256; i++) 
  {
    uint32_t c = i;
    for (size_t j = 0; j < 8; j++) 
    {
      if (c & 1) {
        c = polynomial ^ (c >> 1);
      }
      else {
        c >>= 1;
      }
    }
    table[i] = c;
  }
}

uint32_t NUPacketize::calc_crc(uint32_t (&table)[256], uint32_t initial, std::vector<uint8_t> payload)
{
  uint32_t c = initial ^ 0xFFFFFFFF;
  uint8_t u[] = &payload[0];
  for (size_t i = 0; i < payload.size(); ++i) 
  {
    c = table[(c ^ u[i]) & 0xFF] ^ (c >> 8);
  }
  return c ^ 0xFFFFFFFF;
}

uint32_t get_crc(std::vector<uint8_t> payload)
{
  uint32_t table[256];
  NU::Packetize::gen_crc_table(table);
  uint32_t crc = NUPacketize::calc_crc(table, 0, payload);
  return crc;
}
