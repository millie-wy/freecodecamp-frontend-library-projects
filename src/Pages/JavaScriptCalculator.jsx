import { useState } from "react";

const JavaScriptCalculator = () => {
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState(0);

  const calculate = () => {
    let copiedInput = input;
    const prevInput = input[input.length - 1];

    // handles if = is being clicked multiple times
    if (copiedInput.filter((i) => i === "=").length >= 1) return;

    // handles cases if 0 is in either input or output
    if (output === 0) {
      if (copiedInput[copiedInput.length - 1] === 0 || !copiedInput.length) {
        return clearInputAndOutput();
      }
    }

    // removes the . before the =
    if (prevInput === ".") setInput((prevState) => [...prevState.splice(-1)]);

    // performs calculation
    const str = copiedInput
      .join("")
      .replaceAll("×", "*")
      .replaceAll("÷", "/")
      .replaceAll("--", "+");
    // eslint-disable-next-line no-eval
    let evaluation = eval(str).toFixed(10);
    setInput((prevState) => [...prevState, "=", parseFloat(evaluation)]);
    setOutput(parseFloat(evaluation));
  };

  const handleClick = (key) => {
    const prevInput = input[input.length - 1];

    // multiple 0 when nothing is on display
    if (input === 0 && key === 0) return;

    // multiple .
    if (prevInput === "." && key === ".") return;

    // any key is clicked after a calculation is done
    if (input.includes("=") && prevInput === output) {
      // a number
      if (typeof key === "number") {
        setInput([key]);
        return setOutput(key);
      }
      // an operator
      if (operatorKeys.some((k) => k.display === key)) {
        setInput([output, key]);
        return setOutput(key);
      }

      // a decimal point
      if (key === ".") {
        setInput([0, "."]);
        return setOutput(0 + key);
      }
    }

    // handles clicking of operator keys
    if (operatorKeys.some((k) => k.display === key)) {
      const prevPrevInput = input[input.length - 2];

      // return if input is empty
      if (!input.length) return;

      // if the prev input is an operator key or a decimal point
      if (
        prevInput === "." ||
        operatorKeys.some((k) => k.display === prevInput)
      ) {
        // return if it is the same key as the last input and is not -
        if (prevInput === key && key !== "-") return;

        // if the input is -
        if (key === "-") {
          // reacts depends on the prev prev key
          if (operatorKeys.some((k) => k.display === prevPrevInput)) return;
          if (prevPrevInput !== "-")
            return setInput((prevState) => [...prevState, key]);
        }
        // else replaces it
        setOutput(key);
        return setInput((prevState) => [...prevState.splice(-1), key]);
      }
    }

    // handles clicking of decimal point
    if (key === ".") {
      // add 0 before the decimal point if input is empty
      if (!input.length) {
        setOutput(0 + key);
        return setInput([0, key]);
      }

      // add 0 before the decimal point in other cases
      if (operatorKeys.some((k) => k.display === prevInput)) {
        setInput((prevState) => [...prevState, 0, key]);
        return setOutput(0 + key);
      }

      // if number being input is going to be a decimal
      if (typeof prevInput === "number") {
        setInput((prevState) => [...prevState, key]);
        return setOutput((prevState) => prevState + key);
      }

      // return if the output already has a decimal point
      if (output % 1 !== 0) return;
    }

    if (prevInput === "." && typeof key === "number") {
      setInput((prevState) => [...prevState, key]);
      return setOutput((prevState) => prevState + key);
    }

    setOutput(key);
    return setInput((prevState) => [...prevState, key]);
  };

  const clearInputAndOutput = () => {
    setInput([]);
    setOutput(0);
  };

  const numberKeys = [
    { id: "zero", display: 0 },
    { id: "three", display: 3 },
    { id: "two", display: 2 },
    { id: "one", display: 1 },
    { id: "six", display: 6 },
    { id: "five", display: 5 },
    { id: "four", display: 4 },
    { id: "nine", display: 9 },
    { id: "eight", display: 8 },
    { id: "seven", display: 7 },
  ];
  const operatorKeys = [
    { id: "add", display: "+" },
    { id: "subtract", display: "-" },
    { id: "multiply", display: "×" },
    { id: "divide", display: "÷" },
  ];

  return (
    <div style={containerCSS}>
      <h1>React Calculator</h1>
      <div style={calculatorDivCSS}>
        <div style={displayCSS}>
          <p style={inputCSS}>{input}</p>
          <h2 id="display" style={outputCSS}>
            {output}
          </h2>
        </div>
        <div style={KeysDivCSS}>
          <div style={digitsDivCSS}>
            <div id="clear" style={clearKeyCSS} onClick={clearInputAndOutput}>
              AC
            </div>
            {numberKeys.reverse().map((k, i) => (
              <div
                key={i}
                id={k.id}
                style={k.id === "zero" ? zeroKeyCSS : keysCSS}
                onClick={() => handleClick(k.display)}
              >
                {k.display}
              </div>
            ))}
            <div id="decimal" style={keysCSS} onClick={() => handleClick(".")}>
              .
            </div>
          </div>
          <div style={operatorsDivCSS}>
            {operatorKeys.reverse().map((k, i) => (
              <div
                key={i}
                id={k.id}
                style={opertaorKeysCSS}
                onClick={() => handleClick(k.display)}
              >
                {k.display}
              </div>
            ))}
            <div id="equals" style={equalKeyCSS} onClick={calculate}>
              =
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaScriptCalculator;

const containerCSS = {
  minHeight: "100vh",
  background: "#222831",
  color: "#EEEEEE",
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  placeContent: "center",
};

const calculatorDivCSS = {
  background: "#393E46",
  padding: 10,
  borderRadius: 5,
};

const KeysDivCSS = {
  width: 324,
  background: "#393E46",
  display: "flex",
  flexDirection: "row",
  boxSizing: "border-box",
};

const displayCSS = {
  background: "#EEEEEE",
  height: 80,
  border: ".5px solid #393E46",
  borderRadius: "5px 5px 0 0 ",
  color: "#393E46",
  textAlign: "end",
  padding: "0px 15px",
};

const inputCSS = {
  fontSize: 12,
  lineHeight: 1,
  minHeight: 12,
  maxHeight: 12,
};

const outputCSS = {
  fontSize: 26,
  marginTop: 15,
  lineHeight: 1,
  minHeight: 26,
  maxHeight: 26,
};

const digitsDivCSS = {
  width: 243,
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const operatorsDivCSS = {
  width: 80,
  height: 80,
};

const keysCSS = {
  background: "#616161",
  display: "flex",
  placeItems: "center",
  placeContent: "center",
  border: ".5px solid #393E46",
  width: 80,
  height: 80,
  cursor: "pointer",
  fontSize: 26,
};

const zeroKeyCSS = {
  ...keysCSS,
  width: 161,
  borderRadius: "0 0 0 5px",
};

const clearKeyCSS = {
  ...keysCSS,
  width: "100%",
  background: "#C93900",
  borderTop: "1px solid #393E46",
};

const opertaorKeysCSS = {
  ...keysCSS,
  background: "#00ADB5",
};

const equalKeyCSS = {
  ...opertaorKeysCSS,
  borderRadius: "0 0 5px 0",
};
