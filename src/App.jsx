import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing.page";
import FlashAnzan from "./pages/flash-anzan";
import FlashAnzanCardWrapper from "./pages/flash-anzan-card-wrapper";
import Register from "./pages/register";
import Login from "./pages/login";
import Layout from "./pages/layout";
import Videos from "./pages/videos";
import Materials from "./pages/materials";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/dashboard";
import MemoryGame from "./pages/memory-game";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/flash-anzan" element={<FlashAnzan />} />
        <Route path="/flash-card" element={<FlashAnzanCardWrapper />} />
        <Route path="/auth/sign" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Layout activePage={<Dashboard />} page={"Video Darslar"} />}
        />
        <Route
          path="/dashboard/videos/:id"
          element={<Layout activePage={<Videos />} page={"Video Darslar"} />}
        />
        <Route
          path="/dashboard/materials"
          element={<Layout activePage={<Materials />} page={"Materiallar"} />}
        />
        <Route
          path="/dashboard/memory-game"
          element={<Layout activePage={<MemoryGame />} page={"Memory Game"} />}
        />
      </Routes>
    </>
  );
}

export default App;
