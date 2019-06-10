import { useReducer } from 'react';

export type FocusableElement = 'path' | 'main';

type State = FocusableElement;

type Action = 'tab';

function reducer(state: State, action: Action) {
  if (action === 'tab') {
    if (state === 'main') return 'path';
    else return 'main';
  } else {
    throw Error();
  }
}

export default () => useReducer(reducer, 'path');
