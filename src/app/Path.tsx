import React, { useReducer } from 'react';
import { Box, Color } from 'ink';
import { useKeyPress, NavKey } from '../hooks/io';
import { PathAction } from '../hooks/path';
import TextInput from '../components/TextInput';

interface PathProps {
  path: string[];
  selected: boolean;
  pathDispatch: (action: PathAction) => void;
}

const Path: React.FC<PathProps> = props => {
  const [selected, next] = useReducer((state: number, key: NavKey) => {
    switch (key) {
      case 'left':
        return Math.max(state - 1, 0);
      case 'right':
        return Math.min(state + 1, props.path.length - 1);
      default:
        return state;
    }
  }, 0);
  useKeyPress({ onNav: next });
  return (
    <Box>
      {props.path.map((p, i) => {
        const isSelected = selected === i;
        const postfix = i === props.path.length - 1 ? '' : ' / ';
        return (
          <Box key={i}>
            <Color underline={isSelected}>
              <TextInput
                value={p}
                onChange={v => {
                  props.pathDispatch({ type: 'edit', ndx: i, value: v });
                }}
                disabled={!isSelected}
              />
            </Color>
            {postfix}
          </Box>
        );
      })}
    </Box>
  );
};

export default Path;
