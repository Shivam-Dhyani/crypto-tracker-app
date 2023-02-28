import {
  Container,
  createTheme,
  LinearProgress,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../contexts/CryptoContext";

const CustomTableCell_1 = styled(TableCell)({
  color: "black",
  fontWeight: "700",
});

const CustomTableCell_2 = styled(TableCell)({
  display: "flex",

  gap: 15,
});

const CustomTableRow = styled(TableRow)({});

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();

  const navigate = useNavigate();

  const { currency, currencySymbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);

    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const priceWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryprocurrency Prices by Markey Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(event) => setSearch(event.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  <CustomTableCell_1>Coin</CustomTableCell_1>
                  <CustomTableCell_1 align="right">Price</CustomTableCell_1>
                  <CustomTableCell_1 align="right">
                    24H Change
                  </CustomTableCell_1>
                  <CustomTableCell_1 align="right">
                    Market Cap
                  </CustomTableCell_1>
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <CustomTableRow
                      key={row.name}
                      onClick={() => navigate(`/coins/${row.id}`)}
                    >
                      <CustomTableCell_2 component="th" scope="row">
                        <img
                          src={row.image}
                          alt={row.name}
                          //   height="50"
                          width="50"
                          //   style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span style={{ textTransform: "uppercase" }}>
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </CustomTableCell_2>
                      <TableCell
                        align="right"
                        // style={{
                        //   color: profit > 0 ? "green" : "red",
                        //   fontWeight: 500,
                        // }}
                      >
                        {currencySymbol}{" "}
                        {priceWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "green" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}{" "}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {currencySymbol}{" "}
                        {priceWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </CustomTableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
