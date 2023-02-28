import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material";
import { CryptoState } from "../../contexts/CryptoContext";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import "./carousel.css";

const CustomCarousel = styled("div")({
  height: "50%",
  display: "flex",
  alignItems: "center",
});

const CustomCarouselItem = styled(Link)({
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const priceWithCommas = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousel = () => {
  const [trendingCoinsList, setTrendingCoinsList] = useState([]);

  const { currency, currencySymbol } = CryptoState();

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
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <CustomCarouselItem
        to={`/coins/${coin.id}`}
        style={{ textDecoration: "none" }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span style={{ color: profit > 0 ? "green" : "red" }}>
            {/* If there is a positive value then there is no '+' sign before it, hence added this logic */}
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {currencySymbol} {priceWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </CustomCarouselItem>
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
