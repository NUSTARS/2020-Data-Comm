/*
  NUPacketize.cpp - 
    Library for sending packets to NUSTARS data comm app.

  Notes:
    crc32 implementation modified from https://gist.github.com/timepp
*/

// TODO: Write (or import?) crc32 function.

#pragma once

#include "Arduino.h"
#include <vector>
#include <map>
#include <cstdint>
#include <string_view>

constexpr std::map<std::string_view, uint8_t> TYPES = {
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

constexpr uint8_t PROTOCOL_VERSION 0

constexpr bool endian() // 1 if little, 0 if big
{
    int16_t number = 0x1;
    int8_t *numPtr = (uint8_t*)&number;
    return (numPtr[0] == 1);
}

class NUPacketize
{
  
  public:
    NUPacketize();
    // ~NUPacketize();
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
              id(i), reserved(r), type(TYPES.at(type_name<decltype(d)>())), data(d)
      {}
    };
    
    struct Header
    {
      uint8_t protocol;
      uint8_t flags;
      uint8_t payloadSize;
      uint32_t crc;
      Header(const uint8_t f = 0) :
                  protocol(PROTOCOL_VERSION), flags(f), 
                  payloadSize((uint8_t(_payload.size())),
                  crc(calc_crc(_payload))
      {}
    };
    
    template<typename T>
    std::vector<uint8_t> Serialize(T);

    template <typename T>
    constexpr auto type_name() noexcept;

    void gen_table(uint32_t(&table)[256]);
    uint32_t calc_crc(uint32_t (&table)[256], uint32_t initial, std::vector<uint8_t> payload);
    uint32_t get_crc(std::vector<uint8_t> payload);
}

template<typename T>
void NUPacketize::addData(int id, T data)
{
  Data data = NUPacketize::Data(id, data);
  std::vector<uint8_t> newData = NUPacketize::Serialize(data);
  _payload.insert(_payload.end(), newData.begin(), newData.end());
}

void NUPacketize::sendPacket(uint8_t flags = 0)
{
  Header header = Header();
  std::vector<uint8_t> header_vec = NUPacketize::Serialize(header);
  std::vector<uint8_t> packet = header_vec.insert(header_vec.end(), _payload.begin(), payload.end())
  Serial.write(&packet[0], packet.size());
  _payload.clear()
}

template<typename T>
std::vector<uint8_t> NUPacketize::Serialize(T data)
{
  std::vector<uint8_t> v;
  switch (type_name<decltype(data)>()) {
    case std::string_view "Data":
      uint8_t i[sizeof(data.id)], r[sizeof(data.reserved)], t[sizeof(data.type)], d[sizeof(data.data)];
      memcpy(i, &(data.id), sizeof(data.id));
      memcpy(r, &(data.reserved), sizeof(data.reserved));
      memcpy(t, &(data.type), sizeof(data.type));
      memcpy(d, &(data.data), sizeof(data.data));
      if (constexpr bool l = endian() == 1) {
        v.insert(v.end(), i.rbegin(), i.rend(),
                          r.rbegin(), r.rend(),
                          t.rbegin(), t.rend(),
                          d.rbegin(), d.rend());
      } else {
        v.insert(v.end(), i.begin(), i.end(),
                          r.begin(), r.end(),
                          t.begin(), t.end(),
                          d.begin(), d.end());
      }
      break;

    case std::string_view "Header":
      uint8_t p[sizeof(data.protocol)], f[sizeof(data.flags)], ps[sizeof(data.payloadSize)], c[sizeof(data.crc)];
      memcpy(p, &(data.protocol), sizeof(data.protocol));
      memcpy(f, &(data.flags), sizeof(data.flags));
      memcpy(ps, &(data.payloadSize), sizeof(data.payloadSize));
      memcpy(c, &(data.crc), sizeof(data.crc));
      if (constexpr bool l = endian() == 1) {
        v.insert(v.end(), p.rbegin(), p.rend(),
                          f.rbegin(), f.rend(),
                          ps.rbegin(), ps.rend(),
                          c.rbegin(), c.rend());
      } else {
        v.insert(v.end(), p.begin(), p.end(),
                          f.begin(), f.end(),
                          ps.begin(), ps.end(),
                          c.begin(), c.end());
      }
      break;
    
    default: // should never get here, but nonetheless
      uint8_t arr[sizeof(data)];
      memcpy(arr, &data, sizeof(data));
      if (constexpr bool l = endian() == 1) {
        v.insert(v.end(), data.rbegin(), data.rend());
      } else {
        v.insert(v.end(), data.begin(), data.end());
      }
      break;

    return v;
  }
}

template <typename T>
constexpr auto NUPacketize::type_name() noexcept {
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
