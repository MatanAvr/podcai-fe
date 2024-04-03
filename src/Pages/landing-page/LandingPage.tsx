import Box from "@mui/material/Box";
import Hero from "./components/Hero";
import LogoCollection from "./components/LogoCollection";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Highlights from "./components/Highlights";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Faq from "./components/Faq";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hooks";
import { moveToPage } from "../../Features/Navigation/Navigation";
import BriefAndExample from "./components/BriefAndExample";

type sectionOptions =
  | "Features"
  | "Testimonials"
  | "Highlights"
  | "Pricing"
  | "Faq";

export const enabledSections: sectionOptions[] = [
  "Features",
  // "Testimonials",
  "Highlights",
  // "Pricing",
  "Faq",
];

export default function LandingPage() {
  const isAuth = useAppSelector((state) => state.user.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(moveToPage("Home"));
    }
  }, []);

  return (
    <>
      <Hero />
      <Box>
        {/* <LogoCollection /> */}
        {/* <BriefAndExample /> */}
        {enabledSections.includes("Features") && <Features />}
        {enabledSections.includes("Testimonials") && <Testimonials />}
        {enabledSections.includes("Highlights") && <Highlights />}
        {enabledSections.includes("Pricing") && <Pricing />}
        {enabledSections.includes("Faq") && <Faq />}
        <Footer />
      </Box>
    </>
  );
}
