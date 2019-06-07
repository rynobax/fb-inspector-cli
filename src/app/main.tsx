import React from 'react';
import usePath from 'hooks/path';
// import Box from '../components/Box';
import Path from './Path';
// import { useKeyPress } from '../hooks/io';
// import * as blessed from 'blessed';

const Main: React.FC = () => {
  const [path, pathDispatch] = usePath();
  return <Path path={path} selected={true} pathDispatch={pathDispatch} />;
};

export default Main;
