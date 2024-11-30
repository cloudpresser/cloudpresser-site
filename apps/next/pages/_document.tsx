import { Html, Head, Main, NextScript } from 'next/document'
import { Footer } from '.'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" />
      </Head>
      <body className="bg-white">
        <Main />
        <NextScript />
      </body>
      <Footer
        callToAction="Let's work together"
        phoneNumber='(919) 355-6557'
        address='Raleigh, NC'
      />
    </Html>
  )
}
