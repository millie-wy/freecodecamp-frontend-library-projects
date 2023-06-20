const Home = () => {
  const projects = [
    {
      name: "Quote Machine",
      href: "/quote-machine",
    },
    {
      name: "Markdown Previewer",
      href: "/markdown-previewer",
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
          <li key={i} style={{ marginTop: 10 }}>
            <a href={p.href} style={linkCSS}>
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

const linkCSS = {
  fontSize: 20,
  fontWeight: 500,
  textDecoration: "none",
  color: "grey",
};
