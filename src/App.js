import { styled } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
// import Page404 from "./components/mira/Page404";

import CoinPage from "./pages/coinPage/CoinPage";
import Home from "./pages/home/Home";

const CustomApp = styled("div")({
  backgroundColor: "#000",
  color: "#fff ",
  minHeight: "100vh ",
});

function App() {
  return (
    <BrowserRouter>
      <CustomApp>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/mira" element={<Page404 />} /> */}
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </CustomApp>
    </BrowserRouter>
  );
}

export default App;
