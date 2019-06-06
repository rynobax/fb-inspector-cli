import React from 'react';
import usePath from '../hooks/path';
import Box from '../components/SelectableBox';
import Path from './Path';
import { useKeyPress } from '../hooks/io';

setTimeout(() => {
  process.exit();
}, 10000);

const Main: React.FC = () => {
  const [path, pathDispatch] = usePath();
  useKeyPress({
    onNonNav: key => {
      if (key === '\x03') process.exit();
    },
  });
  return (
    <Box height="100%" width="100%" flexDirection="column">
      <Path path={path} selected={false} pathDispatch={pathDispatch} />
      <Box selected>All the data</Box>
    </Box>
  );
};

export default Main;
