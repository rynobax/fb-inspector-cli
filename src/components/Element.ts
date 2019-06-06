interface Border {
  type?: 'line' | 'bg';
  ch?: string;
  bg?: string;
  fg?: string;
  bold?: boolean;
  underline?: boolean;
}

interface Style {
  border?: Border;
}

export interface ElementProps {
  width?: string;
  height?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  border?: Border;
  style?: Style;
}
