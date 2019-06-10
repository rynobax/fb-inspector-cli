import React from 'react';
import * as blessed from 'neo-blessed';
import { createBlessedRenderer } from 'react-blessed';
import fs from 'fs';

const tsConfig = require('../tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './';
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});

fs.writeFileSync('log.txt', '');

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const stfy = (data: any) => JSON.stringify(data, getCircularReplacer());

console.log = (data: any) => {
  fs.writeFileSync('log.txt', `${stfy(data)}\n\n`, { flag: 'a' });
};

console.warn = (data: any) => {
  fs.writeFileSync('log.txt', `WARN:\n${stfy(data)}\n\n`, { flag: 'a' });
};

console.error = (data: any) => {
  fs.writeFileSync('log.txt', `ERROR:\n${stfy(data)}\n\n`, { flag: 'a' });
};

import Main from './app/Main';
import ScreenContext from 'context/ScreenContext';

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'fb-inspector',
});

screen.key(['C-c'], () => {
  return process.exit(0);
});

class ErrorBoundary extends React.Component {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      console.log(this.state.error.message);
      console.log(this.state.error.stack);
      return [this.state.error.message, this.state.error.stack];
    }

    return this.props.children;
  }
}

const render = createBlessedRenderer(blessed);

render(
  <ErrorBoundary>
    <ScreenContext.Provider value={screen}>
      <Main />
    </ScreenContext.Provider>
  </ErrorBoundary>,
  screen
);
