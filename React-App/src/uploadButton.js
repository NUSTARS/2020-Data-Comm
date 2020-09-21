import React, { useState, useEffect } from "react";
import { useTracked } from './globalState';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButton() {
  const classes = useStyles();
  const [state, setState] = useTracked();

  return (
    <div className={classes.root}>
      <input
        accept="bin"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={async (event) => {
          const files = event.target.files
          const formData = new FormData()
          formData.append('myFile', files[0])

          fetch('/upload-data/', {
            method: 'POST',
            'Content-Type': 'multipart/form-data',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.error(error)
          })

          async function getud() {
            const response = await fetch('/request-upload-data/', {});
            const json = await response.json();
        
            if (json.length === 0) { return 0; }
            else { return json; }
          }

          var ud = await getud();

          if ( !ud ) { return; }

          var mutdata = state.uploadData;
          console.log(ud);
          ud.forEach(el => 
            Object.entries(el['data']).forEach(([key, val]) => 
              { (key in mutdata) ? mutdata[key].append([el['time'], val]) : mutdata[key] = [[el['time'], val]]; }
              // data[key][el[time]] = val
              )
            );

          setState({uploadData: mutdata});
        }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
}