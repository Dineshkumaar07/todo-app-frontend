import Form from "./components/Form";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {
  return (
    
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Form />} />
        </Routes>
      </Router>
     
    
  );
}

export default App;
