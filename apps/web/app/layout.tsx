import "@workspace/ui/globals.css";
import { Toaster } from "sonner";
import { cn } from "@workspace/ui/lib/utils";
import { aeonik, inter, siteConfig } from "@/config";
import { Providers } from "@/components/providers";

export const metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
          aeonik.variable,
          inter.variable,
        )}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
