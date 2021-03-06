import { useState } from 'react';

import { createContainer } from 'react-tracked';

const initialState = {
  data: {},
  port: '',
  uploadData: {}
};

const useValue = () => useState(initialState);

export const { Provider, useTracked } = createContainer(useValue);