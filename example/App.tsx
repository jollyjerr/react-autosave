import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { useAutosave } from '../src';

function App() {
  const [showForm, setShowForm] = useState(true);
  const [text, setText] = useState('hello world');
  const [value, setValue] = useState(text);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 8,
        padding: 16,
      }}
    >
      {showForm ? (
        <Form setText={setText} text={text} setValue={setValue} />
      ) : null}
      <p>
        Save function called with:{' '}
        <span style={{ fontWeight: 'bold' }}>{value}</span>
      </p>
      <button onClick={() => setShowForm((prev) => !prev)}>Toggle form</button>
    </div>
  );
}

const Form = ({
  text,
  setText,
  setValue,
}: {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  useAutosave({ data: text, onSave: setValue });
  return (
    <input
      type="text"
      data-testid="input"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default App;
