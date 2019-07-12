import React from "react";

import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

import "./markdown.css";

export default function MarkdownText({ value }) {
  return (
    <ReactMarkdown
      source={value}
      renderers={{ code: CodeBlock }}
      //skipHtml={true}
    />
  );
}
