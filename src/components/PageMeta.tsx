import { useEffect } from "react";

type PageMetaProps = {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function PageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  ogUrl,
  canonical,
  jsonLd,
}: PageMetaProps) {
  useEffect(() => {
    document.title = title;

    if (description) upsertMeta("name", "description", description);
    if (ogTitle) upsertMeta("property", "og:title", ogTitle);
    if (ogDescription) upsertMeta("property", "og:description", ogDescription);
    if (ogUrl) upsertMeta("property", "og:url", ogUrl);
    upsertMeta("property", "og:type", "website");
    upsertMeta("name", "twitter:card", "summary_large_image");
    if (ogTitle) upsertMeta("name", "twitter:title", ogTitle);
    if (ogDescription) upsertMeta("name", "twitter:description", ogDescription);
    if (canonical) upsertLink("canonical", canonical);

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      script?.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogUrl, canonical, jsonLd]);

  return null;
}
