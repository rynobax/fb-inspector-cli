import React from 'react';
import { Widgets } from 'blessed';
import { PropsOf } from 'util/types';

const Text = React.forwardRef<Widgets.TextElement, PropsOf<Widgets.TextOptions>>((props, ref) =>
  React.createElement('text', { ...props, ref })
);

export default Text;
