import { useState } from "react";
import { marked } from "marked";
import BackButton from "../Shared/BackButton";

const MarkdownPreviewer = () => {
  let markdownExamples = [
    "# This is a heading",
    "## This is a sub-heading",
    "Unstyled text **Bold** *Italic* ~~Strikethrough~~",
    "[Link](https://github.com/millie-wy)",
    `\`Inline code\``,
    `\`\`\`\nCode block\nAnother line in the code block\n\`\`\``,
    "* Bulleted list",
    "  * Sub item",
    "1. Numbered list",
    "1. Another item in the numbered list",
    "> This is a blockquote",
    "Image:",
    "![Image alt](https://images.unsplash.com/photo-1612176232942-4ceef9e9acb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80)",
  ];

  const defaultValue = markdownExamples.join("\n\n");
  const [input, setInput] = useState(defaultValue);

  const setPreview = (input) => {
    marked.use({ breaks: true });
    return marked.parse(input);
  };

  return (
    <div style={containerCSS}>
      <BackButton />
      <div style={divCSS}>
        <h1>React Markdown Previewer</h1>
        <p style={textCSS}>Edit here</p>
        <textarea
          name="editor"
          id="editor"
          rows="10"
          onChange={(e) => setInput(e.target.value)}
          defaultValue={defaultValue}
          style={textareaCSS}
        />
        <p style={textCSS}>Preview here</p>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: setPreview(input) }}
          style={previewCSS}
        />
      </div>
    </div>
  );
};
export default MarkdownPreviewer;

const containerCSS = {
  minHeight: "calc(100vh - 50px)",
  paddingBottom: 50,
  background: "#F1C376",
  color: "#606C5D",
  display: "flex",
  flexDirection: "column",
};

const divCSS = {
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  maxWidth: 650,
  minWidth: 280,
  width: "90%",
  margin: "auto",
};

const textareaCSS = {
  width: "90%",
  outline: "none",
  border: "none",
  background: "#FFF4F4",
  maxWidth: 585,
  padding: 30,
};

const previewCSS = {
  width: "90%",
  background: "#F7E6C4",
  padding: "10px 30px",
};

const textCSS = {
  marginBottom: 10,
  alignSelf: "start",
  color: "#606C5D",
};
