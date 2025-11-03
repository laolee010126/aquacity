import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "아쿠아시티 - 사우나와 유수풀이 있는 프리미엄 수영장",
  description: "사우나와 유수풀 시설을 갖춘 프리미엄 수영장. 초급부터 상급까지 맞춤형 수영 강습 프로그램을 제공합니다.",
  keywords: ["수영장", "사우나", "유수풀", "수영강습", "아쿠아로빅", "수영", "프리미엄 수영장", "아쿠아시티"],
  authors: [{ name: "아쿠아시티" }],
  creator: "아쿠아시티",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "아쿠아시티 - 사우나와 유수풀이 있는 프리미엄 수영장",
    description: "사우나와 유수풀 시설을 갖춘 프리미엄 수영장. 초급부터 상급까지 맞춤형 수영 강습 프로그램을 제공합니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "아쿠아시티",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "아쿠아시티 수영장",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "아쿠아시티 - 사우나와 유수풀이 있는 프리미엄 수영장",
    description: "사우나와 유수풀 시설을 갖춘 프리미엄 수영장. 초급부터 상급까지 맞춤형 수영 강습 프로그램을 제공합니다.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
