import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

const SpeechToTextComponent = ({ words }) => {
  let lastWord = '';
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
  
  const sp = new Map()
  const st = new Map()
  for(let i = 0; i<words.length; i++) {
    st.set(i,words[i]);
  }


  const chec = () => {
    if(transcript.split(" ")[transcript.split(" ").length-1]!==lastWord) {
      lastWord = transcript.split(" ")[transcript.split(" ").length-1];
      sp.set(lastWord,"checker");
    }
  }
  setInterval( chec,100); // Wait 1000ms before running again
  
  return (
    <div>
      <button onClick={startListening} disabled={listening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop Listening
      </button>
      <p>{transcript}</p>
    {words.map((word, index) => (
      <span
      key={index}
      style={{ backgroundColor: index === words.indexOf(transcript.split(" ")[transcript.split(" ").length-1]) ? 'blue' : 'transparent' }}
      >
        {word}{' '}
      </span>
    ))}
    <p>{st.size}</p>
    <p>{sp.size}</p>
    <p>{lastWord}</p>
  </div>
  );
};

export default SpeechToTextComponent;