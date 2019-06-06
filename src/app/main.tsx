import React from 'react';
// import usePath from '../hooks/path';
import Box from '../components/Box';
// import Path from './Path';
// import { useKeyPress } from '../hooks/io';
// import * as blessed from 'blessed';

const Main: React.FC = () => {
  return (
    <Box
      top="center"
      left="center"
      width="50%"
      height="50%"
      border={{ type: 'line' }}
      style={{ border: { fg: 'blue' } }}
    >
      Hello World!
    </Box>
  );
};

export default Main;
