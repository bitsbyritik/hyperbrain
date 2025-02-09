import { Metadata } from "next";

const TITLE = "Hyperbrain - AI Powered Link Storage";
const DESCRIPTION =
  "Hyperbrain is an AI powered link storage that helps you save, organize, and interact with your links effortlessly. With AI-driven search and conversational capabilities, it transforms your saved links into actionable knowledge.";

// const PREVIEW_IMAGE_URL = "";
// const ALT_TITLE = "";

// const BASE_URL = "";

export const siteConfig: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  applicationName: "Hyperbrain",
  creator: "Ritik Singh",
  twitter: {
    creator: '@bitsbyritik',
    title: TITLE,
    description: DESCRIPTION,
    card: "summary_large_image"
  },
};
