import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

const SpeechToText = () => {
  const [value, setValue] = useState('');
  const [spokenWords, setSpokenWords] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  useEffect(() => {
    if (value) {
      setSpokenWords((prevWords) => prevWords + ' ' + value);
    }
  }, [value]);

  const handleToggleListening = () => {
    if (listening) {
      stop();
    } else {
      listen();
    }
  };

  return (
    <div>
      <button onClick={handleToggleListening}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>{value}</p>
      {spokenWords && <p>{spokenWords}</p>}
    </div>
  );
};

export default SpeechToText;
