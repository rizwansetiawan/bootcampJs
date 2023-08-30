import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import createEmotionCache, { defaultCache } from "./createEmotionCache";
import { CacheProvider } from '@emotion/react'
import { ClientStyleContext } from './context'

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(defaultCache)

  function reset() {
    setCache(createEmotionCache())
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ClientCacheProvider>
        <RemixBrowser />
      </ClientCacheProvider>
    </StrictMode>
  );
});