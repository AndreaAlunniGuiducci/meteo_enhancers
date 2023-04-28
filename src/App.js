import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import BottomBar from "./components/BottomBar";
import CityDetail from "./pages/CityDetail";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:coord" element={<CityDetail />} />
      </Routes>
      <BottomBar />
    </div>
  );
}

export default App;
