"use client";

import React, { createContext, useContext } from "react";
import { WeddingConfig } from "@/types/wedding";
import { weddingConfig as defaultWeddingConfig } from "@/config/wedding";

const WeddingConfigContext = createContext<WeddingConfig>(defaultWeddingConfig);

export function WeddingConfigProvider({
  config,
  children,
}: {
  config: WeddingConfig;
  children: React.ReactNode;
}) {
  return (
    <WeddingConfigContext.Provider value={config || defaultWeddingConfig}>
      {children}
    </WeddingConfigContext.Provider>
  );
}

export function useWeddingConfig(): WeddingConfig {
  const context = useContext(WeddingConfigContext);
  return context || defaultWeddingConfig;
}

export default WeddingConfigContext;
