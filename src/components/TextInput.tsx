import { useState } from 'react';

const TextInput = () => {
  const [text, setText] = useState('');
  return (
    <>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Text Input"
        />
      </div>
      <p>Entered Text: {text}</p>
    </>
  );
};

export default TextInput;
