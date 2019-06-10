import React from 'react';
import Box from 'components/Box';
import Text from 'components/Text';
import useFirebase from 'hooks/firebase';
import { last } from 'lodash';

interface ExplorerProps {
  path: string[];
  y: number;
  x: number;
}

const Explorer: React.FC<ExplorerProps> = props => {
  const { data, loading } = useFirebase(props.path);
  let content = <Text>Loading!</Text>;
  const key = last(props.path);
  let height = 1;
  if (!loading) {
    console.log(props.path);
    if (typeof data === 'object' && data !== null) {
      height = Object.keys(data).length;
      content = (
        <>
          <Text>{key}</Text>
          {Object.keys(data).map((k, i) => {
            return (
              <Explorer
                key={k}
                path={[...props.path, k]}
                y={i + 1}
                x={props.path.length + 1}
              />
            );
          })}
        </>
      );
    } else {
      const str = `${key}: ${JSON.stringify(data)}`;
      console.log(str);
      content = <Text>{str}</Text>;
    }
  }
  return (
    <Box top={props.y} left={props.x} height={height}>
      {content}
    </Box>
  );
};

export default Explorer;
