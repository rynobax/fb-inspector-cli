import React, { useReducer } from 'react';
import { Box, Color } from 'ink';
import { useKeyPress, Key } from '../hooks/io';

interface PathProps {
  path: string[];
  selected: boolean;
}

const Path: React.FC<PathProps> = props => {
  const [selected, next] = useReducer((state: number, key: Key) => {
    switch (key) {
      case 'left':
        return Math.max(state - 1, 0);
      case 'right':
        return Math.min(state + 1, props.path.length - 1);
      default:
        return state;
    }
  }, 0);
  useKeyPress(next);
  return (
    <Box>
      {props.path.map((p, i) => {
        const isSelected = selected === i;
        return (
          <Box key={i}>
            <Color bgCyan={isSelected}>{p}</Color>
          </Box>
        );
      })}
    </Box>
  );
};

export default Path;
