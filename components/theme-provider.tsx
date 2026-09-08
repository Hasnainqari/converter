"use client";
import { createContext, useContext, useEffect, useState } from "react";
const C = createContext({ dark: false, toggle: () => {} });
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const s = localStorage.getItem("theme");
    setDark(
      s ? s === "dark" : matchMedia("(prefers-color-scheme: dark)").matches,
    );
  }, []);
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <C.Provider value={{ dark, toggle: () => setDark((x) => !x) }}>
      {children}
    </C.Provider>
  );
}
export const useTheme = () => useContext(C);
