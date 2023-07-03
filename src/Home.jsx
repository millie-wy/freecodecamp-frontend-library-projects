import { useState } from "react";

const Home = () => {
  const [isHovering, setIsHovering] = useState(undefined);
  const projects = [
    {
      name: "Quote Machine",
      href: "/quote-machine",
    },
    {
      name: "Markdown Previewer",
      href: "/markdown-previewer",
    },
    { name: "JavaScript Calculator", href: "/calculator" },
    { name: "Drum Machine", href: "/drum-machine" },
    { name: "25 + 5 Clock", href: "/clock" },
  ];

  return (
    <div style={divCSS}>
      <h1 style={{ textAlign: "center" }}>
        FreeCodeCamp <br />
        Front End Library Projects
      </h1>
      <ul style={listCSS}>
        {projects.map((p, i) => (
          <li
            key={i}
            style={{ marginTop: 10 }}
            onMouseEnter={() => setIsHovering(i)}
            onMouseLeave={() => setIsHovering(undefined)}
          >
            <a href={p.href} style={linkCSS(isHovering === i)}>
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
  minHeight: "calc(100vh - 100px)",
  paddingTop: 100,
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
};

const listCSS = {
  listStyleType: "none",
  padding: 0,
  margin: 0,
  width: 220,
};

const linkCSS = (hovering) => ({
  fontSize: 20,
  fontWeight: hovering ? 600 : 500,
  textDecoration: "none",
  color: hovering ? "orange" : "grey",
});
