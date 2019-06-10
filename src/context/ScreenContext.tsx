import React from 'react';
import { Widgets } from 'blessed';

const ScreenContext = React.createContext<Widgets.Screen | null>(null);

export default ScreenContext;
