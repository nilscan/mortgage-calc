import React from 'react';
import '@fontsource/inter';
import './App.css';
import { CssVarsProvider } from "@mui/joy/styles";
import Content from './components/Content';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Mortgage calculator

        <CssVarsProvider>
          <Content/>
        </CssVarsProvider>
      </header>
    </div>
  );
}

export default App;
