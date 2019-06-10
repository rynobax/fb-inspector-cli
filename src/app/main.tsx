import React from 'react';
import usePath from 'hooks/path';
import Path from './Path';
import Explorer from './Explorer';
import Box from 'components/Box';

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const [path, pathDispatch] = usePath();
  return (
    <>
      <Box>
        <Path path={path} selected={true} pathDispatch={pathDispatch} />
      </Box>
      <Box top={1}>
        <Explorer path={[]} x={0} y={0} />
      </Box>
    </>
  );
};

export default Main;
