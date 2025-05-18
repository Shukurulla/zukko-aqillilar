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
import Certificate from "./pages/sertificat";

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
        <Route
          path="/dashboard/flash-anzan"
          element={<Layout activePage={<FlashAnzan />} page={"Flash Anzan"} />}
        />
        <Route
          path="/dashboard/flash-card"
          element={
            <Layout
              activePage={<FlashAnzanCardWrapper />}
              page={"Flash Kartalar"}
            />
          }
        />
        <Route
          path="/dashboard/certificate"
          element={<Layout activePage={<Certificate />} page={"Sertifikat"} />}
        />
      </Routes>
    </>
  );
}

export default App;
