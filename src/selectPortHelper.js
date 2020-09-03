import React from 'react';
import { useTracked } from './globalState';

export function SetPortHelper(p) {
  const [state, setState] = useTracked();

  setState({ port: p })
}

// export default SetPortHelper;