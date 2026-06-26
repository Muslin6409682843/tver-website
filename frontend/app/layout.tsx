import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.t-ver.com"),

  title: {
    default: "T-VER Thailand",
    template: "%s | T-VER Thailand",
  },

  description:
    "ศูนย์รวมข้อมูล T-VER Carbon Credit และ Carbon Footprint ของประเทศไทย เรียนรู้การลดก๊าซเรือนกระจก คาร์บอนเครดิต และแนวทางสู่ Net Zero",

  keywords: [
    "T-VER",
    "Carbon Credit",
    "Carbon Footprint",
    "Net Zero",
    "คาร์บอนเครดิต",
    "คาร์บอนฟุตพริ้นท์",
    "ลดก๊าซเรือนกระจก",
    "TGO",
  ],

 icons: {
  icon: "/favicon.ico",
  apple: "/images/icon.png",
},

  openGraph: {
    title: "T-VER Thailand",
    description:
      "ศูนย์รวมข้อมูล T-VER Carbon Credit และ Carbon Footprint ของประเทศไทย",
    url: "https://www.t-ver.com",
    siteName: "T-VER Thailand",
    locale: "th_TH",
    type: "website",
    images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
    },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={noto.className}>
        {children}
      </body>
    </html>
  );
}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "T-VER Thailand",
      url: "https://www.t-ver.com",
      logo: "https://www.t-ver.com/images/logo.png",
    }),
  }}
/>