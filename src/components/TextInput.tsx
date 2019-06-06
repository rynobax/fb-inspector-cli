import React from 'react';
import { useKeyPress } from '../hooks/io';
import { Color } from 'ink';
import { BACKSPACE, isPrintable } from '../util/chars';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const TextInput: React.FC<TextInputProps> = props => {
  useKeyPress({
    onNonNav: v => {
      if (props.disabled) return;
      if (v === BACKSPACE) return props.onChange(props.value.slice(0, props.value.length - 1));
      if (isPrintable(v)) return props.onChange(props.value + v);
    },
  });
  return <Color>{props.value}</Color>;
};

export default TextInput;
