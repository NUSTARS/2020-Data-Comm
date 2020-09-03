import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { useTracked } from './globalState';


export function SelectPort(props) {
  const initialState = {
    ports: [],
    selected: '',
    click: 0 // just to make useEffect run again
  };

  const [portState, setPortState] = useState(initialState);
  const [state, setState] = useTracked();

  useEffect(() => {
    fetch('/ports/').then(res => res.json())
      .then(data => {
        var options = [];
        data.ports.forEach(port => options.push(
          {
            value: port,
            label: port
          }
        ));
        setPortState({ports: options});
      });
  }, [portState.click])

  return (
    <div>
      <Select
        name="ports"
        options={portState.ports}
        className="basic-single"
        classNamePrefix="select"
        onChange={(selectedOption) => {
          setPortState({selected: selectedOption.value});
          console.log(selectedOption.value);

          setState({port: selectedOption.value});
      
          // send selected port to flask background thread
          fetch('/selected-port/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({port: selectedOption.value}),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Send port to Flask:', data);
          })
          .catch((error) => {
            console.error('Error in sending port:', error);
          });
        }}
      />
      <Button 
        variant="contained" 
        onClick={(() => setPortState({click: portState.click+1}))}>
          Refresh
      </Button>
    </div>
  );
}