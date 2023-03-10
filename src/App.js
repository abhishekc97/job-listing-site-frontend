import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutJob from "./pages/AboutJob/AboutJob";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/job/:id" element={<AboutJob />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
