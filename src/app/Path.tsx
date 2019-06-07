import React, { useRef, useLayoutEffect } from 'react';
import { Widgets } from 'blessed';
import { PathAction } from 'hooks/path';
import Box from 'components/Box';
import Text from 'components/Text';

interface PathProps {
  path: string[];
  selected: boolean;
  pathDispatch: (action: PathAction) => void;
}

const Path: React.FC<PathProps> = props => {
  const ref = useRef<Widgets.BoxElement>(null);
  useLayoutEffect(() => {
    setTimeout(() => {
      if (!ref.current) return;
      console.log('doing it');
      const { key, enableKeys, focus } = ref.current;
      focus();
      enableKeys();
      key('a', function() {
        console.log('wo');
      });
    }, 300);
  });
  let i = 0;
  return (
    <Box ref={ref}>
      {props.path.map(p => {
        const offset = i;
        i += p.length + 1;
        return (
          <Text key={i} left={offset}>
            {p}
          </Text>
        );
      })}
    </Box>
  );
};

export default Path;
