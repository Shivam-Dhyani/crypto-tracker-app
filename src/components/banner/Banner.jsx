import { Container, styled, Typography } from "@mui/material";
import Carousel from "./Carousel";

const CustomBanner = styled("div")({
  backgroundImage: "url(./banner.jpg)",
});

const CustomContainer = styled(Container)({
  height: 400,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  paddingTop: 25,
});

const Tagline = styled("div")({
  height: "40%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

const Banner = () => {
  return (
    <CustomBanner>
      <CustomContainer>
        <Tagline>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your Favorite Crypto Currency
          </Typography>
        </Tagline>
        <Carousel />
      </CustomContainer>
    </CustomBanner>
  );
};

export default Banner;
