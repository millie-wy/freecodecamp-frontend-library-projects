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
  const defaultBreakLength = 300;
  const defaultSessionLength = 1500;
  const xsOrAbove = useMediaQuery("only screen and (min-width: 400px)");
  const [breakLength, setBreakLength] = useState(defaultBreakLength);
  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [onBreak, setOnBreak] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(defaultSessionLength);

  const reset = () => {
    const beepAudio = document.getElementById("beep");
    setTimeLeft(0);
    setOnBreak(false);
    setBreakLength(defaultBreakLength);
    setSessionLength(defaultSessionLength);
    setTimeout(() => setTimeLeft(defaultSessionLength), 200);
    setIsStarting(false);
    beepAudio.pause();
    beepAudio.currentTime = 0;
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

  const convertSecsToMins = (seconds) => `${(seconds / 60).toFixed(0)}`;

  const clock = () => {
    if (timeLeft <= 0) return "00:00";
    const m = Math.floor(timeLeft / 60);
    const s = Math.floor((timeLeft % 3600) % 60);
    return zeroPad(m) + ":" + zeroPad(s);
  };

  useEffect(() => {
    if (isStarting) {
      const beepAudio = document.getElementById("beep");
      const interval = setInterval(
        () => setTimeLeft((prevState) => prevState - 1),
        1000
      );
      if (timeLeft < 0) {
        setOnBreak(!onBreak);
        !onBreak ? setTimeLeft(breakLength) : setTimeLeft(sessionLength);
        beepAudio.play();
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
          <button
            id="break-decrement"
            onClick={decrementBreak}
            style={buttonCSS}
          >
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
          <button
            id="break-increment"
            onClick={incrementBreak}
            style={buttonCSS}
          >
            <IconPlus stroke={3} style={icons} />
          </button>
        </div>
        <div style={panelCSS}>
          <button
            id="session-decrement"
            onClick={decrementSession}
            style={buttonCSS}
          >
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
          <button
            id="session-increment"
            onClick={incrementSession}
            style={buttonCSS}
          >
            <IconPlus stroke={3} style={icons} />
          </button>
        </div>
      </div>
      <div style={timerCSS}>
        <p id="timer-label" style={timerLabelCSS(timeLeft)}>
          {!onBreak ? "Session" : "Break"}
        </p>
        <h4 id="time-left" style={timerValueCSS(timeLeft)}>
          {clock()}
        </h4>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            id="start_stop"
            onClick={() => setIsStarting(!isStarting)}
            style={buttonCSS}
          >
            {!isStarting ? (
              <IconPlay style={icons} />
            ) : (
              <IconPause style={icons} />
            )}
          </button>
          <button id="reset" onClick={reset} style={buttonCSS}>
            <IconRefresh style={icons} stroke={3} />
          </button>
          <audio
            src="/assets/audio/beep-warning.mp3"
            id="beep"
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Clock;

const containerCSS = {
  minHeight: "calc(100vh - 50px)",
  paddingBottom: 50,
  background: "#A0C49D",
  color: "#F7FFE5",
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
};

const controlPanelsCSS = (smScreen) => ({
  display: "flex",
  flexDirection: smScreen ? "row" : "column",
  columnGap: 50,
  rowGap: 20,
  padding: 20,
  background: "#C4D7B2",
  color: "#3c3c3c90",
  borderRadius: 5,
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
  margin: 0,
  fontSize: 30,
};

const labelCSS = {
  margin: "5px 0",
};

const timerCSS = {
  marginTop: 40,
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  padding: 0,
  width: 120,
};

const buttonCSS = {
  background: "none",
  border: "none",
  color: "inherit",
};

const timerLabelCSS = (timeLeft) => ({
  ...labelCSS,
  color: timeLeft < 60 ? "#FF6666" : "inherit",
  fontSize: 24,
  fontWeight: 600,
});

const timerValueCSS = (timeLeft) => ({
  ...valueCSS,
  color: timeLeft < 60 ? "#FF6666" : "inherit",
  fontSize: 40,
  margin: "5px 0 10px 0",
});
