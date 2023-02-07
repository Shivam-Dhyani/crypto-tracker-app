import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import { withStyles } from "@material-ui/core";
import Header from "./components/header/Header";
import CoinPage from "./pages/coinPage/CoinPage";
import Home from "./pages/home/Home";
import "./App.css";

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#1416a",
      color: "white",
      minHeight: "100vh",
    },
  }));
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
