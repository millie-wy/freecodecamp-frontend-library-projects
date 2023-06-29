import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import QuoteMachine from "./Pages/QuoteMachine";
import MarkdownPreviewer from "./Pages/MarkdownPreviewer";
import JavaScriptCalculator from "./Pages/JavaScriptCalculator";
import DrumMachine from "./Pages/DrumMachine";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/quote-machine" element={<QuoteMachine />} />
        <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
        <Route path="/calculator" element={<JavaScriptCalculator />} />
        <Route path="/drum-machine" element={<DrumMachine />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
