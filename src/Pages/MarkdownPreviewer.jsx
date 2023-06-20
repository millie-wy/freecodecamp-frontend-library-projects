import { useState } from "react";
import { marked } from "marked";

const MarkdownPreviewer = () => {
  let markdownExamples = [
    "# Welcome to my React Markdown Previewer!",
    "## This is a sub-heading!",
    "[links](https://www.freecodecamp.org)",
    `\`inline code\``,
    `\`\`\`\nThis is a codeblock\nAnother line\n\`\`\``,
    "* Some list",
    "  * more list",
    "1. Numbered list",
    "1. Number list cont",
    "> blockquote",
    "**bold text**",
    "![Image alt](https://images.unsplash.com/photo-1612176232942-4ceef9e9acb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80)",
  ];

  const defaultValue = markdownExamples.join("\n\n");
  const [input, setInput] = useState(defaultValue);

  const setPreview = (input) => {
    marked.use({ breaks: true });
    return marked.parse(input);
  };

  return (
    <div style={divCSS}>
      <textarea
        name="editor"
        id="editor"
        cols="60"
        rows="10"
        onChange={(e) => setInput(e.target.value)}
        defaultValue={defaultValue}
      />
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: setPreview(input) }}
      />
    </div>
  );
};
export default MarkdownPreviewer;

const divCSS = {
  minHeight: "100vh",
  padding: 30,
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  placeContent: "center",
};
