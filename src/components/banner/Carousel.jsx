import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material";
import { CryptoState } from "../../contexts/CryptoContext";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const CustomCarousel = styled("div")({
  height: "50%",
  display: "flex",
  alignItems: "center",
});

const Carousel = () => {
  const [trendingCoinsList, setTrendingCoinsList] = useState([]);

  const { currency } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoinsList(data);
  };

  console.log(trendingCoinsList);

  // Exectes when this componenet is loaded first time & when currency changes
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trendingCoinsList.map((coin) => {
    return (
      <Link to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <CustomCarousel>
      <AliceCarousel
        disableDotsControls
        disableButtonsControls
        mouseTracking
        autoPlay
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
        items={items}
      />
    </CustomCarousel>
  );
};

export default Carousel;
