import React from 'react';
import { Widgets } from 'blessed';
import { PropsOf } from 'util/types';

type NotWorking = 'bg' | 'fg';

type WorkingBoxOptions = Omit<Widgets.BoxOptions, NotWorking>;

const Box = React.forwardRef<Widgets.BoxElement, PropsOf<WorkingBoxOptions>>(
  (props, ref) => React.createElement('box', { ...props, ref })
);

export default Box;
