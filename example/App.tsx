import { useState } from "react";
import { useAutosave } from "..";

function App() {
  const [text, setText] = useState("hello world");
  const [value, setValue] = useState(text);

  useAutosave({ data: text, onSave: setValue });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: 800,
        marginLeft: "auto",
        marginRight: "auto",
        gap: 8,
        padding: 16,
      }}
    >
      <input
        type="text"
        data-testid="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>
        Save function called with:{" "}
        <span style={{ fontWeight: "bold" }}>{value}</span>
      </p>
    </div>
  );
}

export default App;
