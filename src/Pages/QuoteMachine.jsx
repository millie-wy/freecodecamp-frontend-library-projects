import { useEffect, useState } from "react";
import QuoteBox from "../Components/QuoteBox";

const QuoteMachine = () => {
  const [bgColor, setBgColor] = useState("");

  const shortenNum = (num) => {
    let str = num.toString();
    return Number(str.slice(0, 6));
  };

  useEffect(() => {
    let randomNum = Math.floor(Math.random() * 16777215);
    if (randomNum < 99999) randomNum = randomNum * 10;
    return setBgColor("#" + shortenNum(randomNum).toString());
  }, []);

  return (
    <div style={divCSS(bgColor)}>
      <QuoteBox color={bgColor} />
    </div>
  );
};

export default QuoteMachine;

const divCSS = (bgColor) => ({
  background: bgColor,
  minHeight: "100vh",
  padding: 30,
  display: "flex",
  placeItems: "center",
  placeContent: "center",
});
