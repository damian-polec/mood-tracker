import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnUtils from '@date-io/date-fns';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './containers/Content/Content';


function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnUtils}>
      <div className="App">
        <Header/>
        <Sidebar/>
        <Content/>
      </div>  
    </MuiPickersUtilsProvider>
  );
}

export default App;
