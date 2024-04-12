import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LANDING_PAGE_PY, SUPPORT_EMAIL } from "../../../ConstAndTypes/consts";

const faqArr = [
  {
    question: `How do I contact customer support if I have a question or issue?`,
    answer: (
      <>
        You can reach our team by emailing{" "}
        <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link> or through
        the <Link href={`/contact us`}>Contact us</Link> page.
      </>
    ),
  },
  {
    question: `Can I see the articles featured in each podcast?`,
    answer: ` Absolutely! Under the podcasts, you’ll find the sources and titles of the articles.
    Click on the hyperlinks to access the articles.`,
  },
  {
    question: `Can I change the topics for my podcasts?`,
    answer: `Yes, topics for your personalized podcasts can be
    changed at any time on the settings page.`,
  },
  {
    question: `At what time is my daily podcast produced?`,
    answer: `Your daily podcast is typically produced around 7:45 AM. 
    Additionally, we are in the process of developing a custom personalized scheduler feature.`,
  },
];

export default function Faq() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      id="Faq"
      sx={{
        py: LANDING_PAGE_PY,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: "100%" }}>
        {faqArr.map((faq, index) => {
          const faqId = `faq-${index}`;
          return (
            <Accordion
              key={`faq-accordion-${index}`}
              expanded={expanded === faqId}
              onChange={handleChange(faqId)}
            >
              <AccordionSummary
                id={`${faqId}-header`}
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${faqId}-content`}
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                <Typography component="h3" variant="subtitle1">
                  {faq.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography
                  gutterBottom
                  sx={{ maxWidth: { sm: "100%", md: "70%" } }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Container>
  );
}
