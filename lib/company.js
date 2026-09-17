import companyConfig from "../data/company.json";

const name = process.env.NEXT_PUBLIC_COMPANY_NAME || "Aceinfluence";
const address =
  process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
  "55 Village Center Place, Mississauga, ON, L4Z 1S2";
const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "647-313-7276";
const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@aceinfluence.com";

const company = {
  name,
  shortName: companyConfig.shortName,
  address,
  phone,
  email,
  mapQuery: address,
  hours: companyConfig.hours,
  socials: companyConfig.socials,
  tagline: companyConfig.tagline,
  description: companyConfig.description,
  footerLabels: companyConfig.footerLabels,
  footerBlurb: companyConfig.footerBlurb,
  copyright: `${name}. All rights reserved.`,
};

export { company };
export default company;
