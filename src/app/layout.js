import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Daily Kirana Needs",
  description: "Daily Kirana Needs - Order online and get it delivered quick.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"></link>

      <head>
    <link rel="canonical" href="https://https://vegamart.com/" />
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"/> */}
      <meta name="viewport" content="width=100%, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>Dailyneeds delivering in minutes | VegaMart</title>

    <meta name="title" content="Dailyneeds delivering in minutes | VegaMart"/>
    <meta name="description" content="we are offering fastest delivery for our proucts."/>
    <meta name="robots" content="index, follow"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="language" content="English"/>
    <meta name="author" content="Vishal Yadav"/>

    <meta property="og:title" content="Dailyneeds delivering in minutes | VegaMart"/>
    <meta property="og:site_name" content="VegaMart"/>
    <meta property="og:url" content="https://https:/vegamart.com/"/>
    <meta property="og:description" content="Daily Kirana Needs"/>
    <meta property="og:type" content=""/>
    <meta property="og:image" content="https://vegamart.s3.us-east-2.amazonaws.com/public/github/landwind/og-image.png"/>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@vegamart" />
    <meta name="twitter:creator" content="@vegamart" />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    <link rel="manifest" href="/site.webmanifest"/>
    <meta name="msapplication-TileColor" content="#da532c"/>
    <meta name="theme-color" content="#ffffff"/>
    </head>

      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
