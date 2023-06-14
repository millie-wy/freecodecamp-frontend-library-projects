import { useMediaQuery } from "@react-hook/media-query";
import { IconBrandTwitter } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

const QuoteMachine = () => {
  const [bgColor, setBgColor] = useState("");
  const [data, setData] = useState([]);
  const [quote, setQuote] = useState({});
  const xsOrAbove = useMediaQuery("only screen and (min-width: 400px)");

  const generateColor = useCallback(() => {
    let randomNum = Math.floor(Math.random() * 16777215);
    if (randomNum < 99999) randomNum = randomNum * 10;
    return setBgColor("#" + shortenNum(randomNum).toString());
  }, []);

  const generateQuote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * 30) + 1;
    const quote = data.filter((d) => d.id === randomIndex);
    generateColor();
    return setQuote(quote[0]);
  }, [data, generateColor]);

  const shortenNum = (num) => {
    let str = num.toString();
    return Number(str.slice(0, 6));
  };

  useEffect(() => {
    fetch("https://dummyjson.com/quotes")
      .then((res) => res.json())
      .then((data) => setData(data.quotes))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (data.length) return generateQuote();
  }, [data, generateQuote]);

  return (
    <div style={divCSS(bgColor)}>
      {quote && (
        <div id="quote-box" style={quoteBoxCSS(xsOrAbove)}>
          <h1 id="text" style={h1CSS}>
            ❝ {quote.quote} ❞
          </h1>
          <p id="author" style={textCSS}>
            - {quote.author}
          </p>

          <button
            id="new-quote"
            onClick={generateQuote}
            style={buttonCSS(bgColor)}
          >
            New Quote
          </button>
          <a
            style={linkCSS}
            href={`https://twitter.com/intent/tweet?text=❝ ${
              quote.quote + "❞ - " + quote.author
            }`}
            id="tweet-quote"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandTwitter />
          </a>
        </div>
      )}
    </div>
  );
};

export default QuoteMachine;

// Below are CSS

const divCSS = (bgColor) => ({
  background: bgColor,
  minHeight: "100vh",
  padding: 30,
  display: "flex",
  placeItems: "center",
  placeContent: "center",
});

const quoteBoxCSS = (smScreen) => ({
  background: smScreen ? "#ffffff60" : "transparent",
  padding: "30px 50px",
  width: "50vw",
  minWidth: 280,
  borderRadius: 15,
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  placeContent: "center",
  color: "#fff",
});

const h1CSS = {
  fontSize: 28,
};

const textCSS = {
  marginTop: -10,
  marginBottom: 40,
  fontWeight: 500,
  alignSelf: "end",
};

const buttonCSS = (color) => ({
  background: "#ffffff",
  border: "none",
  padding: 10,
  borderRadius: 5,
  textTransform: "uppercase",
  fontWeight: 600,
  color: color + "90",
});

const linkCSS = {
  color: "#fff",
  fontSize: 12,
  marginTop: 20,
  fontWeight: 500,
  textDecoration: "none",
};
