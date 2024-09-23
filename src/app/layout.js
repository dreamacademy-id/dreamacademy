export const metadata = {
  title: 'Dream Academy',
  description: 'Dream Academy adalah web tryout pertama di Indonesia Timur',
  keywords: 'dreamacademy, tryout, sbmptn',
  // openGraph: {
  //   title: 'Dream Academy Tryout',
  //   description: 'Dream Academy adalah web tryout pertama di Indonesia Timur',
  //   url: 'https://dreamacademy.id',
  //   type: 'website',
  // },
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
        <link rel="icon" href="/logoDa.jpg" />
      </Head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
