import { useReducer } from 'react';

type Parts = string[];

interface ActionPush {
  type: 'push';
  path: string;
}

interface ActionPop {
  type: 'pop';
}

interface ActionEdit {
  type: 'edit';
  ndx: number;
  value: string;
}

export type PathAction = ActionPush | ActionPop | ActionEdit;

function reducer(parts: Parts, action: PathAction) {
  // console.log(action);
  switch (action.type) {
    case 'pop':
      const copy = parts;
      copy.pop();
      return copy;
    case 'push':
      return [...parts, action.path];
    case 'edit':
      return parts.map((s, i) => (i === action.ndx ? action.value : s));
  }
}

export default () => useReducer(reducer, ['example', 'path', 'with', 'content', 'last']);
