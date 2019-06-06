import React from 'react';
import { ElementProps } from './Element';

interface BoxProps extends ElementProps {}

const Box: React.FC<BoxProps> = ({ children, ...props }) =>
  React.createElement('box', props, children);

export default Box;
