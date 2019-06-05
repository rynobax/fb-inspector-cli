import got from 'got';

const BASE_URL = 'https://fb-inspector-test.firebaseio.com/';

export function data(path: string) {
  return got(`${BASE_URL}${path}.json`);
}
