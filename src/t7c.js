import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

const WordHighlighterWithSpeech = ({ words }) => {
  const [highlightedWord, setHighlightedWord] = useState(0);
  const [isHighlighting, setIsHighlighting] = useState(false);
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

  useEffect(() => {
    let timer;

    if (isHighlighting) {
      timer = setInterval(() => {
        setHighlightedWord((prevWord) => (prevWord + 1) % words.length);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isHighlighting, words]);

  const startHighlighting = () => {
    setIsHighlighting(true);
    speakWordsInOrder();
  };

  const stopHighlighting = () => {
    setIsHighlighting(false);
    setHighlightedWord(0);
    stopSpeech();
  };

  const speakWordsInOrder = () => {
    const speechQueue = [];

    for (let i = 0; i < words.length; i++) {
      speechQueue.push(
        new Promise((resolve) => {
          setTimeout(() => {
            speakWord(words[i], resolve);
          }, i * 1000);
        })
      );
    }

    Promise.all(speechQueue).then(() => {
      setIsHighlighting(false);
      setHighlightedWord(0);
    });
  };

  const speakWord = (word, onEnd) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.onend = onEnd;
      speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis is not supported in this browser.');
      onEnd();
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  return (
    <div>
      <button onClick={startHighlighting}>Start Highlighting & Speaking</button>
      <button onClick={stopHighlighting}>Stop Highlighting & Speaking</button>
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
                style={{ backgroundColor: index === words.indexOf(transcript.split(" ").pop()) ? 'blue' : index === highlightedWord ? 'yellow' : 'transparent' }}
            >
                {word}{' '}
            </span>
        ))}
      </div>
    </div>
  );
};

export default WordHighlighterWithSpeech;