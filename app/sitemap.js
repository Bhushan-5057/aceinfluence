import { services } from "../lib/services";

const baseUrl = "https://aceinfluence.com";

export default function sitemap() {
  const updatedAt = new Date();
  const corePages = ["", "/about", "/services", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: updatedAt,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  return [
    ...corePages,
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
