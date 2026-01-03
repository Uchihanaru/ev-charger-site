import Script from "next/script";

export default function AdSenseScript() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6555002531671472"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}