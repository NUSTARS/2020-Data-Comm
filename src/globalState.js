import React, { createContext } from "react";

const dataInitState = {data: {}, setData: undefined};
const portInitState = {port: '', setPort: undefined};

const DataStateContext = createContext(dataInitState);
const PortStateContext = createContext(portInitState);

/**
 * Global State provider & hooks
 */
const GlobalStateProvider = ({ children }) => {
  const [data, setData] = React.useState(dataInitState.data);
  const [port, setPort] = React.useState(portInitState.port);
  const dataContextValue = React.useMemo(() => ({data, setData}), [data]);
  const portContextValue = React.useMemo(() => ({port, setPort}), [port]);

  return (
    <DataStateContext.Provider value={dataContextValue}>
      <PortStateContext.Provider value={portContextValue}>
          {(typeof children === 'undefined') ? {} : children}
      </PortStateContext.Provider>
    </DataStateContext.Provider>
  );
};

export const useDataState = () => React.useContext(DataStateContext);
export const usePortState = () => React.useContext(PortStateContext);
export default GlobalStateProvider;