import { Routes, Route } from "react-router-dom";

import { useGeneralContext } from "./contexts/general-context/GeneralContext";

import HomePage from "./pages/home-page/HomePage";
import HotelsPage from "./pages/hotels-page/HotelsPage";
import SingleHotel from "./pages/single-hotel/SingleHotel";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginPage from "./pages/login-page/LoginPage";

import "./App.css";

function App() {
  const { page } = useGeneralContext();

  return (
    <div>
      {page !== "login" && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels">
          <Route index element={<HotelsPage />} />
          <Route path=":hotelId" element={<SingleHotel />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {page !== "login" && <Footer />}
    </div>
  );
}

export default App;
