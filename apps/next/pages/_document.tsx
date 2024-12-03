import { Html, Head, Main, NextScript } from 'next/document'
import { Footer } from '.'
import { content } from '@/data/content'

export default function Document() {
  const { metadata } = content;

  return (
    <Html lang="en">
      <Head>
        <meta name="description" content={metadata.seo.description} />
        <meta name="keywords" content={metadata.seo.keywords.join(', ')} />
        <meta property="og:title" content={metadata.seo.title} />
        <meta property="og:description" content={metadata.seo.description} />
        <meta name="twitter:title" content={metadata.seo.title} />
        <meta name="twitter:description" content={metadata.seo.description} />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="bg-white">
        <Main />
        <NextScript />
      </body>
      <Footer
        callToAction="Let's work together"
        phoneNumber={metadata.contact.phone}
        address={metadata.contact.address}
        email={metadata.contact.email}
      />
    </Html>
  )
}
