import { Tip } from "@/types/tips";

export const searchTips = (searchTerm: string, tips: Tip[]): Tip[] => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return tips.filter(
    (tip) =>
      tip.tipTitleAr.toLowerCase().includes(lowerCaseSearchTerm) ||
      tip.tipTitleEn.toLowerCase().includes(lowerCaseSearchTerm)
  );
};
