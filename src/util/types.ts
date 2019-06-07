export type PropsOf<T> = Omit<T, 'children'> & { children: React.ReactNode | React.ReactNode[] };
