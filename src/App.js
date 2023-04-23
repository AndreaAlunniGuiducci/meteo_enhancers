import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import BottomBar from "./components/BottomBar";
import CityDetail from "./pages/CityDetail";

function App() {
  return (
    <div className="App">
      <Home />
      {/* <CityDetail/> */}
      <BottomBar />
    </div>
  );
}

export default App;
