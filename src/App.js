import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import BottomBar from "./components/BottomBar";
import CityDetail from "./pages/CityDetail";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<CityDetail />} />
      </Routes>
      <BottomBar />
    </div>
  );
}

export default App;
