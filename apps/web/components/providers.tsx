"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/global/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
      {children}
    </ThemeProvider>
  )
}
