import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

const SpeechToTextComponent = ({ words }) => {
  const [transcript, setTranscript] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(result);
    }
  });

  const startListening = () => {
    listen();
  };

  const stopListening = () => {
    stop();
  };
 
  return (
    <div>
      <button onClick={startListening} disabled={listening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop Listening
      </button>
      <p>{transcript}</p>
      <p>{transcript.split(" ").pop()}</p>
    {words.map((word, index) => (
      <span
        key={index}
        style={{ backgroundColor: index === words.indexOf(transcript.split(" ").pop()) ? 'blue' : 'transparent' }}
      >
        {word}{' '}
      </span>
    ))}
  </div>
  );
};

export default SpeechToTextComponent;
