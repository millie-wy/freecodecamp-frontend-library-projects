import { useMediaQuery } from "@react-hook/media-query";
import {
  IconMinus,
  IconPlayerPauseFilled as IconPause,
  IconPlayerPlayFilled as IconPlay,
  IconPlus,
  IconRefresh,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { zeroPad } from "react-countdown";
import BackButton from "../Shared/BackButton";

const Clock = () => {
  const xsOrAbove = useMediaQuery("only screen and (min-width: 400px)");
  const [breakLength, setBreakLength] = useState(300);
  const [sessionLength, setSessionLength] = useState(1500);
  const [onBreak, setOnBreak] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500);

  const reset = () => {
    setTimeLeft(0);
    setOnBreak(false);
    setBreakLength(300);
    setSessionLength(1500);
    setTimeout(() => setTimeLeft(1500), 200);
    return setIsStarting(false);
  };

  const incrementBreak = () => {
    if (breakLength < 3600 && !isStarting) {
      setBreakLength((prevState) => prevState + 60);
      onBreak && setTimeLeft((prevState) => prevState + 60);
    }
  };

  const incrementSession = () => {
    if (sessionLength < 3600 && !isStarting) {
      setSessionLength((prevState) => prevState + 60);
      !onBreak && setTimeLeft((prevState) => prevState + 60);
    }
  };

  const decrementBreak = () => {
    if (breakLength > 60 && !isStarting) {
      setBreakLength((prevState) => prevState - 60);
      onBreak && setTimeLeft((prevState) => prevState - 60);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 60 && !isStarting) {
      setSessionLength((prevState) => prevState - 60);
      !onBreak && setTimeLeft((prevState) => prevState - 60);
    }
  };

  const convertSecsToMins = (seconds) => `${seconds / 60}`;

  const clock = () => {
    if (timeLeft <= 0) return "00:00";
    const m = Math.floor(timeLeft / 60);
    const s = Math.floor((timeLeft % 3600) % 60);
    return zeroPad(m) + ":" + zeroPad(s);
  };

  useEffect(() => {
    if (isStarting) {
      const interval = setInterval(
        () => setTimeLeft((prevState) => prevState - 1),
        1000
      );
      if (timeLeft === 0) {
        setTimeout(() => {
          setOnBreak(!onBreak);
          !onBreak ? setTimeLeft(breakLength) : setTimeLeft(sessionLength);
        }, 1000);
      }
      return () => clearInterval(interval);
    }
  }, [breakLength, isStarting, onBreak, sessionLength, timeLeft]);

  return (
    <div style={containerCSS}>
      <BackButton />
      <h1>25 + 5 Clock</h1>
      <div style={controlPanelsCSS(xsOrAbove)}>
        <div style={panelCSS}>
          <button id="break-decrement" onClick={decrementBreak}>
            <IconMinus stroke={3} style={icons} />
          </button>
          <div style={panelLabelAndValueCSS}>
            <h4 id="break-length" style={valueCSS}>
              {convertSecsToMins(breakLength)}
            </h4>
            <p id="break-label" style={labelCSS}>
              Break Length
            </p>
          </div>
          <button id="break-increment" onClick={incrementBreak}>
            <IconPlus stroke={3} style={icons} />
          </button>
        </div>
        <div style={panelCSS}>
          <button id="session-decrement" onClick={decrementSession}>
            <IconMinus stroke={3} style={icons} />
          </button>
          <div style={panelLabelAndValueCSS}>
            <h4 id="session-length" style={valueCSS}>
              {convertSecsToMins(sessionLength)}
            </h4>
            <p id="session-label" style={labelCSS}>
              Session Length
            </p>
          </div>
          <button id="session-increment" onClick={incrementSession}>
            <IconPlus stroke={3} style={icons} />
          </button>
        </div>
      </div>
      <div style={timerCSS}>
        <p id="timer-label" style={labelCSS}>
          {onBreak ? "Break" : "Session"}
        </p>
        <h4 id="time-left" style={valueCSS}>
          {clock()}
        </h4>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button id="start_stop" onClick={() => setIsStarting(!isStarting)}>
            {!isStarting ? (
              <IconPlay style={icons} />
            ) : (
              <IconPause style={icons} />
            )}
          </button>
          <button id="reset" onClick={reset}>
            <IconRefresh style={icons} stroke={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clock;

const containerCSS = {
  minHeight: "calc(100vh - 50px)",
  paddingBottom: 50,
  background: "#F1C376",
  color: "#606C5D",
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
};

const controlPanelsCSS = (smScreen) => ({
  display: "flex",
  flexDirection: smScreen ? "row" : "column",
  columnGap: 50,
  rowGap: 20,
});

const panelCSS = {
  display: "flex",
  flexDirection: "row",
  placeItems: "center",
};

const icons = {
  cursor: "pointer",
};

const panelLabelAndValueCSS = {
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  padding: 0,
  width: 120,
};

const valueCSS = {
  margin: 5,
  fontSize: 30,
};

const labelCSS = {
  margin: 0,
};

const timerCSS = {
  marginTop: 40,
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  padding: 0,
  width: 120,
};
