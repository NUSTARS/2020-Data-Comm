import React from 'react';
import Select from 'react-select';
// import { flavourOptions } from './docs/data';

const labels = [
  { value: 'A1', label: 'A1'},
  { value: 'B2', label: 'B2'},
  { value: 'T1', label: 'T1'},
];

const DataDropDown = () => (
    <Select
      defaultValue={[labels[1]]}
      isMulti
      name="labels"
      options={labels}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );

  export default DataDropDown;