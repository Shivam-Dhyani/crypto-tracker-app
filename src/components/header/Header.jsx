import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold !important",
    fontFamily: "Montserrat",
    fontWeight: "bold !important",
    cursor: "pointer",
  },
}));

const Header = () => {
  const { title } = useStyles();
  const navigate = useNavigate();

  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography
            variant="h5"
            onClick={() => navigate("/")}
            className={title}
          >
            Crypto Hunter
          </Typography>
          <Select
            defaultValue={"INR"}
            style={{ width: 100, height: 40, marginRight: 15 }}
          >
            <MenuItem value={"INR"}>INR</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
