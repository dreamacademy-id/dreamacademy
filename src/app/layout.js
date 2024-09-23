export const metadata = {
  title: 'Dream Academy',
  description: 'Dream Academy adalah web tryout pertama di Indonesia Timur',
  keywords: 'dreamacademy, tryout, sbmptn',
  openGraph: {
    title: 'Dream Academy Tryout',
    description: 'Dream Academy adalah web tryout pertama di Indonesia Timur',
    url: 'https://dreamacademy.id',
    type: 'website',
  },
};

import Head from "next/head";
import "@/styles/style.scss";
import { AuthProvider } from "../../public/AuthContext";
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      <Head>
        <title>Dream Academy</title>
        <meta name="description" content="Dream Academy adalah web tryout pertama di Indonesia Timur" />
        <meta name="keywords" content="dreamacademy, tryout, sbmptn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Dream Academy Tryout" />
        <meta property="og:description" content="Dream Academy adalah web tryout pertama di Indonesia Timur" />
        <meta property="og:url" content="https://dreamacademy.id" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/logoDa.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Dream Academy",
              "url": "https://dreamacademy.id",
              "logo": "https://dreamacademy.id/logo.png",
              "sameAs": [
                "https://www.facebook.com/dreamacademy",
                "https://www.instagram.com/dreamacademy"
              ]
            }),
          }}
        />
      </Head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}