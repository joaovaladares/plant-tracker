import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import PlantsGrid from "./pages/PlantsGrid";
import History from "./pages/History";
import PlantDetail from "./pages/PlantDetail";
import WateringSuccess from "./pages/WateringSuccess";
import AddPlant from "./pages/AddPlant";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter basename="/plant-tracker">
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plantas" element={<PlantsGrid />} />
          <Route path="/historico" element={<History />} />
          <Route path="/plant/:id" element={<PlantDetail />} />
          <Route path="/plant/:id/success" element={<WateringSuccess />} />
          <Route path="/add" element={<AddPlant />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
