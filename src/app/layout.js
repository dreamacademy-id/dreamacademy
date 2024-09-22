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
        <meta name="description" content="Dream Academy adalah web tryout pertama di Indonesia Timur." />
        <meta property="og:title" content="Dream Academy Tryout" />
        <meta property="og:description" content="Dream Academy adalah web tryout pertama di Indonesia Timur" />
        <meta property="og:url" content="https://dreamacademy.id" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/logoDa.jpg" />
      </Head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://dreamacademy.id",
              "@type": "Organization",
              "name": "Dream Academy",
              "url": "https://dreamacademy.id",
              "logo": "https://example.id/logo.png",
              "sameAs": [
                "https://www.facebook.com/perusahaan",
                "https://www.instagram.com/perusahaan"
              ]
            }),
          }}
        />
      </body>
    </html>
  )
}