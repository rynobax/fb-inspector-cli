import { useContext, useEffect } from 'react';
import { StdinContext } from 'ink';
import { Observable, Subscription } from 'rxjs';
import { map, filter, partition } from 'rxjs/operators';

type NavKeysMap = typeof navKeysMap;
const navKeysMap = {
  '\u001B[A': 'up' as const,
  '\u001B[B': 'down' as const,
  '\u001B[C': 'right' as const,
  '\u001B[D': 'left' as const,
  '\r': 'enter' as const,
};

function nonNull<T>(v: T | null): v is T {
  return v !== null;
}

export type NavKey = NavKeysMap[keyof NavKeysMap];

interface ContextContent {
  readonly stdin: NodeJS.ReadStream;
  readonly isRawModeSupported: boolean;
  readonly setRawMode: ((mode: boolean) => void) | undefined;
}

function makeObs({ stdin, setRawMode }: ContextContent) {
  const obs = new Observable<Buffer>(obs => {
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
    };
  }).pipe(map(String));
  return partition(buf => String(buf) in navKeysMap)(obs) as [
    Observable<string>,
    Observable<string>
  ];
}

interface UseKeyPressParams {
  onNav?: (key: NavKey) => void;
  onNonNav?: (key: string) => void;
}

export function useKeyPress({ onNav, onNonNav }: UseKeyPressParams) {
  const ctx = useContext(StdinContext);
  useEffect(() => {
    const [navKeyObs, nonNavKeyObs] = makeObs(ctx);
    const subs: Subscription[] = [];
    if (onNav)
      subs.push(
        navKeyObs
          .pipe(
            map(
              (c): NavKey | null => {
                switch (c) {
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
                  default:
                    return null;
                }
              }
            )
          )
          .pipe(filter(nonNull))
          .subscribe({ next: onNav })
      );
    if (onNonNav) subs.push(nonNavKeyObs.subscribe({ next: onNonNav }));
    return () => {
      subs.forEach(s => s.unsubscribe());
    };
  }, [onNav, onNonNav, ctx]);
}
