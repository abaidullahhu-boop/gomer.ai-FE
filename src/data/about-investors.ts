const ASSET_BASE = "https://gomer.com";

export function investorAsset(path: string) {
  return `${ASSET_BASE}${path}`;
}

export type Investor = {
  name: string;
  avatarFile: string;
  company?: string;
  companyLogo?: string;
};

export const investors: Investor[] = [
  { name: "Koen Bok", avatarFile: "koen", company: "Framer", companyLogo: "framer-wordmark-white.png" },
  { name: "Jorn van Dijk", avatarFile: "van-dijk", company: "Framer", companyLogo: "framer-wordmark-white.png" },
  { name: "Joel Hellermark", avatarFile: "joel", company: "Sana", companyLogo: "sana-wordmark-white.png" },
  { name: "Guillermo Rauch", avatarFile: "guillermo", company: "Vercel", companyLogo: "vercel-wordmark-white.png" },
  { name: "Alex Bouaziz", avatarFile: "alex", company: "Deel", companyLogo: "deel-wordmark-white.png" },
  { name: "Stewart Butterfield", avatarFile: "stewart", company: "Slack", companyLogo: "slack-wordmark-white.png" },
  { name: "Cal Henderson", avatarFile: "cal", company: "Slack", companyLogo: "slack-wordmark-white.png" },
  { name: "Harry Stebbings", avatarFile: "harry", company: "20VC", companyLogo: "20vc-wordmark-white.png" },
  { name: "Max Mullen", avatarFile: "max", company: "Instacart", companyLogo: "instacart-wordmark-white.png" },
  { name: "Nico Rosberg", avatarFile: "rosberg" },
  { name: "Lenny Rachitsky", avatarFile: "lenny" },
  { name: "Shaan Puri", avatarFile: "shaan" },
  { name: "Charlie Songhurst", avatarFile: "charlie" },
  { name: "Daniel Gross", avatarFile: "daniel" },
  { name: "Nat Friedman", avatarFile: "nat" },
  { name: "Mati Staniszewski", avatarFile: "mati" },
  { name: "Bartek Pucek", avatarFile: "bartek" },
  { name: "Shawn Wang", avatarFile: "swyx" },
];

export type FunderLogo = {
  label: string;
  href: string;
  src: string;
  heightRem?: number;
  widthRem?: number;
};

export type FunderCell = {
  logos: FunderLogo[];
};

export const funderCells: FunderCell[] = [
  {
    logos: [
      {
        label: "Inovo Venture Partners",
        href: "https://inovo.vc/",
        src: "/assets/companies/logos/inovo-wordmark.svg",
        heightRem: 1.5,
        widthRem: 6,
      },
      {
        label: "Accel",
        href: "https://www.accel.com/",
        src: "/assets/companies/logos/accel-wordmark.svg",
        heightRem: 1.5,
        widthRem: 4.625,
      },
    ],
  },
  {
    logos: [
      {
        label: "BEK Ventures",
        href: "https://www.bekventures.com/",
        src: "/assets/companies/logos/bek-wordmark.svg",
        heightRem: 1.5,
        widthRem: 5.5,
      },
    ],
  },
  {
    logos: [
      {
        label: "Tenacity Capital",
        href: "https://www.tenacity-cap.com/",
        src: "/assets/companies/logos/tenacity-capital-wordmark.svg",
        heightRem: 1.75,
        widthRem: 11.25,
      },
    ],
  },
  {
    logos: [
      {
        label: "Leonis Capital",
        href: "https://www.leoniscap.com/",
        src: "/assets/companies/logos/leonis-wordmark.svg",
        heightRem: 1.5,
        widthRem: 6.5,
      },
    ],
  },
  {
    logos: [
      {
        label: "Oxford Seed Fund",
        href: "https://www.sbs.ox.ac.uk/research/centres-and-initiatives/oxford-said-entrepreneurship-centre/oxford-seed-fund",
        src: "/assets/companies/logos/oxford-seed-fund-wordmark.svg",
        heightRem: 1.5,
        widthRem: 7.5,
      },
    ],
  },
];
