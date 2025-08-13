import portfolioData from '../data/portfolio.json';

export interface PersonalInfo {
  name: string;
  title_one: string;
  title_two: string;
}

export interface HeroSection {
  title: string;
  content: string;
}

export interface Section {
  title: string;
  content?: string;
}

export interface Sections {
  header: Section;
  hero: HeroSection;
  about: Section;
  projects: Section;
  skills: Section;
  contact: Section;
  career: Section;
  scholarship: Section;
}

export interface CareerItem {
  company: string;
  period: string;
  position: string;
  description: string;
  location: string;
}

export interface ScholarshipItem {
  institution: string;
  period: string;
  degree: string;
  description: string;
  location: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  sections: Sections;
  career: CareerItem[];
  scholarship: ScholarshipItem[];
  projects: any[];
  skills: any[];
  navigation: any[];
  form: any;
  socials: any[];
  socialIcons: Record<string, string>;
  socialMessages: any;
  skillColors: Record<string, string>;
}

// Technology brand colors mapping
const techColors: Record<string, string> = {
  "React": "61DAFB",
  "Angular": "DD0031", 
  "Vue": "4FC08D",
  "TailwindCSS": "06B6D4",
  "TypeScript": "3178C6",
  "NestJS": "E0234E",
  "Node.js": "339933",
  "Express": "000000",
  "MongoDB": "47A248",
  "PostgreSQL": "336791",
  "JavaScript": "F7DF1E",
  "HTML": "E34F26",
  "CSS": "1572B6",
  "Docker": "2496ED",
  "Git": "F05032",
  "AWS": "FF9900",
  "Firebase": "FFCA28",
  "GraphQL": "E10098",
  "Python": "3776AB",
  "Java": "007396",
  "PHP": "777BB4",
  "Laravel": "FF2D20",
  "Symfony": "000000",
  "MySQL": "4479A1",
  "Redis": "DC382D",
  "Kubernetes": "326CE5",
  "Jenkins": "D24939",
  "Figma": "F24E1E",
  "Sketch": "F7B500"
};

export const usePortfolio = () => {
  const data = portfolioData as PortfolioData;
  
  const getSkillColor = (skillName: string): string => {
    return data.skillColors[skillName] || 'bg-gray-100 text-gray-700 dark:bg-gray-800/40 dark:text-gray-300 border border-gray-200 dark:border-gray-600';
  };

  const getTechColor = (skillName: string): string | undefined => {
    return techColors[skillName];
  };
  
  return {
    ...data,
    getSkillColor,
    getTechColor
  };
};