import React from "react";

const {data, setData} = useDataState();
const {port, setPort} = usePortState();

class GetData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      version: 0,
      flags: 0
    };
  }

  componentDidMount() {
    setInterval( this.updateData,
    updateInterval)
  }

  async grabData() {
    if (!port) {
      const response = await fetch('/request-data/', {});
      const json = await response.json();

      // if no new data, return 0
      if (json.length == 0) { return 0; }
      // else return new data
      else { return json; }
      // else { return [json[0]['time'], json[0]['data']]; }
    }
  }

  async updateData() {
    const d = await this.grabData();
    console.log(d);
    if ( !d ) { return; }

    // d looks like: [{'version': 0, 'flags': 0, 'payloadSize': 0, 'seqNum': 0, 'checksum': 66047, 'time': '19:10:20', 'data': {0: 1, 1: 17}}, ...]
    // data of form: {'label1': {time1: value1, time2: value2, ...}, 'label2': ...}
    
    d.forEach(el => 
      Object.entries(el[data]).forEach(([key, val]) => 
        data[key][el[time]] = val
        )
      );

    setData(data);
  }    

}

export default GetData;