import { useEffect, useState } from 'react';
import got from 'got';

const PROJECT_ID = 'fb-inspector-test';

const FBURL = `https://${PROJECT_ID}.firebaseio.com/`;

const client = got.extend({
  baseUrl: FBURL,
});

type FBPrimitive = string | number | boolean;

type Response = FBPrimitive | { [key: string]: FBPrimitive } | null;

const useFirebase = (pathParts: string[]) => {
  const [data, setData] = useState<Response | undefined>(undefined);
  const path = pathParts.join('/');
  useEffect(() => {
    client
      .get(path + '.json?shallow=true')
      .then(res => {
        setData(JSON.parse(res.body));
      })
      .catch(err => console.error(err));
  }, [path]);
  return { data, loading: data === undefined };
};

export default useFirebase;
