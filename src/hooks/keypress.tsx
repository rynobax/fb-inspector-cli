import React, { useContext, useEffect } from 'react';
import ScreenContext from 'context/ScreenContext';
import useFocus, { FocusableElement } from './focus';
import { Widgets } from 'blessed';

interface CallbackObj {
  [key: string]: () => void;
}

type CallbackFn = (k: string) => void;

type CB = CallbackFn | CallbackObj;

const useKeyPress = (element: FocusableElement, cbs: CB) => {
  // Track focus
  const screen = useContext(ScreenContext);
  const [focus] = useFocus();
  useEffect(() => {
    if (!screen) return;
    if (focus === element) {
      const onPress = (_: string, { name }: Widgets.Events.IKeyEventArg) => {
        if (typeof cbs === 'object') {
          const cb = cbs[name];
          if (cb) cb();
        } else {
          cbs(name);
        }
      };
      screen.on('keypress', onPress);
      return () => {
        screen.off('keypress', onPress);
      };
    } else {
      return;
    }
  }, [focus, cbs, element, screen]);
};

export default useKeyPress;
