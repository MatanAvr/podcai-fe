import Box from "@mui/material/Box";
import Hero from "./components/Hero";
// import LogoCollection from "./components/LogoCollection";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Highlights from "./components/Highlights";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Faq from "./components/Faq";
import { useEffect } from "react";
import { useAppSelector } from "../../Hooks/useStoreHooks";
import BriefAndExample from "./components/BriefAndExample";
import { useMyNavigation } from "../../Hooks/useMyNavigation";

type LandingPageSectionsOptions =
  | "Features"
  | "Testimonials"
  | "Highlights"
  | "Pricing"
  | "Faq";

export const enabledLandingPageSections: LandingPageSectionsOptions[] = [
  "Features",
  // "Testimonials",
  "Highlights",
  // "Pricing",
  "Faq",
];

export default function LandingPage() {
  const isAuth = useAppSelector((state) => state.user.auth);
  const nav = useMyNavigation();

  useEffect(() => {
    if (isAuth) {
      nav.push("Home");
    }
  }, [isAuth]);

  return (
    <>
      <Hero />
      <Box>
        {/* <LogoCollection /> */}
        <BriefAndExample />
        {enabledLandingPageSections.includes("Features") && <Features />}
        {enabledLandingPageSections.includes("Testimonials") && (
          <Testimonials />
        )}
        {enabledLandingPageSections.includes("Highlights") && <Highlights />}
        {enabledLandingPageSections.includes("Pricing") && <Pricing />}
        {enabledLandingPageSections.includes("Faq") && <Faq />}
        <Footer />
      </Box>
    </>
  );
}
