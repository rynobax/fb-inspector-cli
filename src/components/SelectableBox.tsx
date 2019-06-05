import React from 'react';
import { Box, BoxProps } from 'ink';

interface SelectableBoxProps extends BoxProps {
  selected?: boolean;
}

const SelectableBox: React.FC<SelectableBoxProps> = ({ selected, children, ...rest }) => {
  const prefix = selected ? '>' : ' ';
  return <Box {...rest}>{prefix}{children}</Box>
}

export default SelectableBox;
