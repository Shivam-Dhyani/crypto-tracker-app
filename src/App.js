import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import { makeStyles } from "@mui/styles";
import CoinPage from "./pages/coinPage/CoinPage";
import Home from "./pages/home/Home";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#000",
    color: "#fff ",
    minHeight: "100vh ",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
