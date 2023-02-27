import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
  CssBaseline,
  styled,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../../contexts/CryptoContext";

const CustomTypography = styled(Typography)({
  flex: 1,
  color: "gold !important",
  // fontFamily: "Montserrat",
  fontWeight: "bold !important",
  cursor: "pointer",
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <CustomTypography variant="h5" onClick={() => navigate("/")}>
              Crypto Hunter
            </CustomTypography>
            <Select
              defaultValue={"INR"}
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
