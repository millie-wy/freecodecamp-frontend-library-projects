import { useState } from "react";

const Home = () => {
  const [hover, setIsHovering] = useState(false);
  const projects = [
    {
      name: "Quote Machine",
      href: "/quote-machine",
    },
  ];
  return (
    <div style={divCSS}>
      <h1 style={{ textAlign: "center" }}>
        FreeCodeCamp <br />
        Front End Library Projects
      </h1>
      <ul style={listCSS}>
        {projects.map((p, i) => (
          <li key={i}>
            <a
              href={p.href}
              style={linkCSS(hover)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {i + 1}. {p.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

const divCSS = {
  background: "#eeeee4",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  paddingTop: 100,
};

const listCSS = {
  listStyleType: "none",
  padding: 0,
  margin: 0,
};

const linkCSS = (hover) => ({
  fontSize: 20,
  marginTop: 20,
  fontWeight: 500,
  textDecoration: "none",
  color: hover ? "#1e81b0" : "grey",
});
