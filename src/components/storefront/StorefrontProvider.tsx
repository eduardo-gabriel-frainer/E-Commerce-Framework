"use client";

import { createContext, ReactNode, useContext } from "react";
import type { StoreConfig } from "@/types/admin";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header/Header";
import { CartProvider } from "./CartProvider";

const StorefrontSettingsContext = createContext<StoreConfig | null>(null);

export function StorefrontProvider({
  settings,
  children,
}: {
  settings: StoreConfig;
  children: ReactNode;
}) {
  return (
    <StorefrontSettingsContext.Provider value={settings}>
      <CartProvider>
        <Header />
        {children}
        <Footer />
      </CartProvider>
    </StorefrontSettingsContext.Provider>
  );
}

export function useStorefrontSettings() {
  const settings = useContext(StorefrontSettingsContext);
  if (!settings) {
    throw new Error(
      "Storefront components must be rendered inside StorefrontProvider.",
    );
  }
  return settings;
}
