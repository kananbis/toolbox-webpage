export const SITE_CONFIG = {
  // Set PUBLIC_SITE_URL to the production domain when deploying.
  siteUrl: (process.env.PUBLIC_SITE_URL || "https://mfwtools.com").replace(/\/$/, ""),
  // Set PUBLIC_CONTACT_EMAIL to the real contact address before deploying.
  contactEmail: process.env.PUBLIC_CONTACT_EMAIL || "",
  adsenseClientId: process.env.PUBLIC_ADSENSE_CLIENT_ID || "",
  enableAdsense: process.env.PUBLIC_ENABLE_ADSENSE === "true",
};

export const ADSENSE_SLOTS = {
  toolTop: process.env.PUBLIC_ADSENSE_SLOT_TOOL_TOP || "",
  toolBottom: process.env.PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM || "",
  homeMiddle: process.env.PUBLIC_ADSENSE_SLOT_HOME_MIDDLE || "",
};
