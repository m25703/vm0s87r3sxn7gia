import React, { useState, useEffect } from 'react';

const WordHighlighterWithSpeech = ({ words }) => {
  const [highlightedWord, setHighlightedWord] = useState(0);
  const [isHighlighting, setIsHighlighting] = useState(false);
  let speechQueue = [];

  useEffect(() => {
    let timer;

    if (isHighlighting) {
      timer = setInterval(() => {
        setHighlightedWord((prevWord) => (prevWord + 1) % words.length);
      }, 1500);
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
    speechSynthesis.cancel();
    stopSpeech();
  };

  const speakWordsInOrder = () => {
    for (let i = 0; i < words.length; i++) {
      speechQueue.push(
        new Promise((resolve) => {
          setTimeout(() => {
            speakWord(words[i], resolve);
          }, i * 1500);
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
      speechQueue = [];
    }
  };

  return (
    <div>
      <button onClick={startHighlighting}>Start Highlighting & Speaking</button>
      <button onClick={stopHighlighting}>Stop Highlighting & Speaking</button>
      <div>
        {words.map((word, index) => (
          <span
            key={index}
            style={{ backgroundColor: index === highlightedWord ? 'yellow' : 'transparent' }}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordHighlighterWithSpeech;
