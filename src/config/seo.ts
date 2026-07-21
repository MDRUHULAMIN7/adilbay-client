export const SEO_CONFIG = {
  defaultTitle: "Furnixo — Premium Solid Wood Furniture Marketplace",
  titleTemplate: "%s | Furnixo",
  defaultDescription: "Crafting premium solid wood furniture tailored to fit modern houses. Conforming to high-end design aesthetics and AA accessibility standards.",
  keywords: ["premium furniture", "solid wood furniture", "modern walnut", "oak dining tables", "lounge chairs", "Furnixo marketplace"],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://furnixo.com",
    siteName: "Furnixo",
    images: [
      {
        url: "https://furnixo.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Furnixo Premium Furniture Showcase",
      },
    ],
  },
  twitter: {
    handle: "@furnixo",
    site: "@furnixo",
    cardType: "summary_large_image",
  },
} as const;
