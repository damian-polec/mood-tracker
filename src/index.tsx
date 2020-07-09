import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme/Theme';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

