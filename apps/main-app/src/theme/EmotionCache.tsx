'use client';
import * as React from 'react';
import createCache, { Options as OptionsOfCreateCache } from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';

export type NextAppDirEmotionCacheProviderProps = {
  /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
  options: Omit<OptionsOfCreateCache, 'insertionPoint'>;
  /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
  CacheProvider?: (props: {
    value: ReturnType<typeof createCache>;
    children: React.ReactNode;
  }) => React.JSX.Element | null;
  children: React.ReactNode;
};

export default function NextAppDirEmotionCacheProvider(props: NextAppDirEmotionCacheProviderProps) {
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let html = '';
    for (const name of names) {
      html += `<style data-emotion="${cache.key} ${name}">${cache.inserted[name]}</style>`;
    }
    return (
      <React.Fragment>
        {html.split('<style').map((chunk, index) =>
          index === 0 ? chunk : <style dangerouslySetInnerHTML={{ __html: chunk }} />
        )}
      </React.Fragment>
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
