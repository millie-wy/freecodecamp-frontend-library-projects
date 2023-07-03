import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Clock from "./Pages/Clock";
import DrumMachine from "./Pages/DrumMachine";
import JavaScriptCalculator from "./Pages/JavaScriptCalculator";
import MarkdownPreviewer from "./Pages/MarkdownPreviewer";
import QuoteMachine from "./Pages/QuoteMachine";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/quote-machine" element={<QuoteMachine />} />
        <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
        <Route path="/calculator" element={<JavaScriptCalculator />} />
        <Route path="/drum-machine" element={<DrumMachine />} />
        <Route path="/clock" element={<Clock />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
