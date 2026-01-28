/**
 * ThemeProvider Component
 * 
 * Next.js uygulaması için tema yönetimi sağlayan wrapper component.
 * next-themes kütüphanesini kullanarak dark/light mode desteği sunar.
 * 
 * Bu component'in görevi next-themes'in ThemeProvider'ını wrap etmek
 * ve type-safe bir interface sağlamaktır.
 */
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// next-themes ThemeProvider'ının tüm prop'larını al
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * ThemeProvider component'i - Tema yönetimi için wrapper
 * @param children - Tema sağlanacak child component'ler
 * @param props - next-themes ThemeProvider'a aktarılacak diğer prop'lar
 *                (attribute, defaultTheme, enableSystem, vs.)
 * @returns NextThemesProvider ile sarmalanmış children
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Tüm prop'ları next-themes ThemeProvider'a aktar
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
