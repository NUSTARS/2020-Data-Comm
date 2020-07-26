import React from "react";
import Papa from 'papaparse';
// import Graph from "./graph"

// let fileReader;

class FileLoader extends React.Component {

  onChange(e) {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = e => {
      console.log(e.target.result);
      const results = Papa.parse(e.target.result, {dynamicTyping: true})
      console.log('readString: ', results)
    };
  }

  render() {
    return (
        <div onSubmit={this.onFormSubmit}>
          <input type="file" name="file" accept=".txt" onChange={e => this.onChange(e)} />
        </div>
    );
  }
}

export default FileLoader;