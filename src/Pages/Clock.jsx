import BackButton from "../Shared/BackButton";

const Clock = () => {
  return (
    <div style={containerCSS}>
      <BackButton />
      <h1>25 + 5 Clock</h1>
      hi
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
