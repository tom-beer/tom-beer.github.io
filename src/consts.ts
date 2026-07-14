import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Tom Beer",
  EMAIL: "tom1beer@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 6,
  NUM_PUBLICATIONS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Tom Beer",
  DESCRIPTION: "Tom Beer — researcher in causality, actionability and transportability of machine learning systems.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Posts on causal inference, machine learning and data science.",
};

export const PUBLICATIONS: Metadata = {
  TITLE: "Publications",
  DESCRIPTION: "Peer-reviewed papers and preprints.",
};

export const SOCIALS: Socials = [
  {
    NAME: "Google Scholar",
    ICON: "scholar",
    HREF: "https://scholar.google.com/citations?user=6wZ70dEAAAAJ&hl=en",
  },
  {
    NAME: "GitHub",
    ICON: "github",
    HREF: "https://github.com/tom-beer",
  },
  {
    NAME: "Hugging Face",
    ICON: "huggingface",
    HREF: "https://huggingface.co/tom-beer",
  },
  {
    NAME: "Twitter",
    ICON: "twitter",
    HREF: "https://twitter.com/aTomBeer",
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    HREF: "https://www.linkedin.com/in/tom-beer/",
  },
  {
    NAME: "Email",
    ICON: "email",
    HREF: "mailto:tom1beer@gmail.com",
  },
];
