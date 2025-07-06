import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Kernel } from './Kernel';
import { ChakraProvider } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import 'react-tooltip/dist/react-tooltip.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <>
      <ChakraProvider theme={chakraTheme}>
        <BrowserRouter>
          <Kernel />
        </BrowserRouter>
      </ChakraProvider>
    </>
  </React.StrictMode>
);

reportWebVitals();
