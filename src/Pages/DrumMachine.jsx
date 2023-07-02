import { useCallback, useEffect, useRef, useState } from "react";

const DrumMachine = () => {
  const drumPadEls = [
    {
      displayName: "Heater 1",
      id: "Q",
      keyCode: 81,
      audio: "/assets/audio/heater-1.mp3",
    },
    {
      displayName: "Heater 2",
      id: "W",
      keyCode: 87,
      audio: "/assets/audio/heater-2.mp3",
    },
    {
      displayName: "Heater 3",
      id: "E",
      keyCode: 69,
      audio: "/assets/audio/heater-3.mp3",
    },
    {
      displayName: "Heater 4",
      id: "A",
      keyCode: 65,
      audio: "/assets/audio/heater-4.mp3",
    },
    {
      displayName: "Open HH",
      id: "S",
      keyCode: 83,
      audio: "/assets/audio/open-hh.mp3",
    },
    {
      displayName: "Closed HH",
      id: "D",
      keyCode: 68,
      audio: "/assets/audio/closed-hh.mp3",
    },
    {
      displayName: "Kick",
      id: "Z",
      keyCode: 90,
      audio: "/assets/audio/kick.mp3",
    },
    {
      displayName: "Kick n' Hat",
      id: "X",
      keyCode: 88,
      audio: "/assets/audio/kick-n-hat.mp3",
    },
    {
      displayName: "Clap",
      id: "C",
      keyCode: 67,
      audio: "/assets/audio/clap.mp3",
    },
  ];

  const [on, setOn] = useState(true);
  const [display, setDisplay] = useState("");
  const [activePad, setActivePad] = useState("");
  const drumPadElsRef = useRef(drumPadEls);
  const toggle = () => (on ? setOn(false) : setOn(true));

  const playAudio = useCallback(
    (pad) => {
      if (!on) return;
      setActivePad(pad.id);
      document.getElementById(pad.id).play();
      setTimeout(() => setActivePad(""), 200);
      return setDisplay(pad.displayName);
    },
    [on]
  );

  useEffect(() => {
    const detectKeyDown = (e) => {
      const found = drumPadElsRef.current.find(
        (el) => el.keyCode === e.keyCode
      );
      if (!found) return;
      return playAudio(found);
    };
    document.addEventListener("keydown", detectKeyDown);
    return () => document.removeEventListener("keydown", detectKeyDown);
  }, [drumPadElsRef, on, playAudio]);

  return (
    <div style={containerCSS}>
      <h1>Drum Machine</h1>
      <div id="drum-machine" style={drumDivCSS}>
        <div style={drumPadCSS}>
          {drumPadEls.map((el, i) => (
            <div
              key={i}
              id={el.id + "-div"}
              className="drum-pad"
              style={drumPadElCSS(activePad === el.id)}
              onClick={() => playAudio(el)}
            >
              {el.id}
              <audio
                src={el.audio}
                className="clip"
                id={el.id}
                preload="auto"
              />
            </div>
          ))}
        </div>
        <div style={controlPanelCSS}>
          <div id="power-switch" style={toggleCSS} onClick={toggle}>
            <div style={sliderCSS(on)}>{on ? "ON" : "OFF"}</div>
          </div>
          <div id="display" style={drumDisplayCSS}>
            {display}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;

const containerCSS = {
  minHeight: "100vh",
  background: "#318FB5",
  color: "#B0CAC7",
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  placeContent: "center",
};

const drumDivCSS = {
  background: "#B0CAC7",
  width: 365,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: 30,
  borderRadius: 5,
};

const drumPadCSS = {
  width: 215,
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
};

const drumPadElCSS = (active) => ({
  background: active ? "#318FB5" : "#005086",
  cursor: "pointer",
  borderRadius: 5,
  width: 65,
  height: 50,
  display: "flex",
  placeContent: "center",
  placeItems: "center",
  fontWeight: 800,
});

const controlPanelCSS = {
  width: 120,
  height: 170,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  justifyContent: "space-between",
  placeItems: "end",
};

const drumDisplayCSS = {
  background: "#F7D6BF",
  color: "#005086",
  width: 120,
  height: 40,
  borderRadius: 5,
  display: "flex",
  placeContent: "center",
  placeItems: "center",
  fontWeight: 800,
  fontSize: 13,
};

const toggleCSS = {
  position: "relative",
  background: "#005086",
  width: 44,
  height: 25,
  borderRadius: 5,
};

const sliderCSS = (on) => ({
  position: "absolute",
  background: "#318FB5",
  color: on ? "inherit" : "#005086",
  borderRadius: 2,
  width: 19,
  height: 19,
  margin: 3,
  cursor: "pointer",
  left: on ? 0 : 19,
  fontWeight: 600,
  fontSize: 7.5,
  display: "flex",
  placeContent: "center",
  placeItems: "center",
  transition: ".3s",
});
