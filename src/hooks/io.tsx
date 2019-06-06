import { useContext, useState } from 'react';
import { StdinContext } from 'ink';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

function nonNull<T>(v: T | null): v is T {
  return v !== null;
}

export type Key = 'up' | 'down' | 'left' | 'right' | 'enter';

interface ContextContent {
  readonly stdin: NodeJS.ReadStream;
  readonly isRawModeSupported: boolean;
  readonly setRawMode: ((mode: boolean) => void) | undefined;
}

function makeObs({ stdin, setRawMode }: ContextContent) {
  return new Observable<Buffer>(obs => {
    const dataFn = (data: Buffer) => obs.next(data);
    const errFn = (err: Error) => obs.error(err);
    const finishFn = () => obs.complete();

    stdin.addListener('data', dataFn);
    stdin.addListener('error', errFn);
    stdin.addListener('close', finishFn);
    if (setRawMode) setRawMode(true);

    return () => {
      stdin.removeListener('data', dataFn);
      stdin.removeListener('error', errFn);
      stdin.removeListener('close', finishFn);
      if (setRawMode) setRawMode(false);
    };
  })
    .pipe(
      map(
        (buf): Key | null => {
          console.log(buf);
          switch (String(buf)) {
            case '\u001B[A':
              return 'up' as const;
            case '\u001B[B':
              return 'down' as const;
            case '\u001B[D':
              return 'left' as const;
            case '\u001B[C':
              return 'right' as const;
            case '\r':
              return 'enter' as const;
            case '\x03':
              // ctrl + c
              return process.exit();
            default:
              return null;
          }
        }
      )
    )
    .pipe(filter(nonNull));
}

export function useKeyPress(onMsg: (key: Key) => void) {
  const ctx = useContext(StdinContext);
  const [obs] = useState(() => makeObs(ctx).subscribe({ next: onMsg }));
  return obs;
}
