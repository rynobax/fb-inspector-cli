import React from 'react';
// import { Box } from 'ink';
import usePath from '../hooks/path';
import Box from '../components/SelectableBox'

setInterval(() => {}, 1000000);

const Main: React.FC = () => {
  const [path] = usePath();

  return (
    <Box height="100%" width="100%" flexDirection="column">
      <Box>{path.join('/')}</Box>
      <Box selected>All the data</Box>
    </Box>
  );
};

export default Main;
