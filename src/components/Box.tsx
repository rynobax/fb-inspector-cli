import React from 'react';
import { Widgets } from 'blessed';
import { PropsOf } from 'util/types';

const Box = React.forwardRef<Widgets.BoxElement, PropsOf<Widgets.BoxOptions>>((props, ref) =>
  React.createElement('box', { ...props, ref })
);

export default Box;
