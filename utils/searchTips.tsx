import { Tip } from "@/types/tips";

export const searchTips = (searchTerm: string, tips: Tip[]): Tip[] => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return tips.filter((tip) =>
    tip.tipTitle.toLowerCase().includes(lowerCaseSearchTerm)
  );
};
