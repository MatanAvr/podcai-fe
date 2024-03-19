import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Hero from "./components/Hero";
import LogoCollection from "./components/LogoCollection";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Highlights from "./components/Highlights";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Faq from "./components/Faq";

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
  return (
    <>
      <Hero />
      <Box>
        {/* <LogoCollection />
        <Divider /> */}
        {enabledSections.includes("Features") && (
          <>
            <Features />
            <Divider />
          </>
        )}
        {enabledSections.includes("Testimonials") && (
          <>
            <Testimonials />
            <Divider />
          </>
        )}
        {enabledSections.includes("Highlights") && (
          <>
            <Highlights />
            <Divider />
          </>
        )}
        {enabledSections.includes("Pricing") && (
          <>
            <Pricing />
            <Divider />
          </>
        )}
        {enabledSections.includes("Faq") && (
          <>
            <Faq />
            {/* <Divider /> */}
          </>
        )}
        <Footer />
      </Box>
    </>
  );
}
