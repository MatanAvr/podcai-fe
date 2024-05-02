import { tryScrollToSection } from "../Utils/Utils";
import { useMyNavigation } from "./useMyNavigation";

export const useScrollToSection = () => {
  const { push } = useMyNavigation();

  const scrollToSection = (sectionId: string) => {
    const isScrolled = tryScrollToSection(sectionId);
    if (!isScrolled) {
      push("");
      setTimeout(() => {
        tryScrollToSection(sectionId);
      }, 250);
    }
  };

  return scrollToSection;
};
