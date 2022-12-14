import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page/HomePage";
import HotelsPage from "./pages/hotels-page/HotelsPage";
import SingleHotel from "./pages/single-hotel/SingleHotel";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginPage from "./pages/login-page/LoginPage";

import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels">
          <Route index element={<HotelsPage />} />
          <Route path=":hotelId" element={<SingleHotel />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
