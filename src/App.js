import { lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import MobileHome from "./pages/MobileHome";
import BottomBar from "./components/BottomBar";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./components/Loading";
const MobileHome = lazy(() => import("./pages/MobileHome"));
const CityDetail = lazy(() => import("./pages/CityDetail"));

function App() {
  let screenWidth = window.innerWidth;
  return (
    <div className="App">
      <Routes>
        <Route
          path="/home"
          element={
            <Suspense fallback={<Loading />}>
              <MobileHome />
            </Suspense>
          }
        />
        <Route
          path="/detail/:coord"
          element={
            <Suspense fallback={<Loading />}>
              <CityDetail />
            </Suspense>
          }
        />
      </Routes>
      <BottomBar />
    </div>
  );
}

export default App;
