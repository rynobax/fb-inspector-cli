import React, { useState } from 'react';
import { PathAction } from 'hooks/path';
import Box from 'components/Box';
import Text from 'components/Text';
import useKeyPress from 'hooks/keypress';

interface PathProps {
  path: string[];
  selected: boolean;
  pathDispatch: (action: PathAction) => void;
}

const Path: React.FC<PathProps> = props => {
  let off = 0;
  const [active, setActive] = useState(1);

  useKeyPress('path', {
    left: () => {
      setActive(active - 1);
    },
    right: () => {
      setActive(active + 1);
    },
  });

  return (
    <Box style={{ bg: 'yellow' }}>
      {props.path.map(p => {
        const offset = off;
        off += p.length + 1;
        return (
          <Box key={off} left={offset} width={p.length}>
            {p}
          </Box>
        );
      })}
    </Box>
  );
};

export default Path;
