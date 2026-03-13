import type { Metadata } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { HeaderCanvas } from "@/components/header-canvas";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luiz Ozorio",
    template: "%s | Luiz Ozorio",
  },
  description:
    "I build control systems for intelligent software, where humans supervise AI agents executing complex tasks.",
  metadataBase: new URL("https://cloudpresser.com"),
  openGraph: {
    title: "Luiz Ozorio",
    description:
      "I build control systems for intelligent software, where humans supervise AI agents executing complex tasks.",
    url: "https://cloudpresser.com",
    siteName: "Luiz Ozorio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Luiz Ozorio",
    description:
      "I build control systems for intelligent software, where humans supervise AI agents executing complex tasks.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderCanvas />
          <div className="min-h-screen flex flex-col relative z-0">
            <Nav />
            <main className="flex-1 w-full max-w-[840px] mx-auto px-6 sm:px-10 pt-6 pb-12">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
