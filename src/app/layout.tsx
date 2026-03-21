import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { GA_MEASUREMENT_ID } from "@/lib/constants";
import "./globals.css";

const swiza = localFont({
  variable: "--font-swiza",
  src: [
    { path: "../../public/fonts/swiza-thin-webfont.woff2", weight: "100", style: "normal" },
    { path: "../../public/fonts/swiza-thinitalic-webfont.woff2", weight: "100", style: "italic" },
    { path: "../../public/fonts/swiza-extralight-webfont.woff2", weight: "200", style: "normal" },
    { path: "../../public/fonts/swiza-extralightitalic-webfont.woff2", weight: "200", style: "italic" },
    { path: "../../public/fonts/swiza-light-webfont.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/swiza-lightitalic-webfont.woff2", weight: "300", style: "italic" },
    { path: "../../public/fonts/swiza-regular-webfont.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/swiza-regularitalic-webfont.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/swiza-medium-webfont.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/swiza-mediumitalic-webfont.woff2", weight: "500", style: "italic" },
    { path: "../../public/fonts/swiza-semibold-webfont.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/swiza-bold-webfont.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/swiza-bolditalic-webfont.woff2", weight: "700", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "ManaMind - Autonomous AI Quality Assurance for Video Games",
  description:
    "Human-like testing at machine scale. ManaMind delivers fully autonomous QA testing for video games - zero-shot, no code access, infinitely scalable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
            });
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={`${swiza.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
