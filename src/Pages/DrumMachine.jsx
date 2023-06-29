const DrumMachine = () => {
  const drumPadEls = [
    {
      displayName: "Heater 1",
      text: "Q",
      keyCode: 81,
      audio: "/assets/audio/heater-1.mp3",
    },
    {
      displayName: "Heater 2",
      text: "W",
      keyCode: 87,
      audio: "/assets/audio/heater-2.mp3",
    },
    {
      displayName: "Heater 3",
      text: "E",
      keyCode: 69,
      audio: "/assets/audio/heater-3.mp3",
    },
    {
      displayName: "Heater 4",
      text: "A",
      keyCode: 65,
      audio: "/assets/audio/heater-4.mp3",
    },
    {
      displayName: "Open HH",
      text: "S",
      keyCode: 83,
      audio: "/assets/audio/open-hh.mp3",
    },
    {
      displayName: "Closed HH",
      text: "D",
      keyCode: 68,
      audio: "/assets/audio/closed-hh.mp3",
    },
    {
      displayName: "Kick",
      text: "Z",
      keyCode: 90,
      audio: "/assets/audio/kick.mp3",
    },
    {
      displayName: "Kick n' Hat",
      text: "X",
      keyCode: 88,
      audio: "/assets/audio/kick-n-hat.mp3",
    },
    {
      displayName: "Clap",
      text: "C",
      keyCode: 67,
      audio: "/assets/audio/clap.mp3",
    },
  ];

  return (
    <div style={containerCSS}>
      <h1>Drum Machine</h1>
      <div id="drum-machine" style={drumDivCSS}>
        <div id="display" style={drumPadCSS}>
          {drumPadEls.map((el, i) => (
            <div key={i} className="drum-pad" style={drumPadElCSS}>
              {el.text}
            </div>
          ))}
        </div>
        <div id="display" style={drumDisplayCSS}>
          display
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
  width: 400,
  display: "flex",
  flexDirection: "row",
  placeContent: "center",
  placeItems: "center",
  padding: "30px 10px",
  borderRadius: 5,
};

const drumPadCSS = {
  width: 250,
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
};

const drumPadElCSS = {
  background: "#005086",
  cursor: "pointer",
  borderRadius: 5,
  width: 65,
  height: 50,
  display: "flex",
  placeContent: "center",
  placeItems: "center",
  fontWeight: 800,
};

const drumDisplayCSS = {
  background: "#F7D6BF",
  color: "#005086",
  width: 100,
  height: 40,
  borderRadius: 5,
  display: "flex",
  placeContent: "center",
  placeItems: "center",
  fontWeight: 800,
};
