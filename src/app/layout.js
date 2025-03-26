import { Inter } from "next/font/google";
import "./globals.css";
import InstallPWA from "./components/InstallPWA";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Daily Kirana Needs",
//   description: "Daily Kirana Needs - Order online and get it delivered quick.",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <title>Dailyneeds delivering in minutes | VegaCart</title>

        {/* SEO Meta Tags */}
        <link rel="canonical" href="https://vegacartgo.com/" />
        <meta name="title" content="Dailyneeds delivering in minutes | VegaCart"/>
        <meta name="description" content="Get your daily grocery and kirana needs delivered in minutes with VegaCart – the fastest delivery service."/>
        <meta name="keywords" content="online grocery, kirana delivery, fastest delivery, VegaCart, daily needs delivery"/>
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
        <meta name="author" content="Vishal Yadav"/>

        {/* Open Graph Meta Tags (For Social Media) */}
        <meta property="og:title" content="Dailyneeds delivering in minutes | VegaCart"/>
        <meta property="og:site_name" content="VegaCart"/>
        <meta property="og:url" content="https://vegacartgo.com/"/>
        <meta property="og:description" content="Get your daily grocery and kirana needs delivered in minutes with VegaCart – the fastest delivery service."/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://vegacart.s3.us-east-2.amazonaws.com/public/github/landwind/og-image.png"/>

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dailyneeds delivering in minutes | VegaCart" />
        <meta name="twitter:description" content="Get your daily grocery and kirana needs delivered in minutes with VegaCart – the fastest delivery service." />
        <meta name="twitter:image" content="https://vegacart.s3.us-east-2.amazonaws.com/public/github/landwind/og-image.png" />
        <meta name="twitter:site" content="@vegacart" />
        <meta name="twitter:creator" content="@vegacart" />

        {/* Favicon and App Icons */}
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#69247C" /> */}

        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="/favicon/manifest.json"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#69247C"></meta>
        <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon"/>
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon"></link>
    </head>
      <body className={inter.className}>
          {children}
          <InstallPWA/>
      </body>
    </html>
  );
}
