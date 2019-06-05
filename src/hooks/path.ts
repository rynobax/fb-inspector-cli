import { useReducer } from 'react';

type State = string[];

interface ActionPush {
  type: 'push';
  path: string;
}

interface ActionPop {
  type: 'pop';
}

type Action = ActionPush | ActionPop;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'pop':
      const copy = state;
      copy.pop();
      return copy;
    case 'push':
      return [...state, action.path];
  }
}

export default () => useReducer(reducer, ['example', 'path']);
