import React from 'react';
import * as blessed from 'blessed';
import { render } from 'react-blessed';

import Main from './app/Main';

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'fb-inspector',
});

screen.key(['C-c'], () => {
  return process.exit(0);
});

render(<Main />, screen);
