import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

const App = () => {
  const [markdownContent, setMarkdownContent] = useState(``);

  const [notes, setNotes] = useState([]);

  const textareaRef = useRef(null);

  const handleContentChange = (event) => {
    setMarkdownContent(event.target.value);
  };

  const handleFormatClick = (format) => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    const { selectionStart, selectionEnd } = textarea;
    const selectedText = markdownContent.substring(
      selectionStart,
      selectionEnd
    );

    let formattedText;

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "insertUnorderedList":
        formattedText = `- ${selectedText}\n`;
        break;
      case "formatBlock":
        formattedText = `# ${selectedText}\n`;
        break;
      default:
        formattedText = selectedText;
    }

    const updatedContent =
      markdownContent.substring(0, selectionStart) +
      formattedText +
      markdownContent.substring(selectionEnd);

    setMarkdownContent(updatedContent);

    textarea.focus();
    textarea.setSelectionRange(
      selectionStart + formattedText.length,
      selectionStart + formattedText.length
    );
  };

  const handleAddNote = () => {
    const newNote = prompt("Enter your note:");
    if (newNote) {
      setNotes([...notes, newNote]);
      setMarkdownContent((prevContent) => prevContent + `- ${newNote}\n`);
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    updateMarkdownContent();
  };

  const updateMarkdownContent = () => {
    const notesList = notes.map((note) => `- ${note}\n`).join("");
    setMarkdownContent(
      (prevContent) =>
        `# Markdown Editor Example\n\n... (existing content)\n\n## Notes\n\n${notesList}`
    );
  };

  const generateReadme = () => {
    console.log("Generating README.md:", markdownContent);
  };

  return (
    <div className="app-container">
      <div className="notes-container">
        <h2>Notes</h2>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <i className="fas fa-sticky-note icon"></i>
              {note}
              <button
                className="delete-note-button"
                onClick={() => handleDeleteNote(index)}
              >
                <i className="fas fa-trash-alt icon"></i>
              </button>
            </li>
          ))}
        </ul>
        <button className="add-note-button" onClick={handleAddNote}>
          <i className="fas fa-plus icon"></i> Add Note
        </button>
      </div>
      <div className="editor-container">
        <div className="format-buttons">
          <button onClick={() => handleFormatClick("bold")}>Bold</button>
          <button onClick={() => handleFormatClick("italic")}>Italic</button>
          <button onClick={() => handleFormatClick("insertUnorderedList")}>
            List
          </button>
          <button onClick={() => handleFormatClick("formatBlock")}>
            Heading
          </button>
        </div>
        <textarea
          className="markdown-editor"
          value={markdownContent}
          onChange={handleContentChange}
          ref={textareaRef}
          placeholder="Enter your Markdown content here..."
        />
        <button onClick={generateReadme}>Generate README.md</button>
      </div>
      <div className="preview-container">
        <h2>Preview</h2>
        <ReactMarkdown className="markdown-preview">
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default App;
