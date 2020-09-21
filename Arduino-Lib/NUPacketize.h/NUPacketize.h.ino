/*
  NUPacketize.cpp - 
    Library for sending packets to NUSTARS data comm app.
*/

// TODO: Write (or import?) crc32 function.

#pragma once

#include "Arduino.h"
#include <vector>
#include <map>
#include <cstdint>
#include <string_view>


#define types std::map<std::string_view, uint8_t> = {
    { "unsigned char", 0 },
    { "short unsigned int", 1 },
    { "unsigned int", 2 },
    { "long unsigned int", 3 },
    { "signed char", 4 },
    { "short int", 5 },
    { "int", 6 },
    { "long int", 7 },
    { "float", 8 },
    { "double", 9 } 
};

#define PROTOCOL_VERSION 0

class NUPacketize
{
  
  public:
    NUPacketize();
    ~NUPacketize();
    template <typename T>
    void addData(int, T);
    void sendPacket(int flags = 0);

  private:
    std::vector<uint8_t> _payload;
    
    template<typename T>
    struct Data
    {
      uint16_t id;
      uint8_t reserved;
      uint8_t type;
      T data;
      template<typename T>
      Data(const uint16_t i, T d, const int r = 0) :
              id(i), reserved(r), type(types.at(type_name<decltype(d)>())), data(d)
      {}
    };
    
    struct Header
    {
      uint8_t protocol;
      uint8_t flags;
      uint8_t payloadSize;
      uint32_t CRC;
//      std::vector<uint8_t> payload;
      Header(const uint8_t f = 0) :
                  protocol(PROTOCOL_VERSION), flags(f), 
                  payloadSize((uint8_t(_payload.size())), //payload(_payload)
                  // TODO: write crc32 function CRC(crc32(_payload))
      {}
    };
    
    template<typename T>
    std::vector<uint8_t> uint8Vectorize(T);

    template <typename T>
    constexpr auto type_name() noexcept;
}

template<typename T>
void addData(int id, T data)
{
  Data data = NUPacketize::Data(id, data);
  std::vector<uint8_t> newData = NUPacketize::uint8Vectorize(data);
  _payload.insert(_payload.end(), newData.begin(), newData.end());
  
}

void sendPacket(uint8_t flags = 0)
{
  Header header = Header();
  std::vector<uint8_t> header_vec = NUPacketize::uint8vectorize(header);
  std::vector<uint8_t> packet = header_vec.insert(header_vec.end(), _payload.begin(), payload.end())
  Serial.write(packet, packet.size());
}

template<typename T>
std::vector<uint8_t> uint8Vectorize(T)
{
  int n = sizeof(T);
  vector<uint8_t> vec;
  for(int y=0; n-->0; y++) {
      // big endian    
      vec.push_back((T>>(n*8))&0xff);
  }
  return vec;
}

template <typename T>
constexpr auto type_name() noexcept {
  std::string_view name, prefix, suffix;
#ifdef __clang__
  name = __PRETTY_FUNCTION__;
  prefix = "auto type_name() [T = ";
  suffix = "]";
#elif defined(__GNUC__)
  name = __PRETTY_FUNCTION__;
  prefix = "constexpr auto type_name() [with T = ";
  suffix = "]";
#elif defined(_MSC_VER)
  name = __FUNCSIG__;
  prefix = "auto __cdecl type_name<";
  suffix = ">(void) noexcept";
#endif
  name.remove_prefix(prefix.size());
  name.remove_suffix(suffix.size());
  return name;
}
