import type { Metadata } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { HeaderCanvas } from "@/components/header-canvas";
import { LayoutWrapper } from "@/components/layout-wrapper";
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
    "Staff AI Systems Engineer building production AI platforms — orchestration, evals, observability, and supervision for reliable LLM systems.",
  metadataBase: new URL("https://cloudpresser.com"),
  openGraph: {
    title: "Luiz Ozorio",
    description:
      "Staff AI Systems Engineer building production AI platforms — orchestration, evals, observability, and supervision for reliable LLM systems.",
    url: "https://cloudpresser.com",
    siteName: "Luiz Ozorio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luiz Ozorio",
    description:
      "Staff AI Systems Engineer building production AI platforms — orchestration, evals, observability, and supervision for reliable LLM systems.",
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
        <script src="https://cloudpresserai.com/chatbot-widget.js" data-chatbot-id="41c57ee0-2d59-4b50-81e9-aaf675a642db" async></script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderCanvas />
          <div className="min-h-screen flex flex-col relative z-0">
            <Nav />
            <LayoutWrapper>{children}</LayoutWrapper>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
