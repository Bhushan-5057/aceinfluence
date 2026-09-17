import serviceData from "../data/services.json";

export const serviceCategories = serviceData.categories;

export const services = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({
    ...service,
    category: service.category || category.slug,
    categoryTitle: category.title,
  })),
);

export function getService(slug) {
  return services.find((service) => service.slug === slug);
}

export function getCategory(categorySlug) {
  return serviceCategories.find((category) => category.slug === categorySlug);
}
