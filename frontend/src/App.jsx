import LandingPage from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import Header from "./components/Header";

export default function App() {

  return (
    <>
      <BrowserRouter> 
      <Header/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
