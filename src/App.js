import React, { createContext } from "react";
import MiniDrawer from "./drawer";
import GlobalStateProvider from './globalState';

// const dataInitState = {data: {}, setData: undefined};
// const portInitState = {port: '', setPort: undefined};

// const DataStateContext = createContext(dataInitState);
// const PortStateContext = createContext(portInitState);

// /**
//  * Global State provider & hooks
//  */
// const GlobalStateProvider = ({ children }) => {
//   const [data, setData] = React.useState(dataInitState.data);
//   const [port, setPort] = React.useState(portInitState.port);
//   const dataContextValue = React.useMemo(() => ({data, setData}), [data]);
//   const portContextValue = React.useMemo(() => ({port, setPort}), [port]);

//   return (
//     <DataStateContext.Provider value={dataContextValue}>
//       <PortStateContext.Provider value={portContextValue}>
//           {children}
//       </PortStateContext.Provider>
//     </DataStateContext.Provider>
//   );
// };

// export const useDataState = () => React.useContext(DataStateContext);
// export const usePortState = () => React.useContext(PortStateContext);

const App = () => {

  return ( 
    <GlobalStateProvider>
      <div>
        <MiniDrawer/>
      </div>
    </GlobalStateProvider>
  )
}

export default App;


// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       version: 0,
//       flags: 3,
//       size: 2,
//       checksum: 4,
//       data: {},
//       time: 0,
//       test: [0,1,2,3]
//     }
//   };

//   // componentDidMount() {
//   //   fetch('/time/'+this.state.test).then(res => res.json()).then(data => {
//   //     this.setState({time: data.time, test: data.test});
//   //   }, [])
//   // }

//   // componentDidUpdate() {
//   //   fetch('/time/'+this.state.test).then(res => res.json()).then(data => {
//   //     this.setState({time: data.time, test: data.test});
//   //   }, []);
//   //   // console.log(this.state.version);
//   // }

//   render() {
//     return (
//       <GlobalStateProvider>
//       <div>
//         <MiniDrawer/>
//       </div>
//       </GlobalStateProvider>
//     );
//   }
// }

// export default App;