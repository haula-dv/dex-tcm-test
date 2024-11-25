"use client";
import { MainContainer } from "@/components/container/MainContainer";
import { HeadPage } from "@/components/HeadPage";
import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";

const PortfolioMainContainer = () => {
  useEffect(() => {
    const container = document.querySelector(".portfolio");

    if (container) {
      // Escape special characters using double backslashes
      const elementsToRemoveClassesFrom = container.querySelectorAll(
        ".orderly-px-\\[60px\\], .desktop\\:orderly-px-\\[40px\\], .orderly-pt-\\[20px\\], .orderly-max-w-\\[1408px\\] .orderly-h-\\[100vh\\] .orderly-pb-\\[300px\\]"
      );

      // Remove the classes from each element
      elementsToRemoveClassesFrom.forEach((element: any) => {
        element.classList.remove(
          "orderly-px-[60px]",
          "desktop:orderly-px-[40px]",
          "orderly-pt-[20px]",
          "orderly-max-w-[1408px]",
          "orderly-h-[100vh]",
          "orderly-pb-[300px]"
        );
      });
    }
  }, []);

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MainContainer maxWidth={false}>
      <HeadPage title="Portfolio - Dex Tcmp" />
      {/* <Box className="portfolio" pt={"10px"}>
        {!mdUp ? <Portfolio /> : <PortfolioMobileContainer />}
      </Box> */}
    </MainContainer>
  );
};

export default PortfolioMainContainer;
