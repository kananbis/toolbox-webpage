export const SITE_CONFIG = {
  // Set PUBLIC_SITE_URL to the production domain when deploying.
  siteUrl: (process.env.PUBLIC_SITE_URL || "https://mfwtools.com").replace(/\/$/, ""),
  // Set PUBLIC_CONTACT_EMAIL to the real contact address before deploying.
  contactEmail: process.env.PUBLIC_CONTACT_EMAIL || "",
};
