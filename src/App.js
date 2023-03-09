import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutJob from "./components/AboutJob/AboutJob";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <div className="pageWrapper">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/job/:id" element={<AboutJob />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
