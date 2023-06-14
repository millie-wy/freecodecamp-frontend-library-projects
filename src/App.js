import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import QuoteMachine from "./Pages/QuoteMachine";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/quote-machine" element={<QuoteMachine />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
