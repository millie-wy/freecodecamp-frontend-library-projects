import { useState } from "react";

const JavaScriptCalculator = () => {
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState([0]);
  const prevInput = input[input.length - 1];
  const prevPrevInput = input[input.length - 2];
  const isOperator = (key) => operators.some((k) => k.display === key);
  const isNumber = (key) => typeof key === "number";
  const isDecimalPoint = (key) => key === ".";

  const clearInputAndOutput = () => setInputAndOutput([], [0]);

  const setInputAndOutput = (input, output) => {
    setInput(input);
    setOutput(output ? output : input);
  };

  const prepareToCalculate = () => {
    // handles if = is being clicked multiple times
    if (input.filter((i) => i === "=").length >= 1) return;

    // handles cases if 0 is in either input or output
    if ((output === 0 && prevInput === 0) || (output === 0 && !input.length))
      return clearInputAndOutput();

    // removes the decimal point and unused operators before the =
    if (isDecimalPoint(prevInput) || isOperator(prevInput)) {
      let copiedInput = input;
      if (isOperator(prevPrevInput)) copiedInput.pop();
      copiedInput.pop();
      setInput(copiedInput);
    }

    return performCalculation();
  };

  const performCalculation = () => {
    let copiedInput = input;
    const str = copiedInput
      .join("")
      .replaceAll("×", "*")
      .replaceAll("÷", "/")
      .replaceAll("--", "+");
    // eslint-disable-next-line no-eval
    let evaluation = eval(str).toFixed(10);
    return setInputAndOutput(
      (prevState) => [...prevState, "=", parseFloat(evaluation)],
      parseFloat(evaluation)
    );
  };

  const handleClick = (currKey) => {
    let copiedInput = input;
    if (output.length === 1 && output[0] === 0) setOutput([]);
    if (output === 0 && currKey === 0) return; // multiple 0 when display is empty
    if (isDecimalPoint(prevInput) && isDecimalPoint(currKey)) return; // multiple decimal points

    // any key is clicked after a calculation is done
    if (input.includes("=") && prevInput === output) {
      // a number
      if (isNumber(currKey)) return setInputAndOutput([currKey]);

      // an operator
      if (isOperator(currKey))
        return setInputAndOutput([output, currKey], [currKey]);

      // a decimal point
      if (isDecimalPoint(currKey))
        return setInputAndOutput([0, "."], [0, currKey]);
    }

    // handles clicking of operators
    if (isOperator(currKey)) {
      setOutput([]);
      if (!input.length) return; // return if input is empty

      // if 2 operators are entered replaces all 2 entries
      if (isOperator(prevPrevInput) && isOperator(prevInput)) {
        copiedInput.splice(-2, 2);
        copiedInput.push(currKey);
        return setInputAndOutput(copiedInput, [currKey]);
      }

      // if the prev input is an operator key or a decimal point
      if (prevInput === "." || isOperator(prevInput)) {
        // return if it is the same as the last input and is not -

        if (prevInput === currKey && currKey !== "-") return;

        // if the input is -
        if (currKey === "-") {
          if (isOperator(prevPrevInput)) return; // triple "-"
          if (prevPrevInput !== "-")
            return setInput((prevState) => [...prevState, currKey]);
        }

        // else replaces it
        copiedInput.pop();
        copiedInput.push(currKey);
        return setInputAndOutput(copiedInput, [currKey]);
      }
    }

    // handles clicking of decimal point
    if (isDecimalPoint(currKey)) {
      // add 0 before the decimal point if input is empty
      if (!input.length) return setInputAndOutput([0, currKey]);

      // add 0 before the decimal point in other cases
      if (isOperator(prevInput))
        return setInputAndOutput(
          (prevState) => [...prevState, 0, currKey],
          [(0, currKey)]
        );

      // return if the output already has a decimal point
      if (typeof output === "string" || output.includes(".")) return;

      // if number being input is going to be a decimal
      if (isNumber(prevInput)) {
        const copiedInput = input;
        const regex = /×|÷|\+|-/gm;
        const arrWithSplitStr = copiedInput.join("").toString().split(regex);
        const numArr = arrWithSplitStr.map(Number);

        return setInputAndOutput(
          (prevState) => [...prevState, currKey],
          [numArr[numArr.length - 1], currKey]
        );
      }
    }

    // handles clicking of numbers
    if (isNumber(currKey)) {
      if (isOperator(prevInput)) setOutput([]);
      //   if (
      //     prevInput === "." ||
      //     (output % 1 !== 0 && typeof output !== "string")
      //   ) {
      //     return setOutput((prevState) => [...prevState, currKey]);
      //   }
    }

    return setInputAndOutput((prevState) => [...prevState, currKey]);
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
  const operators = [
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
            {operators.reverse().map((k, i) => (
              <div
                key={i}
                id={k.id}
                style={opertaorKeysCSS}
                onClick={() => handleClick(k.display)}
              >
                {k.display}
              </div>
            ))}
            <div id="equals" style={equalKeyCSS} onClick={prepareToCalculate}>
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
